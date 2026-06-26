"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
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

/**
 * 👉 Sanity image optimize（統一版）
 */
function optimizeSanityImageUrl(url?: string) {
  if (!url) return ""

  if (!url.includes("cdn.sanity.io/images")) return url
  if (url.includes("auto=format")) return url

  return `${url}${url.includes("?") ? "&" : "?"}auto=format`
}

/**
 * 👉 抽 HTML 第一張圖（修正版 regex）
 */
function extractFirstImage(html?: string) {
  if (!html) return null
  const match = html.match(/<img[^>]+src="([^"]+)"/)
  return match?.[1] || null
}

/**
 * 👉 清理 HTML 圖片 URL（避免沒 optimize）
 */
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
  const [totalPosts, setTotalPosts] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  const postsPerPage = 15

  useEffect(() => {
    setPage(1)
  }, [selectedTag])

  useEffect(() => {
    async function fetchSanityPosts() {
      setLoading(true)

      try {
        const start = (page - 1) * postsPerPage
        const end = start + postsPerPage

        const tagFilter =
          selectedTag !== "全部" ? `&& $selectedTag in tags` : ""

        const count = await client.fetch(
          `count(*[_type == "post" ${tagFilter}])`,
          { selectedTag },
          { cache: "no-store" }
        )

        setTotalPosts(count)

        const result = await client.fetch(
          `*[_type == "post" ${tagFilter}] | order(_createdAt desc) [$start...$end] {
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

          // 👉 先 normalize html 裡圖片
          if (html) {
            html = normalizeHtmlImages(html)
          }

          // 👉 1. htmlContent 抓第一張圖
          if (html) {
            const imgMatch = html.match(/<img[^>]+src="([^"]+)"/)
            if (imgMatch?.[1]) {
              extractedImg = optimizeSanityImageUrl(imgMatch[1])
            }

            // 👉 description fallback
            if (!extractedDesc || extractedDesc === "點擊閱讀詳情...") {
              const pureText = html.replace(/<[^>]*>?/gm, "").trim()

              extractedDesc =
                pureText.substring(0, 100) +
                (pureText.length > 100 ? "..." : "")
            }
          }

          if (!extractedDesc) extractedDesc = "點擊閱讀詳情..."

          // 👉 2. YouTube fallback
          const youtubeThumb = post.videoId
            ? `https://img.youtube.com/vi/${post.videoId}/maxresdefault.jpg`
            : ""

          // 👉 3. mainImage fallback（修正 optimize）
          const mainImage =
            typeof post.mainImage === "string"
              ? optimizeSanityImageUrl(post.mainImage)
              : ""

          // 👉 final thumbnail priority
          const finalThumb =
            extractedImg || mainImage || youtubeThumb || ""

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

  const allTags = useMemo(() => {
    const tags = posts.flatMap((post) => post.tags || [])
    return ["全部", ...Array.from(new Set(tags))]
  }, [posts])

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

          <div className="mb-12 flex flex-wrap gap-3">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="rounded-full border px-4 py-2 text-sm"
              >
                #{tag}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-40">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-t-primary" />
            </div>
          ) : (
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
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-xl font-bold">{post.title}</h2>
                    </Link>

                    <p className="mt-3 text-sm text-muted-foreground">
                      {post.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
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