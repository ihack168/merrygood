import { cache } from "react"
import { unstable_cache } from "next/cache"
import { notFound } from "next/navigation"
import { blogListPath } from "@/lib/blog-list-url"
import { client } from "@/lib/sanity"
import Link from "next/link"
import type { Metadata } from "next"


const POSTS_PER_PAGE = 15

// 文章量大時，首頁上方 tag 不要太多。
// 顯示「全部」+ 熱門前 12 個 tag，對 SEO / AEO / GEO 比較乾淨。
const TOP_TAG_LIMIT = 12
const siteUrl = "https://news.merrygood.com.tw"
const siteName = "美麗好減肥減重｜體重管理資訊站"

interface RawPost {
  id: string
  title: string
  slug: string
  description: string
  imageUrl?: string
  mainImage?: string
  htmlContent?: string
  videoId?: string
  tags: string[]
  publishedAt: string
}

interface Post extends Omit<RawPost, "htmlContent" | "imageUrl" | "mainImage"> {
  thumbnail: string
}

interface TagItem {
  name: string
  count: number
}

function optimizeSanityImageUrl(url?: string) {
  if (!url) return ""
  if (!url.includes("cdn.sanity.io/images")) return url
  if (url.includes("auto=format")) return url
  return `${url}${url.includes("?") ? "&" : "?"}auto=format`
}

function normalizeHtmlImages(html: string) {
  return html.replace(
    /(https:\/\/cdn\.sanity\.io\/images\/[^"' )<>]+)/g,
    (url) => optimizeSanityImageUrl(url)
  )
}

function processPost(post: RawPost): Post {
  let extractedImg = ""
  let extractedDesc = post.description || ""

  let html = post.htmlContent || ""

  if (html) {
    html = normalizeHtmlImages(html)
  }

  if (html) {
    const imgMatch = html.match(/<img[^>]+src="([^"]+)"/)

    if (imgMatch?.[1]) {
      extractedImg = optimizeSanityImageUrl(imgMatch[1])
    }

    if (!extractedDesc || extractedDesc === "點擊閱讀詳情...") {
      const pureText = html.replace(/<[^>]*>?/gm, "").trim()
      extractedDesc =
        pureText.substring(0, 100) + (pureText.length > 100 ? "..." : "")
    }
  }

  if (!extractedDesc) extractedDesc = "點擊閱讀詳情..."

  const youtubeThumb = post.videoId
    ? `https://img.youtube.com/vi/${post.videoId}/maxresdefault.jpg`
    : ""

  const mainImage =
    typeof post.mainImage === "string" ? optimizeSanityImageUrl(post.mainImage) : ""

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    videoId: post.videoId,
    publishedAt: post.publishedAt,
    thumbnail: extractedImg || mainImage || youtubeThumb || "",
    description: extractedDesc,
    tags: cleanTags(post.tags),
  }
}

const buildBlogUrl = blogListPath

function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug)
  } catch {
    return slug
  }
}

function articlePath(slug: string): string {
  return `/blog/${encodeURIComponent(decodeSlug(slug))}`
}

function cleanTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) return [];
  // Keep the original tag spelling so the GROQ filter matches it exactly.
  return [...new Set(tags.filter(
    (tag): tag is string => typeof tag === "string" && tag.trim().length > 0
  ))];
}

// One shared catalog: count tags only when this cache is refreshed.
const getTagCatalog = cache(unstable_cache(
  async (): Promise<TagItem[]> => {
    const rows = await client.fetch<{ tags?: string[] }[]>(
      `*[_type == "post" && defined(slug.current) && slug.current != ""]{"tags": coalesce(categories[]->title, tags)}`,
      {},
      // The outer unstable_cache stores the processed result for one hour.
      { cache: "no-store" }
    );
    const counts = new Map<string, number>();
    for (const row of rows) {
      for (const tag of cleanTags(row.tags)) {
        if (tag !== "全部") counts.set(tag, (counts.get(tag) || 0) + 1);
      }
    }
    const tags = Array.from(counts, ([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    return [{ name: "全部", count: rows.length }, ...tags];
  },
  ["merrygood-blog-tag-catalog-isr-v2"],
  { revalidate: 3600 }
));

// Only validated tag/page combinations reach this cache.
// Store compact cards, not article HTML, and process HTML only on cache refresh.
const getPostCards = unstable_cache(
  async (selectedTag: string, page: number): Promise<Post[]> => {
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    const rows = await client.fetch<RawPost[]>(
      `*[_type == "post" && defined(slug.current) && slug.current != ""
        && ($selectedTag == "全部" || $selectedTag in coalesce(categories[]->title, tags))]
      | order(coalesce(publishedAt, _createdAt) desc, _id asc) [$start...$end] {
        "id": _id,
        title,
        "slug": slug.current,
        description,
        imageUrl,
        "mainImage": mainImage.asset->url,
        htmlContent,
        "videoId": youtubeVideoId,
        "tags": coalesce(categories[]->title, tags),
        "publishedAt": coalesce(publishedAt, _createdAt)
      }`,
      { selectedTag, start, end },
      { cache: "no-store" }
    );
    return rows.map(processPost);
  },
  ["merrygood-blog-post-cards-isr-v2"],
  { revalidate: 3600 }
);

export function parseBlogPage(value: string): number {
  if (!/^[1-9][0-9]*$/.test(value)) notFound()
  const page = Number(value)
  if (!Number.isSafeInteger(page)) notFound()
  return page
}

function validateSelection(
  selectedTag: string,
  page: number,
  allTags: TagItem[]
) {
  const selected = allTags.find((tag) => tag.name === selectedTag);
  if (!selected) notFound();
  const totalPosts = selected.count;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  if (page > totalPages) notFound();
  return { totalPosts, totalPages };
}

export async function getBlogMetadata(
  selectedTag = "全部", page = 1
): Promise<Metadata> {
  const allTags = await getTagCatalog()
  validateSelection(selectedTag, page, allTags)

  const title = selectedTag === "全部" ? "最新文章" : `${selectedTag} 相關文章`

  const description =
    selectedTag === "全部"
      ? "減重管理、體重控制與熱門減重商品資訊整理。"
      : `${siteName}「${selectedTag}」主題文章整理，減重管理與體重控制相關知識。`

  const url = `${siteUrl}${buildBlogUrl(selectedTag, page)}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "zh_TW",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export async function BlogListing({
  selectedTag = "全部", page = 1,
}: { selectedTag?: string; page?: number }) {
  const allTags = await getTagCatalog()
  const { totalPosts, totalPages } = validateSelection(selectedTag, page, allTags)
  const posts = await getPostCards(selectedTag, page)

  const topTags = allTags.filter((t) => t.name !== "全部").slice(0, TOP_TAG_LIMIT)

  const selectedTagItem =
    selectedTag !== "全部" && !topTags.some((t) => t.name === selectedTag)
      ? allTags.find((t) => t.name === selectedTag)
      : null

  const visibleTags: TagItem[] = [
    ...allTags.filter((t) => t.name === "全部"),
    ...topTags,
    ...(selectedTagItem ? [selectedTagItem] : []),
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="relative overflow-hidden px-6 pb-16 pt-6 sm:pt-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <header>
              <h1 className="text-4xl font-bold md:text-6xl">最新文章</h1>

              <p className="mt-4 text-muted-foreground">
                {selectedTag === "全部"
                  ? "減重管理、體重控制與熱門減重商品資訊"
                  : `目前分類：${selectedTag}`}
              </p>
            </header>

            <p className="rounded-full border px-5 py-2 text-sm">
              共 {totalPosts} 篇文章
            </p>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {visibleTags.map((tagItem) => (
                <Link
                  key={tagItem.name}
                  href={buildBlogUrl(tagItem.name, 1)}
                  className={`rounded-full border px-4 py-2 text-sm transition-all ${
                    selectedTag === tagItem.name
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  #{tagItem.name}
                  <span
                    className={`ml-1 text-[10px] ${
                      selectedTag === tagItem.name
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground/60"
                    }`}
                  >
                    {tagItem.count}
                  </span>
                </Link>
              ))}
            </div>

            {allTags.length > TOP_TAG_LIMIT + 1 && (
              <p className="mt-4 text-xs text-muted-foreground/70">
                已依全站文章標籤數量排序，顯示熱門前 {TOP_TAG_LIMIT} 個主題。
              </p>
            )}
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {posts.map((post) => (
                <article key={post.id} className="overflow-hidden rounded-2xl border">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Link href={articlePath(post.slug)}>
                      {post.thumbnail ? (
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">暫無圖片</div>
                      )}
                    </Link>
                  </div>

                  <div className="p-6">
                    {post.tags && post.tags.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {post.tags.map((t) => (
                          <Link
                            key={t}
                            href={buildBlogUrl(t, 1)}
                            className={`rounded-full border px-3 py-1 text-xs transition-all ${
                              selectedTag === t
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                            }`}
                          >
                            #{t}
                          </Link>
                        ))}
                      </div>
                    )}

                    <Link href={articlePath(post.slug)}>
                      <h2 className="text-xl font-bold">{post.title}</h2>
                    </Link>

                    <p className="mt-3 text-sm text-muted-foreground">{post.description}</p>

                    <div className="mt-6">
                      <Link
                        href={articlePath(post.slug)}
                        className="inline-flex items-center text-sm font-semibold text-primary"
                      >
                        閱讀文章
                        <span className="ml-2">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed py-32 text-center">
              <p className="text-xl font-bold">暫時沒有相關文章</p>

              <p className="mt-3 text-sm text-muted-foreground">
                之後會陸續分享減重管理、體重控制與熱門減重商品資訊。
              </p>

              {selectedTag !== "全部" && (
                <Link
                  href="/blog"
                  className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                >
                  查看全部文章
                </Link>
              )}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
              <Link
                href={buildBlogUrl(selectedTag, Math.max(1, page - 1))}
                aria-disabled={page === 1}
                className={`mr-2 rounded-xl border px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:bg-secondary ${
                  page === 1 ? "pointer-events-none opacity-30" : ""
                }`}
              >
                Prev
              </Link>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <Link
                  key={num}
                  href={buildBlogUrl(selectedTag, num)}
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border font-mono font-bold transition-all duration-300 ${
                    page === num
                      ? "border-primary bg-primary text-primary-foreground scale-110"
                      : "border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {num}
                </Link>
              ))}

              <Link
                href={buildBlogUrl(selectedTag, Math.min(totalPages, page + 1))}
                aria-disabled={page >= totalPages}
                className={`ml-2 rounded-xl border px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:bg-secondary ${
                  page >= totalPages ? "pointer-events-none opacity-30" : ""
                }`}
              >
                Next
              </Link>
            </div>
          )}
        </div>
      </main>

    </div>
  )
}