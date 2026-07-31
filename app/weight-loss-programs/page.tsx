import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

const SITE_URL = "https://news.merrygood.com.tw"
const PAGE_PATH = "/weight-loss-programs"
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`

const PAGE_TITLE = "減重項目｜週纖達、猛健樂、瑞倍適完整資訊"
const PAGE_DESCRIPTION =
  "整理週纖達、猛健樂與瑞倍適相關文章，快速了解作用機轉、使用方式、療程重點、副作用與注意事項。點選項目即可查看完整文章列表。"

const programs = [
  {
    order: "01",
    title: "週纖達",
    englishName: "Wegovy",
    tag: "週纖達",
    type: "每週一次注射",
    category: "GLP-1 體重管理針劑",
    intro:
      "週纖達以 Semaglutide 為主要成分，屬於 GLP-1 受體促效劑。相關文章將整理作用原理、適用族群、療程流程、常見副作用、保存方式與使用注意事項。",
    points: [
      "食慾、飽足感與胃排空作用",
      "起始劑量與漸進調整原則",
      "漏打、保存與注射注意事項",
      "常見腸胃不適與安全提醒",
    ],
    featured: true,
  },
  {
    order: "02",
    title: "猛健樂",
    englishName: "Mounjaro",
    tag: "猛健樂",
    type: "每週一次注射",
    category: "GIP／GLP-1 雙重腸泌素",
    intro:
      "猛健樂的主要成分為 Tirzepatide，透過 GIP 與 GLP-1 雙重作用調節血糖、食慾與代謝。相關文章將整理作用機轉、劑量調整、減重研究、副作用與保存方式。",
    points: [
      "GIP 與 GLP-1 雙重作用",
      "低劑量起始與逐步調整",
      "常見副作用與警訊",
      "飲食、蛋白質與生活型態配合",
    ],
    featured: false,
  },
  {
    order: "03",
    title: "瑞倍適",
    englishName: "Rybelsus",
    tag: "瑞倍適",
    type: "每日口服",
    category: "口服型 GLP-1 處方藥物",
    intro:
      "瑞倍適是口服型 GLP-1 藥物。相關文章將整理服用時機、空腹與飲水要求、吸收重點、適合討論口服治療的族群，以及使用時需要注意的事項。",
    points: [
      "早晨空腹服用原則",
      "飲水量與進食等待時間",
      "不便注射者的口服選項",
      "錯誤服用可能影響吸收",
    ],
    featured: false,
  },
] as const

const faqItems = [
  {
    question: "這個頁面整理哪些減重項目？",
    answer:
      "本頁依序整理週纖達、猛健樂與瑞倍適三個主題。點選項目後，會前往該標籤下的所有相關文章。",
  },
  {
    question: "週纖達和猛健樂有什麼不同？",
    answer:
      "依本站知識庫，週纖達的主要成分為 Semaglutide，屬於 GLP-1 受體促效劑；猛健樂的主要成分為 Tirzepatide，具有 GIP 與 GLP-1 雙重作用。兩者的使用方式、劑量調整與風險不同，應由醫師依個別狀況評估。",
  },
  {
    question: "瑞倍適需要打針嗎？",
    answer:
      "不需要。瑞倍適屬於口服型 GLP-1 藥物，但服用方式會影響吸收，必須依醫囑空腹服用，並遵守飲水量與等待進食時間。",
  },
  {
    question: "哪一種減重藥物效果最好？",
    answer:
      "不能只用單一減重數字判斷。適合的選擇會受到身體狀況、疾病史、血糖、腸胃耐受度、用藥習慣與其他藥物影響，應由醫師進行個別化評估。",
  },
  {
    question: "閱讀文章後可以自行購買或調整藥物嗎？",
    answer:
      "不建議。本站內容僅供一般衛教參考，不能取代診斷、處方與醫療追蹤。請勿自行購買、共用、混合或調整處方藥物。",
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
    "@id": `${PAGE_URL}#topics`,
    name: "減重項目",
    description: PAGE_DESCRIPTION,
    numberOfItems: programs.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: programs.map((program, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: program.title,
      description: program.intro,
      url: `${SITE_URL}/blog?tag=${encodeURIComponent(program.tag)}`,
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
    "@type": "WebPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    inLanguage: "zh-Hant-TW",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "美麗好減肥減重｜體重管理資訊站",
    },
    mainEntity: {
      "@id": `${PAGE_URL}#topics`,
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
        <section className="relative isolate h-[520px] overflow-hidden border-b border-white/15 sm:h-[560px] lg:h-[620px]">
          <Image
            src="/images/weight-loss-programs-hero.png"
            alt="醫師與民眾進行體重管理諮詢"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/58 to-black/22"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10"
          />

          <div
            aria-hidden="true"
            className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl"
          />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
            <div className="max-w-3xl">
              <nav aria-label="麵包屑">
                <ol className="flex items-center gap-2 text-sm text-white/72">
                  <li>
                    <Link href="/" className="transition hover:text-white">
                      首頁
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="font-bold text-white">
                    減重項目
                  </li>
                </ol>
              </nav>

              <p className="mt-8 text-sm font-black uppercase tracking-[0.28em] text-emerald-300 sm:text-base">
                Weight Management
              </p>

              <h1 className="mt-4 text-5xl font-black leading-[1.05] tracking-[-0.05em] text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
                減重項目
                <span className="block text-emerald-300">一次看懂</span>
              </h1>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="program-list-title"
          className="relative isolate py-12 sm:py-14 lg:py-16"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted)/0.18),hsl(var(--background)))]"
          />

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">
                  Browse by topic
                </p>
                <h2
                  id="program-list-title"
                  className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl"
                >
                  選擇減重項目
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-right">
                每張卡片都會前往對應的文章標籤頁，集中閱讀同一主題內容。
              </p>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {programs.map((program) => (
                <Link
                  key={program.tag}
                  href={`/blog?tag=${encodeURIComponent(program.tag)}`}
                  aria-label={`查看所有${program.title}相關文章`}
                  className={`
                    group relative isolate overflow-hidden rounded-[1.75rem]
                    border p-6 transition duration-300 hover:-translate-y-1
                    hover:shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)]
                    ${
                      program.featured
                        ? "border-primary/25 bg-primary/[0.075]"
                        : "border-border/70 bg-card/80"
                    }
                  `}
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-3 -top-6 -z-10 text-[7rem] font-black leading-none text-primary/[0.045] transition group-hover:text-primary/[0.075]"
                  >
                    {program.order}
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex rounded-full border border-primary/15 bg-background/75 px-3 py-1.5 text-[11px] font-black text-primary">
                        {program.type}
                      </span>
                      <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                        {program.englishName}
                      </p>
                      <h3 className="mt-2 text-3xl font-black tracking-[-0.035em]">
                        {program.title}
                      </h3>
                    </div>

                    <span className="text-sm font-black text-primary">
                      {program.order}
                    </span>
                  </div>

                  <p className="mt-3 text-xs font-bold text-primary">
                    {program.category}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {program.intro}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {program.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-6 text-foreground/80"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-5">
                    <span className="text-sm font-black">
                      查看相關文章
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition group-hover:translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-muted/22 py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">
                  Before choosing
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
                  選擇前先看四件事
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    number: "01",
                    title: "適應情境",
                    text: "先確認文章談的是血糖控制、體重管理或其他醫療用途。",
                  },
                  {
                    number: "02",
                    title: "使用方式",
                    text: "注射頻率、口服方式與劑量調整原則各不相同。",
                  },
                  {
                    number: "03",
                    title: "風險與耐受度",
                    text: "效果之外，也要了解副作用、禁忌與需要就醫的警訊。",
                  },
                  {
                    number: "04",
                    title: "個別化評估",
                    text: "病史、用藥、血糖與腸胃狀況都可能影響選擇。",
                  },
                ].map((item) => (
                  <article
                    key={item.number}
                    className="rounded-2xl border border-border/70 bg-background/80 p-5"
                  >
                    <div className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-black text-primary">
                        {item.number}
                      </span>
                      <div>
                        <h3 className="font-black">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="faq-title"
          className="py-12 sm:py-14 lg:py-16"
        >
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">
                  Frequently asked questions
                </p>
                <h2
                  id="faq-title"
                  className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl"
                >
                  常見問題
                </h2>
              </div>

              <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-right">
                快速了解三個項目的差異與基本使用原則。
              </p>
            </div>

            <div className="mt-7 divide-y divide-border/70 overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/75">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group px-6 py-5 open:bg-muted/25 sm:px-7"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left">
                    <h3 className="font-black leading-7 sm:text-lg">
                      {item.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-lg transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>

                  <p className="mt-4 max-w-3xl pr-10 text-sm leading-7 text-muted-foreground">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 lg:px-8 lg:pb-16">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-primary/15 bg-primary/[0.07] px-6 py-7 sm:px-8 sm:py-8">
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-primary/15 blur-3xl"
            />

            <div className="relative grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">
                  Medical information notice
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] sm:text-3xl">
                  本站內容僅供衛教參考
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-7 text-muted-foreground lg:text-right">
                藥物效果、副作用與適合劑量因人而異。
                請勿自行購買、共用、混合或調整處方藥物。
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
