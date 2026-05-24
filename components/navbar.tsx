"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

const navLinks = [
  { label: "文章列表", href: "/blog" },
  { label: "聯絡方式", href: "/#contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    document.body.style.overflow = "unset"
  }, [pathname])

  const scrollToContact = () => {
    setMobileOpen(false)
    document.body.style.overflow = "unset"

    if (pathname !== "/") {
      router.push("/#contact")
      return
    }

    const contact = document.getElementById("contact")

    if (contact) {
      contact.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const toggleMenu = () => {
    const nextState = !mobileOpen
    setMobileOpen(nextState)
    document.body.style.overflow = nextState ? "hidden" : "unset"
  }

  return (
    <>
      <nav className="pointer-events-none fixed left-0 right-0 top-0 z-[80] flex justify-center">
        <div
          className={`
            pointer-events-auto flex items-center justify-between transition-all duration-500
            ${
              scrolled
                ? "mt-4 h-16 w-[94%] max-w-6xl rounded-full border border-white/40 bg-white/70 px-5 shadow-[0_18px_60px_rgba(129,216,208,0.18)] backdrop-blur-2xl md:w-[88%] md:px-7"
                : "h-20 w-full border-b border-white/20 bg-white/35 px-5 backdrop-blur-xl md:px-10"
            }
          `}
        >
          <Link href="/" className="relative z-[90] flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/25 blur-md" />

              <img
                src="/images/logo.png"
                alt="美麗好診所 減肥診所 Logo"
                className="relative h-11 w-11 rounded-full border border-white/60 bg-white object-cover shadow-[0_8px_24px_rgba(129,216,208,0.20)]"
              />
            </div>

            <div className="leading-tight">
              <span className="block text-xl font-black tracking-tight text-foreground md:text-2xl">
                美麗好診所
              </span>

              <span className="hidden text-[11px] tracking-[0.22em] text-muted-foreground md:block">
                WEIGHT LOSS CLINIC
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            <Link
              href="/blog"
              className="group relative text-[18px] font-bold tracking-wide text-muted-foreground transition-all duration-300 hover:text-foreground"
            >
              文章列表
              <span className="absolute -bottom-2 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 group-hover:w-6" />
            </Link>

            <button
              type="button"
              onClick={scrollToContact}
              className="group relative text-[18px] font-bold tracking-wide text-muted-foreground transition-all duration-300 hover:text-foreground"
            >
              聯絡方式
              <span className="absolute -bottom-2 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 group-hover:w-6" />
            </button>

            <a
              href="https://line.me/R/ti/p/@你的LINEID"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-base font-bold text-white shadow-[0_10px_30px_rgba(129,216,208,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(129,216,208,0.42)]"
            >
              LINE 免費諮詢
            </a>
          </div>

          <button
            onClick={toggleMenu}
            aria-label="開啟選單"
            className="relative z-[90] flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/70 shadow-[0_10px_30px_rgba(129,216,208,0.16)] backdrop-blur-xl md:hidden"
          >
            <div className="relative h-5 w-5">
              <span
                className={`absolute left-0 top-1 h-0.5 w-full rounded-full bg-foreground transition-all duration-300 ${
                  mobileOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />

              <span
                className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-foreground transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />

              <span
                className={`absolute bottom-1 left-0 h-0.5 w-full rounded-full bg-foreground transition-all duration-300 ${
                  mobileOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-white/85 px-7 pt-28 backdrop-blur-2xl animate-in fade-in duration-300 md:hidden">
          <div className="absolute left-1/2 top-20 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />

          <div className="relative mb-10">
            <p className="text-[11px] tracking-[0.28em] text-muted-foreground">
              WEIGHT LOSS CLINIC
            </p>

            <p className="mt-3 text-3xl font-black text-foreground">
              美麗好診所
            </p>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              專業減肥診所｜減重管理｜
              <br />
              體重控制諮詢
            </p>
          </div>

          <div className="relative flex flex-col">
            <Link
              href="/blog"
              onClick={() => {
                setMobileOpen(false)
                document.body.style.overflow = "unset"
              }}
              className="flex items-center justify-between border-b border-border/60 py-6 text-xl font-semibold text-foreground"
            >
              文章列表
              <span className="text-primary">→</span>
            </Link>

            <button
              type="button"
              onClick={scrollToContact}
              className="flex items-center justify-between border-b border-border/60 py-6 text-left text-xl font-semibold text-foreground"
            >
              聯絡方式
              <span className="text-primary">→</span>
            </button>
          </div>

          <div className="relative mt-10">
            <a
              href="https://line.me/R/ti/p/@你的LINEID"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-2xl bg-primary px-6 py-4 text-base font-bold text-white shadow-[0_20px_50px_rgba(129,216,208,0.35)]"
            >
              加入 LINE 免費諮詢
            </a>
          </div>

          <div className="relative mt-auto pb-8 pt-10 text-sm leading-7 text-muted-foreground">
            <p>美麗好診所｜減肥診所｜減重診所</p>
            <p>猛健樂｜週纖達｜瑞倍適 減重諮詢</p>
          </div>
        </div>
      )}
    </>
  )
}