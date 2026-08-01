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

      <HeroSection />

      <LatestPostsSection />

      <section
        aria-labelledby="weight-management-introduction"
        className="mx-auto max-w-5xl px-6 py-8"
      >
        <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
              HEALTHY WEIGHT MANAGEMENT
            </p>

            <h2
              id="weight-management-introduction"
              className="mt-2 text-2xl font-black text-foreground md:text-4xl"
            >
              健康減重與體重管理資訊
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
              本站整理健康減重、體重控制、飲食管理、運動習慣與減重醫療相關資訊，
              協助讀者建立正確觀念。實際減重方式仍應依個人身體狀況，
              由合格醫師、營養師或其他醫療專業人員進行評估。
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-border/70 bg-background/70 p-5">
              <h3 className="text-lg font-black text-foreground">
                體重管理
              </h3>

              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                了解體重變化、生活習慣、熱量攝取與健康目標之間的關係。
              </p>
            </article>

            <article className="rounded-2xl border border-border/70 bg-background/70 p-5">
              <h3 className="text-lg font-black text-foreground">
                飲食與運動
              </h3>

              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                整理飲食控制、營養分配、日常活動與規律運動相關知識。
              </p>
            </article>

            <article className="rounded-2xl border border-border/70 bg-background/70 p-5">
              <h3 className="text-lg font-black text-foreground">
                減重醫療資訊
              </h3>

              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                介紹減重門診、專業評估及處方藥物使用時應注意的事項。
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}