"use client"

import { useState } from "react"
import Link from "next/link"

export interface LatestPost {
  id: string
  title: string
  slug: string
  description: string
  thumbnail: string
  videoId?: string
  tags: string[]
  publishedAt: string
}

interface LatestPostCardProps {
  post: LatestPost
}

// 唯一需要留在 client 端的互動：點縮圖上的播放鍵直接內嵌播放 YouTube。
// 每張卡片自己管理 isVideoPlaying，不需要把狀態提升到列表層共用，
// 這樣列表本身（LatestPostsSection）才能維持是 Server Component。
export function LatestPostCard({ post }: LatestPostCardProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const articleUrl = `/blog/${post.slug}`

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/50 bg-white/70 shadow-[0_12px_40px_rgba(129,216,208,0.12)] backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/35 hover:bg-white/90 hover:shadow-[0_24px_70px_rgba(129,216,208,0.22)]">
      <div className="relative h-[200px] md:h-[220px] w-full overflow-hidden bg-secondary">
        {isVideoPlaying && post.videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${post.videoId}?autoplay=1`}
            title={`${post.title} 影片`}
            className="h-full w-full border-none"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="relative h-full w-full">
            <Link
              href={articleUrl}
              className="block h-full w-full overflow-hidden"
              aria-label={`閱讀文章：${post.title}`}
            >
              {post.thumbnail ? (
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="h-full w-full object-contain md:object-cover transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-secondary text-sm text-muted-foreground">
                  暫無圖片
                </div>
              )}
            </Link>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-white/10" />

            {post.videoId && (
              <button
                type="button"
                onClick={() => setIsVideoPlaying(true)}
                className="absolute inset-0 m-auto flex h-12 w-16 items-center justify-center rounded-2xl bg-white/90 shadow-xl backdrop-blur transition-transform duration-300 hover:scale-110"
                aria-label={`播放影片：${post.title}`}
              >
                <span className="ml-1 border-y-[10px] border-l-[16px] border-y-transparent border-l-primary" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex min-h-[270px] flex-col p-6">
        {post.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-white"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        <Link href={articleUrl}>
          <h3 className="line-clamp-2 text-xl font-black leading-snug text-foreground transition-colors group-hover:text-primary">
            {post.title}
          </h3>
        </Link>

        <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">
          {post.description}
        </p>

        <div className="mt-auto pt-6">
          <Link
            href={articleUrl}
            className="inline-flex items-center text-sm font-bold text-primary"
            aria-label={`閱讀完整文章：${post.title}`}
          >
            閱讀文章
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  )
}