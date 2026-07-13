import Link from "next/link"

import { LineConsultButton } from "@/components/line-consult-button"

const siteName = "美麗好減肥減重－體重管理資訊站"

export function Footer() {
  return (
    <footer
      className="
        relative overflow-hidden
        border-t border-white/40
        bg-gradient-to-b from-white/55 to-white/75
        px-6 pt-20
        backdrop-blur-2xl
      "
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-primary/12 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-16 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <Link
              href="/"
              aria-label={`${siteName}首頁`}
              className="inline-flex items-center justify-center gap-5 md:justify-start"
            >
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl" />

                <img
                  src="/images/logo.png"
                  alt={`${siteName} Logo`}
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="
                    relative
                    h-16 w-16
                    rounded-full
                    border border-white/70
                    bg-white
                    object-cover
                    shadow-[0_14px_40px_rgba(129,216,208,0.22)]
                  "
                />
              </div>

              <div>
                <p className="text-2xl font-black tracking-tight text-foreground md:text-3xl">
                  {siteName}
                </p>

                <p className="mt-2 text-[11px] tracking-[0.28em] text-muted-foreground">
                  WEIGHT MANAGEMENT INFO
                </p>
              </div>
            </Link>

            <p className="mx-auto mt-7 max-w-md text-sm leading-8 text-muted-foreground md:mx-0">
              整理健康減重、體重管理、飲食控制、運動習慣與減重醫療相關資訊，
              協助讀者建立正確且可持續的體重管理觀念。
            </p>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground md:mx-0">
              本網站由
              <a
                href="https://www.merrygood.com.tw"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1 font-semibold text-primary transition-opacity hover:opacity-75"
              >
                美麗好診所
              </a>
              建立並持有；本站為健康資訊網站，不提供線上診斷。
            </p>

            <nav
              aria-label="網站資訊"
              className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm font-medium text-muted-foreground md:justify-start"
            >
              <Link
                href="/about"
                className="transition-colors hover:text-primary"
              >
                關於本站
              </Link>

              <Link
                href="/blog"
                className="transition-colors hover:text-primary"
              >
                文章列表
              </Link>

              <Link
                href="/editorial-policy"
                className="transition-colors hover:text-primary"
              >
                編輯政策
              </Link>

              <Link
                href="/medical-review-policy"
                className="transition-colors hover:text-primary"
              >
                醫療內容政策
              </Link>

              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-primary"
              >
                隱私權政策
              </Link>

              <Link
                href="/terms"
                className="transition-colors hover:text-primary"
              >
                使用條款
              </Link>
            </nav>
          </div>

          <div className="text-center md:max-w-sm md:text-right">
            <div
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-primary/15
                bg-white/60
                px-4 py-2
                text-[11px] font-black
                tracking-[0.2em]
                text-accent
                shadow-sm
                backdrop-blur
              "
            >
              MERRYGOOD CLINIC
            </div>

            <p className="mt-5 text-2xl font-black tracking-tight text-foreground">
              需要專業醫療評估？
            </p>

            <p className="mt-4 text-sm leading-8 text-muted-foreground">
              若有個人化減重、處方藥物或醫療諮詢需求，
              可透過美麗好診所官方 LINE 聯絡專業團隊。
            </p>

            <LineConsultButton
              className="
                mt-7 inline-flex items-center justify-center
                rounded-full
                bg-[#06C755]
                px-8 py-3.5
                text-sm font-black
                text-white
                shadow-[0_20px_50px_rgba(129,216,208,0.34)]
                transition-all duration-300
                hover:-translate-y-1
                hover:scale-[1.02]
                hover:shadow-[0_26px_65px_rgba(129,216,208,0.42)]
              "
            >
              前往美麗好診所諮詢
            </LineConsultButton>

            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              點擊後將前往美麗好診所的官方諮詢管道。
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-white/60 bg-white/45 px-5 py-5 text-center shadow-sm backdrop-blur">
          <p className="text-xs leading-6 text-muted-foreground">
            免責聲明：本網站部分內容可能由 AI 協助整理，並經人工審閱後發布。
            網站內容僅供一般健康、減重與醫藥資訊參考，不構成醫療診斷、處方、治療建議、
            用藥指示、減重保證或任何專業醫療意見。減重藥物、適應症、禁忌症、
            副作用與實際效果會因個人體質、病史、用藥狀況與醫師評估而有所不同。
            如有減重、用藥或健康相關需求，請諮詢合格醫師、藥師或其他醫療專業人員，
            並以衛生主管機關、藥品仿單、醫療院所或官方公告的最新資訊為準。
          </p>
        </div>

        <div className="mt-8 border-t border-white/50" />

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-center md:flex-row md:text-left">
          <p className="text-xs leading-6 tracking-[0.08em] text-muted-foreground">
            © {new Date().getFullYear()} {siteName}
            <br className="md:hidden" />
            <span className="md:ml-2">All rights reserved.</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground md:justify-end">
            <span>健康減重</span>
            <span>體重管理</span>
            <span>減重醫療資訊</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
