import Link from "next/link"

import { LineConsultButton } from "@/components/line-consult-button"

const siteName = "美麗好減肥減重－體重管理資訊站"

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-white/70 px-5 py-10 backdrop-blur md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <Link
              href="/"
              aria-label={`${siteName}首頁`}
              className="inline-flex items-center gap-3"
            >
              <img
                src="/images/logo.png"
                alt={`${siteName} Logo`}
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="h-12 w-12 rounded-full border border-border bg-white object-cover"
              />

              <div>
                <p className="text-lg font-black tracking-tight text-foreground md:text-xl">
                  {siteName}
                </p>

                <p className="mt-1 text-[10px] tracking-[0.22em] text-muted-foreground">
                  WEIGHT MANAGEMENT INFO
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              整理健康減重、體重管理與減重醫療資訊。本站由
              <a
                href="https://www.merrygood.com.tw"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1 font-semibold text-primary hover:opacity-75"
              >
                美麗好診所
              </a>
              建立並持有；本站為健康資訊網站，不提供線上診斷。
            </p>

            <nav
              aria-label="網站資訊"
              className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"
            >
              <Link href="/about" className="hover:text-primary">
                關於本站
              </Link>

              <Link href="/blog" className="hover:text-primary">
                文章列表
              </Link>

              <Link href="/editorial-policy" className="hover:text-primary">
                編輯政策
              </Link>

              <Link
                href="/medical-review-policy"
                className="hover:text-primary"
              >
                醫療內容政策
              </Link>

              <Link href="/privacy-policy" className="hover:text-primary">
                隱私權政策
              </Link>

              <Link href="/terms" className="hover:text-primary">
                使用條款
              </Link>
            </nav>
          </div>

          <div className="md:text-right">
            <p className="text-sm font-bold text-foreground">
              需要專業醫療評估？
            </p>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              個人化減重、處方藥物或醫療問題，請透過美麗好診所官方管道諮詢。
            </p>

            <LineConsultButton
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#06C755] px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              前往美麗好診所諮詢
            </LineConsultButton>
          </div>
        </div>

        <p className="mt-8 border-t border-border pt-5 text-xs leading-6 text-muted-foreground">
          免責聲明：本網站內容僅供一般健康與減重資訊參考，不構成醫療診斷、處方、治療建議或用藥指示。
          涉及疾病、用藥、懷孕或處方減重藥物時，請諮詢合格醫師、藥師或其他醫療專業人員，
          並以主管機關、藥品仿單及醫療院所的最新資訊為準。
        </p>

        <div className="mt-5 flex flex-col gap-2 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteName}
          </p>

          <p>健康減重｜體重管理｜減重醫療資訊</p>
        </div>
      </div>
    </footer>
  )
}
