import type { Metadata } from "next";

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { LatestPostsSection } from "@/components/latest-posts-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

const SITE_URL = "https://你的實際網址.tw";

const SITE_NAME = "美麗好減肥減重｜體重管理資訊站";

const PAGE_TITLE =
  "美麗好減肥減重｜體重管理、飲食控制與減重醫療資訊";

const PAGE_DESCRIPTION =
  "美麗好減肥減重提供體重管理、飲食控制、減重方式與減重醫療相關資訊，協助讀者建立正確的體重控制觀念。";

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
};

export default function Home() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: PAGE_DESCRIPTION,
    areaServed: {
      "@type": "Country",
      name: "Taiwan",
    },
    knowsAbout: [
      "體重管理",
      "健康減重",
      "飲食控制",
      "減重醫療資訊",
      "肥胖管理",
      "運動與體態管理",
      "猛健樂",
      "週纖達",
      "瑞倍適",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: PAGE_DESCRIPTION,
    inLanguage: "zh-Hant",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    inLanguage: "zh-Hant",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "美麗好減肥減重是什麼類型的網站？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "美麗好減肥減重是提供健康減重、體重管理、飲食控制與減重醫療相關內容的資訊網站，協助讀者了解不同的體重管理方式。",
        },
      },
      {
        "@type": "Question",
        name: "減重門診通常可以提供哪些協助？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "減重門診通常會依個人健康狀況、體重目標、飲食習慣與生活型態，提供身體評估、飲食建議、體重追蹤與醫療諮詢。",
        },
      },
      {
        "@type": "Question",
        name: "猛健樂、週纖達、瑞倍適可以自行使用嗎？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "猛健樂、週纖達與瑞倍適屬於需由醫師評估的處方藥物，不應自行購買或使用。是否適合使用，必須由醫師依個人病史、用藥狀況及健康條件判斷。",
        },
      },
      {
        "@type": "Question",
        name: "哪些人適合尋求體重管理諮詢？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "想改善體重、控制飲食、調整生活習慣，或因肥胖相關健康問題需要專業協助的人，都可以考慮尋求合格醫療人員或營養專業人員的評估。",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground selection:bg-primary/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Navbar />

      <main>
        <section className="pb-4 pt-24 md:pb-6 md:pt-32">
          <HeroSection />
        </section>

        <LatestPostsSection />

        <section
          aria-labelledby="weight-management-introduction"
          className="mx-auto max-w-5xl px-6 py-16"
        >
          <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur md:p-10">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                HEALTHY WEIGHT MANAGEMENT
              </p>

              <h2
                id="weight-management-introduction"
                className="mt-3 text-2xl font-black text-foreground md:text-4xl"
              >
                健康減重與體重管理資訊
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
                本站整理健康減重、體重控制、飲食管理、運動習慣與減重醫療相關資訊，
                協助讀者建立正確觀念。實際減重方式仍應依個人身體狀況，
                由合格醫師、營養師或其他醫療專業人員進行評估。
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-border/70 bg-background/70 p-5">
                <h3 className="text-lg font-black text-foreground">
                  體重管理
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  了解體重變化、生活習慣、熱量攝取與健康目標之間的關係。
                </p>
              </article>

              <article className="rounded-2xl border border-border/70 bg-background/70 p-5">
                <h3 className="text-lg font-black text-foreground">
                  飲食與運動
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  整理飲食控制、營養分配、日常活動與規律運動相關知識。
                </p>
              </article>

              <article className="rounded-2xl border border-border/70 bg-background/70 p-5">
                <h3 className="text-lg font-black text-foreground">
                  減重醫療資訊
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  介紹減重門診、專業評估及處方藥物使用時應注意的事項。
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="weight-management-faq"
          className="mx-auto max-w-5xl px-6 pb-16"
        >
          <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur md:p-10">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                FREQUENTLY ASKED QUESTIONS
              </p>

              <h2
                id="weight-management-faq"
                className="mt-3 text-2xl font-black text-foreground md:text-4xl"
              >
                減肥減重常見問題
              </h2>
            </div>

            <div className="mt-8 space-y-6">
              <article>
                <h3 className="text-lg font-black text-foreground">
                  美麗好減肥減重是什麼類型的網站？
                </h3>

                <p className="mt-2 leading-7 text-muted-foreground">
                  美麗好減肥減重是提供健康減重、體重管理、飲食控制與減重醫療相關內容的資訊網站，
                  協助讀者了解不同的體重管理方式。
                </p>
              </article>

              <article>
                <h3 className="text-lg font-black text-foreground">
                  減重門診通常可以提供哪些協助？
                </h3>

                <p className="mt-2 leading-7 text-muted-foreground">
                  減重門診通常會依個人健康狀況、體重目標、飲食習慣與生活型態，
                  提供身體評估、飲食建議、體重追蹤與醫療諮詢。
                </p>
              </article>

              <article>
                <h3 className="text-lg font-black text-foreground">
                  猛健樂、週纖達、瑞倍適可以自行使用嗎？
                </h3>

                <p className="mt-2 leading-7 text-muted-foreground">
                  這些藥物需要由醫師依個人病史、目前用藥及健康狀況進行評估，
                  不應自行購買、使用、調整劑量或與他人共用。
                </p>
              </article>

              <article>
                <h3 className="text-lg font-black text-foreground">
                  哪些人適合尋求體重管理諮詢？
                </h3>

                <p className="mt-2 leading-7 text-muted-foreground">
                  想改善體重、控制飲食、調整生活習慣，
                  或因肥胖相關健康問題需要專業協助的人，
                  都可以考慮尋求合格醫療人員或營養專業人員的評估。
                </p>
              </article>
            </div>

            <p className="mt-8 rounded-2xl border border-border/70 bg-background/70 p-4 text-sm leading-7 text-muted-foreground">
              本站內容僅供一般健康資訊參考，不能取代醫師診斷、處方或個別化醫療建議。
              如有疾病、正在服藥、懷孕或其他特殊健康狀況，
              請先諮詢合格醫療專業人員。
            </p>
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}