"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

type ShareBarProps = {
  /** 文章的完整 canonical URL，建議由文章頁直接傳入 */
  url?: string

  /** 分享標題，LINE 分享時會一併帶入 */
  title?: string

  /** light 給白底網站使用；dark 給深色版面使用 */
  variant?: "light" | "dark"

  /** 諮詢按鈕前往的站內路徑 */
  contactHref?: string
}

export function ShareBar({
  url: initialUrl,
  title = "",
  variant = "light",
  contactHref = "/line",
}: ShareBarProps) {
  const [currentUrl, setCurrentUrl] = useState(initialUrl || "")
  const [copied, setCopied] = useState(false)

  const router = useRouter()
  const isDark = variant === "dark"

  useEffect(() => {
    if (initialUrl) {
      setCurrentUrl(initialUrl)
      return
    }

    setCurrentUrl(window.location.href)
  }, [initialUrl])

  const facebookShareUrl = useMemo(() => {
    if (!currentUrl) return "#"

    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`
  }, [currentUrl])

  const lineShareUrl = useMemo(() => {
    if (!currentUrl) return "#"

    const shareText = title
      ? `${title}\n${currentUrl}`
      : currentUrl

    return `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      shareText
    )}`
  }, [currentUrl, title])

  const handleCopy = async () => {
    if (!currentUrl) return

    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)

      window.setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error("複製連結失敗：", error)
    }
  }

  const handleContact = () => {
    router.push(contactHref)
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2">
      <div
        className={`
          flex items-center gap-1
          rounded-full border
          px-2 py-2
          shadow-2xl
          backdrop-blur
          md:gap-2 md:px-4 md:py-3
          ${
            isDark
              ? "border-white/10 bg-black/80 text-white"
              : "border-black/5 bg-white/95 text-gray-900 shadow-black/10"
          }
        `}
      >
        <span
          className={`
            hidden whitespace-nowrap pr-1
            text-xs font-bold
            md:block
            ${isDark ? "text-gray-400" : "text-gray-500"}
          `}
        >
          分享
        </span>

        <a
          href={facebookShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="分享到 Facebook"
          aria-disabled={!currentUrl}
          onClick={(event) => {
            if (!currentUrl) event.preventDefault()
          }}
          className={`
            whitespace-nowrap rounded-full
            bg-blue-600
            px-2 py-2
            text-[11px] font-bold text-white
            transition hover:opacity-90
            md:px-4 md:text-xs
            ${!currentUrl ? "pointer-events-none opacity-50" : ""}
          `}
        >
          FB
        </a>

        <a
          href={lineShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="分享到 LINE"
          aria-disabled={!currentUrl}
          onClick={(event) => {
            if (!currentUrl) event.preventDefault()
          }}
          className={`
            whitespace-nowrap rounded-full
            bg-green-500
            px-2 py-2
            text-[11px] font-bold text-white
            transition hover:opacity-90
            md:px-4 md:text-xs
            ${!currentUrl ? "pointer-events-none opacity-50" : ""}
          `}
        >
          LINE
        </a>

        <button
          type="button"
          onClick={handleCopy}
          disabled={!currentUrl}
          aria-label="複製文章連結"
          className={`
            whitespace-nowrap rounded-full
            px-2 py-2
            text-[11px] font-bold
            transition
            disabled:cursor-not-allowed
            disabled:opacity-50
            md:px-4 md:text-xs
            ${
              isDark
                ? "bg-white/10 hover:bg-white/20"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          `}
        >
          {copied ? "已複製！" : "COPY"}
        </button>

        <div
          aria-hidden="true"
          className={`
            mx-1 h-5 w-px
            ${isDark ? "bg-white/20" : "bg-gray-200"}
          `}
        />

        <button
          type="button"
          onClick={handleContact}
          className="
            whitespace-nowrap rounded-full
            bg-[#06C755]
            px-2 py-2
            text-[11px] font-black text-white
            transition
            hover:scale-105
            hover:bg-[#00E676]
            md:px-4 md:text-xs
          "
        >
          立即諮詢
        </button>
      </div>
    </div>
  )
}