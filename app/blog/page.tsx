"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { client } from "@/lib/sanity"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

interface Post {
  id: string
  title: string
  slug: string
  description: string
  thumbnail: string
  videoId?: string
  tags: string[]
  publishedAt: string
  htmlContent?: string
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

function BlogPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedTag = searchParams.get("tag") || "全部"

  const [posts, setPosts] = useState<Post[]>([])
  const [allTags, setAllTags] = useState<TagItem[]>([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  const postsPerPage = 15

  // 文章量大時，首頁 tag 不要全部攤開。
  // 顯示「全部」+ 熱門前 12 個 tag，對 SEO / AEO / GEO 比較乾淨。
  const topTagLimit = 12

  const topTags = allTags
    .filter((tag) => tag.name !== "全部")
    .slice(0, topTagLimit)

  const selectedTagItem =
    selectedTag !== "全部" &&
    !topTags.some((tag) => tag.name === selectedTag)
      ? allTags.find((tag) => tag.name === selectedTag)
      : null

  const visibleTags: TagItem[] = [
    ...allTags.filter((tag) => tag.name === "全部"),
    ...topTags,
    ...(selectedTagItem ? [selectedTagItem] : []),
  ]

  useEffect(() => {
    setPage(1)
  }, [selectedTag])

  useEffect(() => {
    async function fetchAllTags() {
      try {
        const result = await client.fetch(
          `*[_type == "post"] {
            tags
          }`,
          {},
          { cache: "no-store" }
        )

        const tagCountMap = new Map<string, number>()

        result.forEach((post: { tags?: string[] }) => {
          if (!Array.isArray(post.tags)) return

          post.tags.forEach((tag) => {
            const cleanTag = String(tag || "").trim()
            if (!cleanTag) return

            tagCountMap.set(cleanTag, (tagCountMap.get(cleanTag) || 0) + 1)
          })
        })

        const sortedTags = Array.from(tagCountMap.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))

        setAllTags([{ name: "全部", count: result.length }, ...sortedTags])
      } catch (err) {
        console.error("Sanity 標籤抓取失敗:", err)
      }
    }

    fetchAllTags()
  }, [])

  useEffect(() => {
    async function fetchSanityPosts() {
      setLoading(true)

      try {
        const start = (page - 1) * postsPerPage
        const end = start + postsPerPage

        const tagFilter = selectedTag !== "全部" ? `&& $selectedTag in tags` : ""

        const count = await client.fetch(
          `count(*[_type == "post" ${tagFilter}])`,
          { selectedTag },
          { cache: "no-store" }
        )

        setTotalPosts(count)

        const result = await client.fetch(
          `*[_type == "post" ${tagFilter}] | order(coalesce(publishedAt, _createdAt) desc) [$start...$end] {
            "id": _id,
            title,
            "slug": slug.current,
            description,
            "imageUrl": imageUrl,
            "mainImage": mainImage.asset->url,
            htmlContent,
            "videoId": youtubeVideoId,
            "tags": tags,
            "publishedAt": coalesce(publishedAt, _createdAt)
          }`,
          { start, end, selectedTag },
          { cache: "no-store" }
        )

        const processedPosts = result.map((post: any) => {
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
                pureText.substring(0, 100) +
                (pureText.length > 100 ? "..." : "")
            }
          }

          if (!extractedDesc) extractedDesc = "點擊閱讀詳情..."

          const youtubeThumb = post.videoId
            ? `https://img.youtube.com/vi/${post.videoId}/maxresdefault.jpg`
            : ""

          const mainImage =
            typeof post.mainImage === "string"
              ? optimizeSanityImageUrl(post.mainImage)
              : ""

          const finalThumb = extractedImg || mainImage || youtubeThumb || ""

          return {
            ...post,
            thumbnail: finalThumb,
            description: extractedDesc,
            tags: Array.isArray(post.tags) ? post.tags : [],
          }
        })

        setPosts(processedPosts)
      } catch (err) {
        console.error("Sanity 抓取失敗:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSanityPosts()

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [page, selectedTag])

  const totalPages = Math.ceil(totalPosts / postsPerPage) || 1

  const handleTagClick = (tag: string) => {
    setActiveVideo(null)

    if (tag === "全部") {
      router.push("/blog")
      return
    }

    router.push(`/blog?tag=${encodeURIComponent(tag)}`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden px-6 pb-24 pt-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
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

          <div className="mb-12">
            <div className="flex flex-wrap gap-3">
              {visibleTags.map((tag) => (
                <button
                  key={tag.name}
                  onClick={() => handleTagClick(tag.name)}
                  className={`rounded-full border px-4 py-2 text-sm transition-all ${
                    selectedTag === tag.name
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  #{tag.name}
                  <span
                    className={`ml-1 text-[10px] ${
                      selectedTag === tag.name
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground/60"
                    }`}
                  >
                    {tag.count}
                  </span>
                </button>
              ))}
            </div>

            {allTags.length > topTagLimit + 1 && (
              <p className="mt-4 text-xs text-muted-foreground/70">
                已依全站文章標籤數量排序，顯示熱門前 {topTagLimit} 個主題。
              </p>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-40">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-t-primary" />
            </div>
          ) : (
            <>
              {posts && posts.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {posts.map((post) => (
                    <article
                      key={post.id}
                      className="overflow-hidden rounded-2xl border"
                    >
                      <div className="relative h-56 w-full overflow-hidden">
                        <Link href={`/blog/${post.slug}`}>
                          {post.thumbnail ? (
                            <img
                              src={post.thumbnail}
                              alt={post.title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              暫無圖片
                            </div>
                          )}
                        </Link>
                      </div>

                      <div className="p-6">
                        {post.tags && post.tags.length > 0 && (
                          <div className="mb-4 flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <button
                                key={tag}
                                onClick={() => handleTagClick(tag)}
                                className={`rounded-full border px-3 py-1 text-xs transition-all ${
                                  selectedTag === tag
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                                }`}
                              >
                                #{tag}
                              </button>
                            ))}
                          </div>
                        )}

                        <Link href={`/blog/${post.slug}`}>
                          <h2 className="text-xl font-bold">{post.title}</h2>
                        </Link>

                        <p className="mt-3 text-sm text-muted-foreground">
                          {post.description}
                        </p>

                        <div className="mt-6">
                          <Link
                            href={`/blog/${post.slug}`}
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
                    <button
                      onClick={() => handleTagClick("全部")}
                      className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                    >
                      查看全部文章
                    </button>
                  )}
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-20 flex flex-wrap justify-center items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="mr-2 rounded-xl border px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:bg-secondary disabled:opacity-30"
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (num) => (
                      <button
                        key={num}
                        onClick={() => setPage(num)}
                        className={`h-12 w-12 rounded-xl border font-mono font-bold transition-all duration-300 ${
                          page === num
                            ? "border-primary bg-primary text-primary-foreground scale-110"
                            : "border-border hover:border-primary hover:text-primary"
                        }`}
                      >
                        {num}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="ml-2 rounded-xl border px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:bg-secondary disabled:opacity-30"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="p-10">loading...</div>}>
      <BlogPageContent />
    </Suspense>
  )
}