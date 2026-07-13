"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { LineConsultButton } from "@/components/line-consult-button"

const siteName = "美麗好減肥減重－體重管理資訊站"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    document.body.style.overflow = "unset"

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [pathname])

  const closeMobileMenu = () => {
    setMobileOpen(false)
    document.body.style.overflow = "unset"
  }

  const toggleMenu = () => {
    const nextState = !mobileOpen

    setMobileOpen(nextState)
    document.body.style.overflow = nextState ? "hidden" : "unset"
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav
        aria-label="主要導覽"
        className="pointer-events-none fixed left-0 right-0 top-0 z-[80] flex justify-center"
      >
        <div
          className={`
            pointer-events-auto
            flex items-center justify-between
            transition-all duration-500
            ${
              scrolled
                ? "mt-4 h-16 w-[94%] max-w-6xl rounded-full border border-white/40 bg-white/70 px-5 shadow-[0_18px_60px_rgba(129,216,208,0.18)] backdrop-blur-2xl md:w-[88%] md:px-7"
                : "h-20 w-full border-b border-white/20 bg-white/35 px-5 backdrop-blur-xl md:px-10"
            }
          `}
        >
          <Link
            href="/"
            aria-label={`${siteName}首頁`}
            className="relative z-[90] flex min-w-0 items-center gap-3"
          >
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-primary/25 blur-md" />

              <img
                src="/images/logo.png"
                alt={`${siteName} Logo`}
                width={44}
                height={44}
                className="
                  relative
                  h-11 w-11
                  rounded-full
                  border border-white/60
                  bg-white
                  object-cover
                  shadow-[0_8px_24px_rgba(129,216,208,0.20)]
                "
              />
            </div>

            <div className="min-w-0 leading-tight">
              <span className="block truncate text-base font-black tracking-tight text-foreground sm:text-xl md:text-2xl">
                {siteName}
              </span>

              <span className="hidden text-[11px] tracking-[0.22em] text-muted-foreground md:block">
                WEIGHT MANAGEMENT INFO
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/blog"
              aria-current={isActive("/blog") ? "page" : undefined}
              className={`
                group relative
                text-base font-bold tracking-wide
                transition-all duration-300
                ${
                  isActive("/blog")
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              文章列表

              <span
                className={`
                  absolute -bottom-2 left-1/2
                  h-[3px]
                  -translate-x-1/2
                  rounded-full
                  bg-primary
                  transition-all duration-300
                  ${isActive("/blog") ? "w-6" : "w-0 group-hover:w-6"}
                `}
              />
            </Link>

            <Link
              href="/about"
              aria-current={isActive("/about") ? "page" : undefined}
              className={`
                group relative
                text-base font-bold tracking-wide
                transition-all duration-300
                ${
                  isActive("/about")
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              關於本站

              <span
                className={`
                  absolute -bottom-2 left-1/2
                  h-[3px]
                  -translate-x-1/2
                  rounded-full
                  bg-primary
                  transition-all duration-300
                  ${isActive("/about") ? "w-6" : "w-0 group-hover:w-6"}
                `}
              />
            </Link>

            <LineConsultButton
              className="
                inline-flex items-center justify-center
                rounded-full
                bg-[#06C755]
                px-5 py-2.5
                text-base font-bold
                text-white
                shadow-[0_10px_30px_rgba(129,216,208,0.35)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_16px_40px_rgba(129,216,208,0.42)]
              "
            >
              美麗好診所諮詢
            </LineConsultButton>
          </div>

          <button
            type="button"
            onClick={toggleMenu}
            aria-label={mobileOpen ? "關閉選單" : "開啟選單"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="
              relative z-[90]
              flex h-11 w-11
              flex-shrink-0
              items-center justify-center
              rounded-full
              border border-white/50
              bg-white/70
              shadow-[0_10px_30px_rgba(129,216,208,0.16)]
              backdrop-blur-xl
              md:hidden
            "
          >
            <div className="relative h-5 w-5">
              <span
                className={`
                  absolute left-0 top-1
                  h-0.5 w-full rounded-full bg-foreground
                  transition-all duration-300
                  ${mobileOpen ? "translate-y-2 rotate-45" : ""}
                `}
              />

              <span
                className={`
                  absolute left-0 top-1/2
                  h-0.5 w-full -translate-y-1/2 rounded-full bg-foreground
                  transition-all duration-300
                  ${mobileOpen ? "opacity-0" : ""}
                `}
              />

              <span
                className={`
                  absolute bottom-1 left-0
                  h-0.5 w-full rounded-full bg-foreground
                  transition-all duration-300
                  ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}
                `}
              />
            </div>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="
            fixed inset-0 z-[70]
            flex flex-col
            overflow-y-auto
            bg-white/90
            px-7 pt-28
            backdrop-blur-2xl
            animate-in fade-in duration-300
            md:hidden
          "
        >
          <div className="pointer-events-none absolute left-1/2 top-20 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />

          <div className="relative mb-8">
            <p className="text-[11px] tracking-[0.28em] text-muted-foreground">
              WEIGHT MANAGEMENT INFO
            </p>

            <p className="mt-3 text-3xl font-black leading-tight text-foreground">
              {siteName}
            </p>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              健康減重、體重管理、飲食控制與減重醫療資訊整理。
              <br />
              本站由美麗好診所建立並持有。
            </p>
          </div>

          <div className="relative flex flex-col">
            <Link
              href="/"
              onClick={closeMobileMenu}
              aria-current={pathname === "/" ? "page" : undefined}
              className={`
                group
                flex items-center justify-between
                border-b border-border/60
                py-5
                text-xl font-semibold
                ${
                  pathname === "/"
                    ? "text-primary"
                    : "text-foreground"
                }
              `}
            >
              首頁
              <span className="text-primary">→</span>
            </Link>

            <Link
              href="/blog"
              onClick={closeMobileMenu}
              aria-current={isActive("/blog") ? "page" : undefined}
              className={`
                group
                flex items-center justify-between
                border-b border-border/60
                py-5
                text-xl font-semibold
                ${
                  isActive("/blog")
                    ? "text-primary"
                    : "text-foreground"
                }
              `}
            >
              文章列表
              <span className="text-primary">→</span>
            </Link>

            <Link
              href="/about"
              onClick={closeMobileMenu}
              aria-current={isActive("/about") ? "page" : undefined}
              className={`
                group
                flex items-center justify-between
                border-b border-border/60
                py-5
                text-xl font-semibold
                ${
                  isActive("/about")
                    ? "text-primary"
                    : "text-foreground"
                }
              `}
            >
              關於本站
              <span className="text-primary">→</span>
            </Link>
          </div>

          <div className="relative mt-10">
            <LineConsultButton
              className="
                flex w-full items-center justify-center
                rounded-2xl
                bg-[#06C755]
                px-6 py-4
                text-base font-bold
                text-white
                shadow-[0_20px_50px_rgba(129,216,208,0.35)]
              "
            >
              前往美麗好診所諮詢
            </LineConsultButton>
          </div>

          <div className="relative mt-auto pb-8 pt-10 text-sm leading-7 text-muted-foreground">
            <p>{siteName}</p>
            <p>健康減重｜體重管理｜減重醫療資訊</p>
          </div>
        </div>
      )}
    </>
  )
}
