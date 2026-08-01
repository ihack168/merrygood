import Link from "next/link"
import { Sparkles } from "lucide-react"

import { client } from "@/lib/sanity"
import {
  LatestPostCard,
  type LatestPost,
} from "@/components/latest-post-card"

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

    if (imgMatch?.[1]) {
      extractedImg = optimizeSanityImageUrl(imgMatch[1])
    }

    if (!extractedDesc || extractedDesc === "點擊閱讀詳情...") {
      const pureText = post.htmlContent.replace(/<[^>]*>?/gm, "").trim()

      extractedDesc =
        pureText.substring(0, 100) + (pureText.length > 100 ? "..." : "")
    }
  }

  if (!extractedDesc) {
    extractedDesc = "點擊閱讀詳情..."
  }

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

// 首頁最新文章區塊維持 Server Component，
// 讓文章卡片與連結直接出現在伺服器輸出的 HTML 中。
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
    <section className="relative overflow-hidden px-6 py-8 sm:py-10 lg:py-12">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="absolute -right-20 bottom-0 h-52 w-52 rounded-full bg-accent/8 blur-[90px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.18em] text-accent shadow-sm backdrop-blur md:mx-0">
              <Sparkles size={13} />
              LATEST ARTICLES
            </div>

            <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
              最新減重文章
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              整理減肥診所、體重管理、減重諮詢與熱門減重商品相關資訊，
              幫助你更安心了解適合自己的減重方式。
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-primary/20 bg-white/70 px-6 py-2.5 text-sm font-bold text-accent shadow-[0_10px_24px_rgba(129,216,208,0.10)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white hover:text-primary"
          >
            查看全部文章 →
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <LatestPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-primary/25 bg-white/60 px-6 py-10 text-center shadow-[0_14px_36px_rgba(129,216,208,0.10)] backdrop-blur">
            <p className="text-lg font-black text-foreground">
              暫時沒有最新文章
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              之後會陸續分享減肥、減重管理與體重控制相關內容。
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
