import Link from "next/link"
import { Sparkles } from "lucide-react"
import { client } from "@/lib/sanity"
import { LatestPostCard, type LatestPost } from "@/components/latest-post-card"

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

function optimizeSanityImageUrl(url?: string) {
  if (!url) return ""
  if (!url.includes("cdn.sanity.io/images")) return url
  if (url.includes("auto=format")) return url
  return `${url}${url.includes("?") ? "&" : "?"}auto=format`
}

function processPost(post: RawPost): LatestPost {
  let extractedImg = ""
  let extractedDesc = post.description || ""

  if (post.htmlContent) {
    const imgMatch = post.htmlContent.match(/<img[^>]+src="([^">]+)"/)

    if (imgMatch && imgMatch[1]) {
      extractedImg = optimizeSanityImageUrl(imgMatch[1])
    }

    if (!extractedDesc || extractedDesc === "點擊閱讀詳情...") {
      const pureText = post.htmlContent.replace(/<[^>]*>?/gm, "").trim()
      extractedDesc =
        pureText.substring(0, 100) + (pureText.length > 100 ? "..." : "")
    }
  }

  if (!extractedDesc) extractedDesc = "點擊閱讀詳情..."

  const youtubeThumb = post.videoId
    ? `https://img.youtube.com/vi/${post.videoId}/maxresdefault.jpg`
    : ""

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    description: extractedDesc,
    thumbnail:
      extractedImg ||
      youtubeThumb ||
      optimizeSanityImageUrl(post.imageUrl) ||
      optimizeSanityImageUrl(post.mainImage) ||
      "",
    videoId: post.videoId,
    tags: Array.isArray(post.tags) ? post.tags : [],
    publishedAt: post.publishedAt,
  }
}

// 首頁「最新減重文章」區塊，改成 Server Component 在伺服器端直接抓資料，
// 原始 HTML 就會包含真正的文章卡片與連結，而不是只有一顆轉圈圈的 loading。
export async function LatestPostsSection() {
  const rawPosts: RawPost[] = await client.fetch(
    `*[_type == "post"] | order(_createdAt desc) [0...6] {
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
    {},
    { cache: "no-store" }
  )

  const posts = rawPosts.map(processPost)

  return (
    <section className="relative overflow-hidden px-6 py-16">
      <div className="absolute left-1/2 top-0 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />

      <div className="absolute -right-24 bottom-10 h-[260px] w-[260px] rounded-full bg-accent/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/60 px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-accent shadow-sm backdrop-blur md:mx-0">
              <Sparkles size={14} />
              LATEST ARTICLES
            </div>

            <h2 className="text-3xl font-black tracking-tight text-foreground md:text-5xl">
              最新減重文章
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              整理減肥診所、體重管理、減重諮詢與熱門減重商品相關資訊，
              幫助你更安心了解適合自己的減重方式。
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex justify-center rounded-full border border-primary/20 bg-white/70 px-7 py-3 text-sm font-bold text-accent shadow-[0_12px_30px_rgba(129,216,208,0.12)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white hover:text-primary"
          >
            查看全部文章 →
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <LatestPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2.5rem] border border-dashed border-primary/25 bg-white/60 px-6 py-16 text-center shadow-[0_18px_50px_rgba(129,216,208,0.12)] backdrop-blur">
            <p className="text-xl font-black text-foreground">
              暫時沒有最新文章
            </p>

            <p className="mt-3 text-sm text-muted-foreground">
              之後會陸續分享減肥、減重管理與體重控制相關內容。
            </p>
          </div>
        )}
      </div>
    </section>
  )
}