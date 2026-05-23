"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { client } from "@/lib/sanity"
import { Sparkles } from "lucide-react"

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

export function LatestPostsSection() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLatestPosts() {
      setLoadingPosts(true)

      try {
        const result = await client.fetch(
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

        const processedPosts = result.map((post: any) => {
          let extractedImg = ""
          let extractedDesc = post.description || ""

          if (post.htmlContent) {
            const imgMatch = post.htmlContent.match(/<img[^>]+src="([^">]+)"/)

            if (imgMatch && imgMatch[1]) {
              extractedImg = imgMatch[1]
            }

            if (!extractedDesc || extractedDesc === "點擊閱讀詳情...") {
              const pureText = post.htmlContent
                .replace(/<[^>]*>?/gm, "")
                .trim()

              extractedDesc =
                pureText.substring(0, 100) +
                (pureText.length > 100 ? "..." : "")
            }
          }

          if (!extractedDesc) extractedDesc = "點擊閱讀詳情..."

          const youtubeThumb = post.videoId
            ? `https://img.youtube.com/vi/${post.videoId}/maxresdefault.jpg`
            : ""

          return {
            ...post,
            thumbnail:
              extractedImg ||
              youtubeThumb ||
              post.imageUrl ||
              post.mainImage ||
              "",
            description: extractedDesc,
            tags: Array.isArray(post.tags) ? post.tags : [],
          }
        })

        setPosts(processedPosts)
      } catch (err) {
        console.error("首頁文章抓取失敗:", err)
      } finally {
        setLoadingPosts(false)
      }
    }

    fetchLatestPosts()
  }, [])

  return (
    <section className="relative overflow-hidden px-6 py-24">
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

        {loadingPosts ? (
          <div className="flex justify-center py-24">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group overflow-hidden rounded-[2rem] border border-white/50 bg-white/70 shadow-[0_12px_40px_rgba(129,216,208,0.12)] backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/35 hover:bg-white/90 hover:shadow-[0_24px_70px_rgba(129,216,208,0.22)]"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-secondary">
                  {activeVideo === post.id && post.videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${post.videoId}?autoplay=1`}
                      className="h-full w-full border-none"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  ) : (
                    <div className="relative h-full w-full">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block h-full w-full overflow-hidden"
                      >
                        {post.thumbnail ? (
                          <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-secondary text-sm text-muted-foreground">
                            暫無圖片
                          </div>
                        )}
                      </Link>

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-white/10" />

                      {post.videoId && (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                          <div
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              setActiveVideo(post.id)
                            }}
                            className="pointer-events-auto flex h-12 w-16 cursor-pointer items-center justify-center rounded-2xl bg-white/90 shadow-xl backdrop-blur transition-transform duration-300 group-hover:scale-110"
                          >
                            <div className="ml-1 border-y-[10px] border-l-[16px] border-y-transparent border-l-primary" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex min-h-[270px] flex-col p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {post.tags?.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-white"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="line-clamp-2 text-xl font-black leading-snug text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">
                    {post.description}
                  </p>

                  <div className="mt-auto pt-6">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-bold text-primary"
                    >
                      閱讀文章
                      <span className="ml-2 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[2.5rem] border border-dashed border-primary/25 bg-white/60 px-6 py-24 text-center shadow-[0_18px_50px_rgba(129,216,208,0.12)] backdrop-blur">
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