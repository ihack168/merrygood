"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { LineConsultButton } from "@/components/line-consult-button"

const brandName = "美麗好減重資訊站"
const brandTagline = "體重管理"

const navigationItems = [
  { label: "首頁", href: "/" },
  { label: "減重項目", href: "/weight-loss-programs" },
  { label: "兒童生長門診", href: "/child-growth-clinic" },
  { label: "文章列表", href: "/blog" },
  { label: "關於我們", href: "/about" },
] as const

export function Navbar() {
  const pathname = usePathname()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false)
      }
    }

    window.addEventListener("keydown", handleEscape)

    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const closeMobileMenu = () => {
    setMobileOpen(false)
  }

  const toggleMobileMenu = () => {
    setMobileOpen((current) => !current)
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  if (pathname === "/growth" || pathname.startsWith("/growth/")) {
    return null
  }

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[80]">
        <div className="mx-auto w-full max-w-[1440px] px-3 sm:px-5 xl:px-8">
          <nav
            aria-label="主要導覽"
            className={`
              pointer-events-auto mt-3 flex h-[66px] items-center justify-between
              rounded-2xl border px-4 transition-all duration-300 sm:px-5
              ${
                scrolled
                  ? "border-border/70 bg-background/90 shadow-[0_14px_45px_-24px_rgba(15,23,42,0.35)] backdrop-blur-xl"
                  : "border-white/30 bg-background/70 shadow-sm backdrop-blur-lg"
              }
            `}
          >
            <Link
              href="/"
              aria-label={`${brandName}首頁`}
              className="group flex min-w-0 shrink items-center gap-3"
            >
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-md transition group-hover:bg-primary/30" />

                <Image
                  src="/images/logo.png"
                  alt={`${brandName} Logo`}
                  width={48}
                  height={48}
                  priority
                  className="relative h-12 w-12 rounded-full border border-border/60 bg-white object-cover shadow-sm"
                />
              </div>

              <div className="min-w-0 leading-none">
                <span className="block truncate text-xl font-black tracking-tight text-foreground sm:text-2xl">
                  {brandName}
                </span>

                <span className="mt-1 hidden text-xs font-semibold tracking-[0.16em] text-muted-foreground sm:block">
                  {brandTagline}
                </span>
              </div>
            </Link>

            <div className="hidden items-center gap-0.5 xl:flex">
              {navigationItems.map((item) => {
                const active = isActive(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`
                      relative whitespace-nowrap rounded-full px-4 py-2
                      text-lg font-bold transition-colors duration-200
                      ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <div className="hidden shrink-0 items-center xl:flex">
              <LineConsultButton
                className="
                  inline-flex min-h-10 items-center justify-center
                  whitespace-nowrap rounded-full bg-[#06C755]
                  px-6 py-2.5 text-base font-bold text-white
                  shadow-[0_10px_24px_rgba(6,199,85,0.22)]
                  transition duration-200
                  hover:-translate-y-0.5 hover:bg-[#05b94f]
                  hover:shadow-[0_14px_30px_rgba(6,199,85,0.30)]
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-[#06C755] focus-visible:ring-offset-2
                "
              >
                Line預約諮詢
              </LineConsultButton>
            </div>

            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label={mobileOpen ? "關閉選單" : "開啟選單"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className="
                relative flex h-10 w-10 shrink-0 items-center justify-center
                rounded-full border border-border/70 bg-background/90
                text-foreground shadow-sm transition hover:bg-muted
                xl:hidden
              "
            >
              <span className="sr-only">
                {mobileOpen ? "關閉選單" : "開啟選單"}
              </span>

              <span aria-hidden="true" className="relative block h-4 w-5">
                <span
                  className={`
                    absolute left-0 top-0 h-0.5 w-5 rounded-full
                    bg-current transition duration-300
                    ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}
                  `}
                />

                <span
                  className={`
                    absolute left-0 top-[7px] h-0.5 w-5 rounded-full
                    bg-current transition duration-300
                    ${mobileOpen ? "opacity-0" : ""}
                  `}
                />

                <span
                  className={`
                    absolute bottom-0 left-0 h-0.5 w-5 rounded-full
                    bg-current transition duration-300
                    ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}
                  `}
                />
              </span>
            </button>
          </nav>
        </div>
      </header>

      <button
        type="button"
        aria-label="關閉行動版選單"
        tabIndex={mobileOpen ? 0 : -1}
        onClick={closeMobileMenu}
        className={`
          fixed inset-0 z-[70] bg-black/20 backdrop-blur-sm
          transition-opacity duration-300 xl:hidden
          ${
            mobileOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      <aside
        id="mobile-navigation"
        aria-label="行動版導覽"
        aria-hidden={!mobileOpen}
        className={`
          fixed right-0 top-0 z-[75]
          flex h-dvh w-[88%] max-w-sm flex-col
          border-l border-border/70 bg-background
          px-6 pb-6 pt-24
          shadow-[-20px_0_60px_-30px_rgba(15,23,42,0.35)]
          transition-transform duration-300 xl:hidden
          ${
            mobileOpen
              ? "visible translate-x-0"
              : "invisible translate-x-full"
          }
        `}
      >
        <div className="border-b border-border/70 pb-6">

          <p className="mt-3 text-2xl font-black tracking-tight text-foreground">
            {brandName}
          </p>

        </div>

        <div className="flex flex-col py-4">
          {navigationItems.map((item) => {
            const active = isActive(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                tabIndex={mobileOpen ? 0 : -1}
                aria-current={active ? "page" : undefined}
                className={`
                  flex items-center justify-between
                  border-b border-border/60 py-4
                  text-lg font-bold transition
                  ${
                    active
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }
                `}
              >
                <span>{item.label}</span>

                <span
                  aria-hidden="true"
                  className={active ? "text-primary" : "text-muted-foreground"}
                >
                  →
                </span>
              </Link>
            )
          })}
        </div>

        <div className="mt-auto pt-6">
          <LineConsultButton
            className="
              flex min-h-12 w-full items-center justify-center
              rounded-full bg-[#06C755] px-6 py-3
              text-base font-bold text-white
              shadow-[0_12px_28px_rgba(6,199,85,0.24)]
              transition hover:bg-[#05b94f]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#06C755] focus-visible:ring-offset-2
            "
          >
            Line 預約諮詢
          </LineConsultButton>

          <p className="mt-5 text-center text-xs leading-6 text-muted-foreground">
            {brandTagline}
          </p>
        </div>
      </aside>
    </>
  )
}
