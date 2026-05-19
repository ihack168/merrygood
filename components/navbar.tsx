"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

const navLinks = [
  { label: "首頁", href: "/" },
  //{ label: "療程介紹", href: "/#services" },
  { label: "最新文章", href: "/blog" },
  //{ label: "聯絡我們", href: "/#contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)

    if (typeof document !== "undefined") {
      document.body.style.overflow = "unset"
    }
  }, [pathname])

  const toggleMenu = () => {
    const nextState = !mobileOpen
    setMobileOpen(nextState)

    if (typeof document !== "undefined") {
      document.body.style.overflow = nextState ? "hidden" : "unset"
    }
  }

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-[50] flex justify-center pointer-events-none">
        <div
          className={`
            pointer-events-auto flex items-center justify-between transition-all duration-500
            ${
              scrolled
                ? "mt-4 h-16 w-[92%] max-w-6xl rounded-full border border-border/70 bg-white/85 px-5 shadow-[0_18px_50px_rgba(120,80,70,0.12)] backdrop-blur-xl md:w-[86%] md:px-7"
                : "h-20 w-full border-b border-border/60 bg-white/75 px-5 backdrop-blur-xl md:px-10"
            }
          `}
        >
          {/* Logo */}
          <Link href="/" className="relative z-[60] flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="美麗好診所 Logo"
              className="h-10 w-10 rounded-full border border-primary/20 bg-white object-cover shadow-sm"
            />

            <div className="leading-tight">
              <span className="block text-lg font-bold tracking-tight text-foreground md:text-xl">
                美麗好診所
              </span>

              <span className="hidden text-xs tracking-[0.18em] text-muted-foreground md:block">
                AESTHETIC CLINIC
              </span>
            </div>
          </Link>

          {/* 電腦版選單 */}
          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  group relative
                  text-[15px] md:text-base
                  font-semibold
                  tracking-wide
                  text-muted-foreground
                  transition-colors
                  hover:text-foreground
                "
              >
                {link.label}

                <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary opacity-0 transition-all duration-300 group-hover:opacity-100" />
              </Link>
            ))}

            <a
              href="https://line.me/R/ti/p/@你的LINEID"
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-full
                bg-primary
                px-6 py-3
                text-sm md:text-base
                font-semibold
                text-primary-foreground
                shadow-[0_10px_30px_rgba(217,143,143,0.28)]
                transition-all
                hover:-translate-y-0.5
                hover:shadow-[0_14px_36px_rgba(217,143,143,0.38)]
              "
            >
              LINE 諮詢
            </a>
          </div>

          {/* 手機漢堡按鈕 */}
          <button
            onClick={toggleMenu}
            aria-label="開啟選單"
            className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-border bg-white shadow-sm md:hidden"
          >
            <span className="h-0.5 w-5 rounded-full bg-foreground" />
            <span className="h-0.5 w-5 rounded-full bg-foreground" />
            <span className="h-0.5 w-5 rounded-full bg-foreground" />
          </button>
        </div>
      </nav>

      {/* 手機全螢幕選單 */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-background px-7 pt-24 md:hidden animate-in fade-in duration-300">
          <button
            onClick={toggleMenu}
            aria-label="關閉選單"
            className="absolute right-6 top-6 z-[110] flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white shadow-sm"
          >
            <div className="relative h-6 w-6">
              <span className="absolute left-0 top-1/2 h-0.5 w-full rotate-45 rounded-full bg-foreground" />
              <span className="absolute left-0 top-1/2 h-0.5 w-full -rotate-45 rounded-full bg-foreground" />
            </div>
          </button>

          <div className="mb-8">
            <p className="text-sm tracking-[0.24em] text-muted-foreground">
              AESTHETIC CLINIC
            </p>

            <p className="mt-2 text-2xl font-bold text-foreground">
              美麗好診所
            </p>
          </div>

          <div className="flex w-full flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setMobileOpen(false)
                  document.body.style.overflow = "unset"
                }}
                className="flex items-center justify-between border-b border-border py-5 text-xl font-semibold text-foreground transition-colors active:text-primary"
              >
                {link.label}

                <span className="text-primary">→</span>
              </Link>
            ))}
          </div>

          <a
            href="https://line.me/R/ti/p/@你的LINEID"
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-8 flex h-14 items-center justify-center
              rounded-full bg-primary
              text-base font-semibold
              text-primary-foreground
              shadow-[0_14px_36px_rgba(217,143,143,0.32)]
            "
          >
            加入 LINE 預約諮詢
          </a>

          <div className="mt-auto pb-8 text-sm leading-7 text-muted-foreground">
            <p>專業醫美療程｜肌膚管理｜微整形諮詢</p>
            <p>自然、細緻、安心的美麗體驗</p>
          </div>
        </div>
      )}
    </>
  )
}