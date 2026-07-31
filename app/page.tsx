import type { Metadata } from "next"

import { HeroSection } from "@/components/hero-section"
import { LatestPostsSection } from "@/components/latest-posts-section"

const SITE_URL = "https://news.merrygood.com.tw"
const SITE_NAME = "美麗好減肥減重｜體重管理資訊站"

const PAGE_TITLE =
  "美麗好減肥減重｜體重管理、飲食控制與減重醫療資訊"

const PAGE_DESCRIPTION =
  "美麗好減肥減重提供體重管理、飲食控制、減重方式與減重醫療相關資訊，協助讀者建立正確的體重控制觀念。"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "zh_TW",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
}

const informationCards = [
  {
    number: "01",
    title: "體重管理",
    description:
      "從體重變化、生活習慣、熱量攝取與健康目標出發，理解長期體重控制的核心觀念。",
    keywords: ["生活習慣", "健康目標"],
  },
  {
    number: "02",
    title: "飲食與運動",
    description:
      "整理飲食控制、營養分配、日常活動與規律運動相關知識，建立可持續的健康節奏。",
    keywords: ["營養分配", "規律運動"],
  },
  {
    number: "03",
    title: "減重醫療資訊",
    description:
      "介紹減重門診、專業評估與處方藥物使用時應注意的事項，協助讀者正確認識醫療選項。",
    keywords: ["專業評估", "用藥安全"],
  },
]

export default function Home() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    inLanguage: "zh-Hant-TW",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
  }

  return (
    <div className="overflow-hidden bg-background text-foreground selection:bg-primary/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* 1. 滿版 Hero */}
      <section
        aria-label="美麗好減肥減重首頁主視覺"
        className="relative isolate flex min-h-[calc(100svh-5rem)] items-stretch overflow-hidden"
      >
        {/* 底色與光暈 */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-30 bg-[linear-gradient(135deg,hsl(var(--background))_0%,hsl(var(--background))_36%,hsl(var(--primary)/0.08)_100%)]"
        />

        <div
          aria-hidden="true"
          className="absolute -left-32 top-16 -z-20 h-[34rem] w-[34rem] rounded-full bg-primary/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -right-40 bottom-[-12rem] -z-20 h-[40rem] w-[40rem] rounded-full bg-emerald-300/15 blur-3xl"
        />

        {/* 細緻格線 */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.025] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:72px_72px]"
        />

        {/* 邊角品牌文字 */}
        <div
          aria-hidden="true"
          className="absolute left-6 top-8 hidden text-[0.65rem] font-bold uppercase tracking-[0.32em] text-muted-foreground/60 lg:block"
        >
          Merrygood Health Journal
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-8 right-6 hidden origin-bottom-right -rotate-90 text-[0.65rem] font-bold uppercase tracking-[0.32em] text-muted-foreground/60 lg:block"
        >
          Healthy Weight Management
        </div>

        <div className="mx-auto flex w-full max-w-[1600px] items-stretch px-4 sm:px-6 lg:px-10">
          <div className="flex w-full items-center py-8 sm:py-10 lg:py-12">
            <div className="w-full overflow-hidden rounded-[2rem] border border-border/60 bg-background/40 shadow-[0_35px_100px_-45px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:rounded-[2.5rem]">
              <HeroSection />
            </div>
          </div>
        </div>

        {/* 下一區塊提示 */}
        <div
          aria-hidden="true"
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs font-bold uppercase tracking-[0.26em] text-muted-foreground md:flex"
        >
          <span className="h-px w-10 bg-border" />
          Latest Articles
          <span className="h-px w-10 bg-border" />
        </div>
      </section>

      {/* 2. 最新文章 */}
      <section className="relative isolate border-y border-border/60 bg-muted/20 py-8 sm:py-12 lg:py-16">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 -z-10 h-72 w-[70rem] max-w-[95vw] -translate-x-1/2 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.08),transparent_65%)]"
        />

        <div className="mx-auto max-w-[1500px] px-0 sm:px-4 lg:px-8">
          <LatestPostsSection />
        </div>
      </section>

      {/* 3. 健康減重與體重管理資訊 */}
      <section
        aria-labelledby="weight-management-introduction"
        className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-32"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--muted)/0.35)_50%,hsl(var(--background))_100%)]"
        />

        <div
          aria-hidden="true"
          className="absolute left-[-12rem] top-1/3 -z-20 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute right-[-10rem] top-[-6rem] -z-20 h-[30rem] w-[30rem] rounded-full bg-emerald-300/10 blur-3xl"
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.3fr] lg:gap-20">
            {/* 左側標題 */}
            <div className="lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">
                  Healthy Weight Management
                </p>
              </div>

              <h2
                id="weight-management-introduction"
                className="mt-6 text-4xl font-black leading-tight tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl"
              >
                不只追求
                <span className="block text-primary">體重數字下降</span>
              </h2>

              <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
                健康減重需要同時理解飲食、活動、睡眠、壓力與身體狀況。
                我們整理容易理解、具參考價值的體重管理資訊，
                幫助讀者建立更安全且可持續的健康觀念。
              </p>

              <div className="mt-8 border-l-2 border-primary/30 pl-5">
                <p className="text-sm font-bold leading-7 text-foreground/80">
                  內容僅供一般健康教育參考
                </p>
                <p className="mt-1 text-sm leading-7 text-muted-foreground">
                  實際減重方式仍應依個人身體狀況，
                  由合格醫師、營養師或其他醫療專業人員進行評估。
                </p>
              </div>
            </div>

            {/* 右側資訊卡 */}
            <div className="space-y-5">
              {informationCards.map((card, index) => (
                <article
                  key={card.number}
                  className="group relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/80 p-6 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.4)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)] sm:p-8"
                >
                  <div
                    aria-hidden="true"
                    className="absolute right-[-2rem] top-[-3.5rem] text-[9rem] font-black leading-none tracking-[-0.08em] text-primary/[0.035] transition duration-300 group-hover:text-primary/[0.06] sm:text-[11rem]"
                  >
                    {card.number}
                  </div>

                  <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-sm font-black text-primary">
                      {card.number}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                          {card.title}
                        </h3>

                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground/60">
                          Focus {index + 1}
                        </span>
                      </div>

                      <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                        {card.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {card.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-xs font-bold text-foreground/70"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 頁尾前的品牌收尾 */}
      <section className="px-6 pb-16 sm:pb-24 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-primary/15 bg-primary/[0.06] px-6 py-10 sm:rounded-[2.5rem] sm:px-10 sm:py-14 lg:px-14">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">
                Merrygood Health Journal
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl">
                從正確資訊開始，找到適合自己的健康管理方式
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-muted-foreground lg:text-right">
              持續整理體重管理、飲食控制、運動與減重醫療資訊，
              讓複雜的健康知識更容易被理解。
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
