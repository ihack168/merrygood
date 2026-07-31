import type { Metadata } from "next"
import Link from "next/link"

const SITE_URL = "https://news.merrygood.com.tw"
const PAGE_PATH = "/weight-loss-programs"
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`

const PAGE_TITLE =
  "減重項目｜週纖達、猛健樂、瑞倍適與長效型生長激素資訊"

const PAGE_DESCRIPTION =
  "整理週纖達、猛健樂、瑞倍適與長效型生長激素相關文章，提供體重管理、處方藥物與兒童生長議題的衛教資訊入口。"

const programs = [
  {
    order: "01",
    title: "週纖達",
    englishName: "Wegovy",
    tag: "週纖達",
    category: "體重管理",
    summary:
      "查看週纖達的作用原理、適用對象、使用方式、常見注意事項與體重管理相關文章。",
    keywords: ["作用原理", "適用對象", "使用方式", "注意事項"],
    featured: true,
  },
  {
    order: "02",
    title: "猛健樂",
    englishName: "Mounjaro",
    tag: "猛健樂",
    category: "代謝與體重管理",
    summary:
      "查看猛健樂的藥物機轉、醫療評估、使用注意事項與體重管理相關文章。",
    keywords: ["藥物機轉", "醫療評估", "使用資訊", "安全提醒"],
    featured: false,
  },
  {
    order: "03",
    title: "瑞倍適",
    englishName: "Rybelsus",
    tag: "瑞倍適",
    category: "口服腸泌素資訊",
    summary:
      "查看瑞倍適的口服使用方式、第二型糖尿病用藥資訊，以及與體重變化相關的衛教文章。",
    keywords: ["口服使用", "糖尿病資訊", "體重變化", "用藥提醒"],
    featured: false,
  },
  {
    order: "04",
    title: "長效型生長激素",
    englishName: "Long-acting Growth Hormone",
    tag: "長效型生長激素",
    category: "兒童生長專題",
    summary:
      "查看長效型生長激素、兒童身高、生長速度、專業評估與生長門診相關文章。",
    keywords: ["兒童身高", "生長速度", "專業評估", "生長門診"],
    featured: false,
  },
] as const

const faqItems = [
  {
    question: "減重項目頁面提供哪些資訊？",
    answer:
      "本頁整理週纖達、猛健樂、瑞倍適與長效型生長激素四個主題。點選項目後，可查看該標籤下的所有相關文章。",
  },
  {
    question: "週纖達、猛健樂與瑞倍適該如何選擇？",
    answer:
      "不同藥物的核准適應症、使用方式、禁忌與風險並不相同，不能只依體重數字或網路經驗選擇。是否適合使用，應由醫師依健康狀況、病史、用藥與檢查結果評估。",
  },
  {
    question: "長效型生長激素是減重藥物嗎？",
    answer:
      "不是。長效型生長激素屬於兒童生長與內分泌評估相關主題，本頁將其列為診所重點資訊入口，但不應視為減重治療。",
  },
  {
    question: "閱讀文章後可以自行購買或使用藥物嗎？",
    answer:
      "不建議。本站內容僅供一般衛教參考，不能取代診斷、處方或個別化醫療建議。處方藥物應經合格醫師評估與開立。",
  },
] as const

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_PATH,
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "美麗好減肥減重｜體重管理資訊站",
    locale: "zh_TW",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
}

export default function WeightLossProgramsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首頁",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "減重項目",
        item: PAGE_URL,
      },
    ],
  }

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${PAGE_URL}#item-list`,
    name: "減重與生長資訊項目",
    description: PAGE_DESCRIPTION,
    numberOfItems: programs.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: programs.map((program, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: program.title,
      url: `${SITE_URL}/blog?tag=${encodeURIComponent(program.tag)}`,
      description: program.summary,
    })),
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${PAGE_URL}#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    inLanguage: "zh-Hant-TW",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: programs.map((program) => ({
      "@type": "MedicalEntity",
      name: program.title,
      alternateName: program.englishName,
    })),
    mainEntity: {
      "@id": `${PAGE_URL}#item-list`,
    },
  }

  return (
    <div className="overflow-hidden bg-background text-foreground selection:bg-primary/20">
      {[webPageJsonLd, breadcrumbJsonLd, itemListJsonLd, faqJsonLd].map(
        (jsonLd, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />
        ),
      )}

      <main>
        <section className="relative isolate min-h-[78svh] overflow-hidden border-b border-border/60">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-30 bg-[linear-gradient(145deg,hsl(var(--background))_0%,hsl(var(--background))_48%,hsl(var(--primary)/0.10)_100%)]"
          />

          <div
            aria-hidden="true"
            className="absolute -left-40 top-20 -z-20 h-[34rem] w-[34rem] rounded-full bg-primary/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -right-40 bottom-[-10rem] -z-20 h-[38rem] w-[38rem] rounded-full bg-emerald-300/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-[0.025] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:72px_72px]"
          />

          <div className="mx-auto flex min-h-[78svh] max-w-7xl items-center px-6 pb-20 pt-32 lg:px-8 lg:pb-24 lg:pt-36">
            <div className="grid w-full items-end gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
              <div>
                <nav aria-label="麵包屑">
                  <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                    <li>
                      <Link href="/" className="transition hover:text-primary">
                        首頁
                      </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li aria-current="page" className="font-bold text-foreground">
                      減重項目
                    </li>
                  </ol>
                </nav>

                <p className="mt-10 text-xs font-black uppercase tracking-[0.28em] text-primary sm:text-sm">
                  Weight Management Topics
                </p>

                <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[1.08] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                  減重項目與
                  <span className="block text-primary">專業衛教資訊</span>
                </h1>

                <p className="mt-7 max-w-3xl text-lg leading-9 text-muted-foreground">
                  本頁依序整理週纖達、猛健樂、瑞倍適與長效型生長激素相關內容。
                  點選任一項目，即可查看該主題標籤下的所有文章。
                </p>
              </div>

              <div className="rounded-[2rem] border border-border/60 bg-card/65 p-6 shadow-[0_30px_90px_-55px_rgba(15,23,42,0.45)] backdrop-blur-md sm:p-8">
                <p className="text-sm font-black text-foreground">
                  先了解，再評估
                </p>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  藥物是否適合使用，需考量核准適應症、身體狀況、疾病史、
                  正在使用的藥物與醫療檢查結果，應由合格醫師進行個別評估。
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                    <p className="text-2xl font-black text-primary">4</p>
                    <p className="mt-1 text-xs font-bold text-muted-foreground">
                      重點資訊主題
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                    <p className="text-2xl font-black text-primary">1</p>
                    <p className="mt-1 text-xs font-bold text-muted-foreground">
                      專業評估原則
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="program-list-title"
          className="relative isolate py-20 sm:py-24 lg:py-32"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted)/0.25),hsl(var(--background)))]"
          />

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">
                Browse by topic
              </p>

              <h2
                id="program-list-title"
                className="mt-4 text-3xl font-black tracking-[-0.035em] sm:text-5xl"
              >
                選擇想了解的項目
              </h2>

              <p className="mt-5 text-base leading-8 text-muted-foreground">
                每個入口都會前往對應的文章標籤列表，方便集中閱讀同一主題的最新內容。
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {programs.map((program) => (
                <Link
                  key={program.tag}
                  href={`/blog?tag=${encodeURIComponent(program.tag)}`}
                  aria-label={`查看所有${program.title}相關文章`}
                  className={`
                    group relative isolate min-h-[22rem] overflow-hidden
                    rounded-[2rem] border p-7
                    shadow-[0_24px_70px_-50px_rgba(15,23,42,0.45)]
                    transition duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_34px_85px_-48px_rgba(15,23,42,0.5)]
                    sm:p-9
                    ${
                      program.featured
                        ? "border-primary/25 bg-primary/[0.08]"
                        : "border-border/70 bg-card/80"
                    }
                  `}
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-6 -top-12 -z-10 text-[10rem] font-black leading-none tracking-[-0.1em] text-primary/[0.045] transition duration-300 group-hover:text-primary/[0.075] sm:text-[12rem]"
                  >
                    {program.order}
                  </div>

                  <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full border border-primary/15 bg-background/70 px-3.5 py-2 text-xs font-black text-primary backdrop-blur">
                        {program.category}
                      </span>

                      <span className="text-sm font-black text-primary">
                        {program.order}
                      </span>
                    </div>

                    <div className="mt-10">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                        {program.englishName}
                      </p>

                      <h3 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
                        {program.title}
                      </h3>

                      <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
                        {program.summary}
                      </p>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {program.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full border border-border/60 bg-background/65 px-3 py-1.5 text-xs font-bold text-foreground/70"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-7">
                      <span className="text-sm font-black text-foreground">
                        查看所有相關文章
                      </span>

                      <span
                        aria-hidden="true"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background transition duration-300 group-hover:translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-amber-200/80 bg-amber-50/80 p-6 dark:border-amber-900/50 dark:bg-amber-950/20 sm:p-8">
              <p className="font-black text-amber-950 dark:text-amber-100">
                長效型生長激素不是減重藥物
              </p>

              <p className="mt-3 text-sm leading-7 text-amber-900/80 dark:text-amber-100/70">
                此主題屬於兒童生長、身高與內分泌評估相關內容。
                本站將其列於重點項目入口，方便家長查看生長門診與相關衛教文章，
                但不應與成人減重治療混為一談。
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="how-to-read-title"
          className="border-y border-border/60 bg-muted/25 py-20 sm:py-24"
        >
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">
                Before you decide
              </p>

              <h2
                id="how-to-read-title"
                className="mt-4 text-3xl font-black tracking-[-0.035em] sm:text-5xl"
              >
                閱讀資訊時
                <span className="block text-primary">先掌握三件事</span>
              </h2>
            </div>

            <div className="grid gap-4">
              {[
                {
                  number: "01",
                  title: "確認文章談的是哪一種適應症",
                  text: "同一成分或同類藥物可能有不同商品名、劑型與核准用途，不應只看網路上的減重經驗。",
                },
                {
                  number: "02",
                  title: "了解風險與限制，不只看效果",
                  text: "閱讀時應同時注意禁忌、常見不適、警訊、追蹤方式與停止使用時的處理原則。",
                },
                {
                  number: "03",
                  title: "由醫師完成個別化評估",
                  text: "體重、血糖、病史、懷孕計畫、腸胃狀況與其他用藥，都可能影響治療選擇。",
                },
              ].map((item) => (
                <article
                  key={item.number}
                  className="rounded-3xl border border-border/70 bg-background/80 p-6 sm:p-8"
                >
                  <div className="flex gap-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-sm font-black text-primary">
                      {item.number}
                    </span>

                    <div>
                      <h3 className="text-xl font-black">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="faq-title"
          className="py-20 sm:py-24 lg:py-32"
        >
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">
                Frequently asked questions
              </p>

              <h2
                id="faq-title"
                className="mt-4 text-3xl font-black tracking-[-0.035em] sm:text-5xl"
              >
                常見問題
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                快速了解本頁資訊範圍，以及閱讀處方藥物文章時應注意的原則。
              </p>
            </div>

            <div className="mt-12 divide-y divide-border/70 overflow-hidden rounded-[2rem] border border-border/70 bg-card/70">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group p-6 open:bg-muted/25 sm:p-8"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left">
                    <h3 className="text-lg font-black leading-8 sm:text-xl">
                      {item.question}
                    </h3>

                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xl transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>

                  <p className="mt-5 max-w-3xl pr-12 text-sm leading-8 text-muted-foreground sm:text-base">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 lg:px-8 lg:pb-28">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-primary/15 bg-primary/[0.07] px-6 py-10 sm:rounded-[2.5rem] sm:px-10 sm:py-14">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
            />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">
                  Medical information notice
                </p>

                <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                  本站內容不能取代醫師診斷與處方
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-7 text-muted-foreground lg:text-right">
                若正在服藥、患有慢性疾病、懷孕、哺乳，或出現身體不適，
                請先諮詢合格醫師或藥師，不要自行購買、共用或調整處方藥物。
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
