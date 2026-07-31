import type { Metadata } from "next"
import Link from "next/link"

const SITE_URL = "https://news.merrygood.com.tw"
const PAGE_PATH = "/weight-loss-programs"
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`

const PAGE_TITLE =
  "減重項目｜週纖達、猛健樂、瑞倍適與兒童生長專題"

const PAGE_DESCRIPTION =
  "整理週纖達、猛健樂、瑞倍適，以及長效型生長激素與兒童生長門診相關文章。點選項目即可查看同一標籤下的完整內容。"

const programs = [
  {
    order: "01",
    title: "週纖達",
    englishName: "Wegovy",
    tag: "週纖達",
    category: "每週一次 GLP-1 體重管理針劑",
    intro:
      "週纖達是以 Semaglutide 為主要成分的 GLP-1 受體促效劑，通常每週注射一次。相關文章將整理其作用原理、適用族群、療程流程、常見副作用、保存方式與使用注意事項。",
    points: [
      "了解 GLP-1 如何影響食慾、飽足感與胃排空",
      "認識成人與青少年體重管理相關評估條件",
      "查看起始劑量、漸進調整與漏打處理資訊",
      "閱讀常見腸胃道不適與重要安全提醒",
    ],
    note:
      "是否適合使用，仍需由醫師依身體狀況、病史、用藥與檢查結果個別評估。",
    featured: true,
  },
  {
    order: "02",
    title: "猛健樂",
    englishName: "Mounjaro",
    tag: "猛健樂",
    category: "每週一次 GIP／GLP-1 雙重腸泌素針劑",
    intro:
      "猛健樂的主要成分為 Tirzepatide，透過 GIP 與 GLP-1 雙重作用調節血糖、食慾與代謝。相關文章將整理作用機轉、劑量調整、體重管理研究、副作用與保存方式。",
    points: [
      "認識 GIP 與 GLP-1 的雙重作用機制",
      "了解低劑量起始、逐步調整的療程原則",
      "查看常見腸胃道不適與少見但重要的警訊",
      "了解為何需要飲食、蛋白質與生活型態配合",
    ],
    note:
      "附件內容強調劑量不是越高越好，應依耐受度、食慾變化與醫師追蹤逐步調整。",
    featured: false,
  },
  {
    order: "03",
    title: "瑞倍適",
    englishName: "Rybelsus",
    tag: "瑞倍適",
    category: "每日口服 GLP-1 處方藥物",
    intro:
      "瑞倍適是口服型 GLP-1 藥物。相關文章將整理其服用時機、空腹與飲水要求、適合討論口服治療的族群，以及使用時需要注意的事項。",
    points: [
      "早晨空腹服用並遵照醫囑控制飲水量",
      "服藥後需等待一段時間再飲食或服用其他藥物",
      "適合進一步了解不便注射或害怕針頭者的選項",
      "服用方式會影響吸收，不能任意更改",
    ],
    note:
      "瑞倍適的正確服用方式是內容重點，實際劑量、用途與是否適合使用，應由醫師判斷。",
    featured: false,
  },
  {
    order: "04",
    title: "長效型生長激素",
    englishName: "Long-acting Growth Hormone",
    tag: "長效型生長激素",
    category: "兒童生長與內分泌專題",
    intro:
      "長效型生長激素不是一般減重藥物。本區主要整理兒童身高、生長速度、骨齡、青春期發育、生長激素缺乏與兒童內分泌門診相關文章。",
    points: [
      "了解兒童生長門診會評估哪些項目",
      "認識身高百分位、生長速度與骨齡",
      "查看性早熟、青春期延遲與兒童肥胖資訊",
      "了解哪些情況可能需要兒童內分泌專科評估",
    ],
    note:
      "是否需要生長激素治療，必須先區分正常生長變異與疾病因素，不能只因孩子身高較矮就自行使用。",
    featured: false,
  },
] as const

const readingSteps = [
  {
    number: "01",
    title: "先確認文章談的是哪一種用途",
    text:
      "同一類腸泌素藥物可能涉及血糖控制、體重管理或其他醫療用途。閱讀時應先確認文章的對象、適應情境與評估條件。",
  },
  {
    number: "02",
    title: "效果與風險要一起閱讀",
    text:
      "不要只看減重幅度，也要同時了解常見副作用、禁忌、特殊族群限制、保存方式與需要立即就醫的警訊。",
  },
  {
    number: "03",
    title: "藥物不能取代飲食與生活調整",
    text:
      "附件內容反覆強調均衡飲食、蛋白質攝取、規律運動、睡眠與醫療追蹤，都是長期體重管理的重要部分。",
  },
  {
    number: "04",
    title: "由醫師決定是否適合使用",
    text:
      "處方藥物與生長激素都不適合自行購買或自行調整。實際選擇需依病史、身體狀況、用藥與檢查結果評估。",
  },
] as const

const faqItems = [
  {
    question: "這個頁面有哪些項目？",
    answer:
      "本頁依序整理週纖達、猛健樂、瑞倍適，以及長效型生長激素與兒童生長門診相關主題。點選項目後，會前往該標籤下的文章列表。",
  },
  {
    question: "週纖達和猛健樂有什麼不同？",
    answer:
      "依附件內容，週纖達的主要成分為 Semaglutide，屬於 GLP-1 受體促效劑；猛健樂的主要成分為 Tirzepatide，具有 GIP 與 GLP-1 雙重作用。兩者的適用情況、劑量與風險不同，不能只依網路減重數據自行選擇。",
  },
  {
    question: "瑞倍適是口服版本的瘦瘦筆嗎？",
    answer:
      "附件將瑞倍適描述為口服型 GLP-1 藥物。它不需要注射，但服用時機、空腹時間與飲水方式會影響吸收，因此必須依醫囑使用。",
  },
  {
    question: "長效型生長激素是減重藥物嗎？",
    answer:
      "不是。本頁將它列為診所重點資訊入口，主要對應兒童生長、骨齡、青春期、身高與內分泌評估。任何生長激素治療都必須由專科醫師完成評估。",
  },
  {
    question: "什麼情況可以考慮兒童生長門診？",
    answer:
      "依附件內容，若孩子身高低於同齡第 3 百分位、生長速度變慢、逐漸落後同儕、女孩 8 歲前或男孩 9 歲前出現第二性徵、青春期延遲、持續肥胖，或家長擔心生長發育異常，可考慮接受兒童內分泌專業評估。",
  },
  {
    question: "閱讀文章後可以自行購買或調整藥物嗎？",
    answer:
      "不建議。本站內容僅供一般衛教參考，不能取代醫師診斷、處方與個別化追蹤。處方藥物與生長激素都應由合格醫師評估後使用。",
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
    name: "體重管理與兒童生長重點項目",
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
        <section className="relative isolate min-h-[76svh] overflow-hidden border-b border-border/60">
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

          <div className="mx-auto flex min-h-[76svh] max-w-7xl items-center px-6 pb-20 pt-32 lg:px-8 lg:pb-24 lg:pt-36">
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
                  <span className="block text-primary">兒童生長專題</span>
                </h1>

                <p className="mt-7 max-w-3xl text-lg leading-9 text-muted-foreground">
                  依序整理週纖達、猛健樂、瑞倍適，以及長效型生長激素與兒童生長門診內容。
                  點選項目，即可查看同一標籤下的完整文章。
                </p>
              </div>

              <div className="rounded-[2rem] border border-border/60 bg-card/70 p-6 shadow-[0_30px_90px_-55px_rgba(15,23,42,0.45)] backdrop-blur-md sm:p-8">
                <p className="text-sm font-black text-foreground">
                  先閱讀，再由醫師評估
                </p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  處方藥物與生長激素的使用條件、劑量、禁忌和追蹤方式都不同。
                  本頁協助你找到相關衛教內容，但不能取代個別診斷與處方。
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-border/60 bg-background/75 p-4">
                    <p className="text-2xl font-black text-primary">3</p>
                    <p className="mt-1 text-xs font-bold text-muted-foreground">
                      體重管理藥物主題
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-background/75 p-4">
                    <p className="text-2xl font-black text-primary">1</p>
                    <p className="mt-1 text-xs font-bold text-muted-foreground">
                      兒童生長專題
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
                選擇想了解的主題
              </h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                每個項目都會前往對應的文章標籤頁，集中顯示同一主題的所有內容。
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {programs.map((program) => (
                <Link
                  key={program.tag}
                  href={`/blog?tag=${encodeURIComponent(program.tag)}`}
                  aria-label={`查看所有${program.title}相關文章`}
                  className={`
                    group relative isolate min-h-[31rem] overflow-hidden
                    rounded-[2rem] border p-7
                    shadow-[0_24px_70px_-50px_rgba(15,23,42,0.45)]
                    transition duration-300 hover:-translate-y-1
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
                    <div className="flex items-start justify-between gap-4">
                      <span className="max-w-[80%] rounded-full border border-primary/15 bg-background/75 px-3.5 py-2 text-xs font-black leading-5 text-primary backdrop-blur">
                        {program.category}
                      </span>
                      <span className="text-sm font-black text-primary">
                        {program.order}
                      </span>
                    </div>

                    <div className="mt-9">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                        {program.englishName}
                      </p>
                      <h3 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
                        {program.title}
                      </h3>
                      <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                        {program.intro}
                      </p>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {program.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-sm leading-7 text-foreground/80"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 rounded-2xl border border-border/60 bg-background/70 p-4 text-xs font-medium leading-6 text-muted-foreground">
                      {program.note}
                    </p>

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
                長效型生長激素與前三項藥物屬於不同主題
              </p>
              <p className="mt-3 text-sm leading-7 text-amber-900/80 dark:text-amber-100/70">
                週纖達、猛健樂與瑞倍適屬於腸泌素或體重管理相關內容；
                長效型生長激素主要對應兒童生長、骨齡、青春期與內分泌評估。
                本頁將它保留為診所重點入口，但不把它描述成一般減重治療。
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="reading-guide-title"
          className="border-y border-border/60 bg-muted/25 py-20 sm:py-24"
        >
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 lg:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">
                Reading guide
              </p>
              <h2
                id="reading-guide-title"
                className="mt-4 text-3xl font-black tracking-[-0.035em] sm:text-5xl"
              >
                閱讀藥物資訊時
                <span className="block text-primary">先掌握四件事</span>
              </h2>
            </div>

            <div className="grid gap-4">
              {readingSteps.map((item) => (
                <article
                  key={item.number}
                  className="rounded-3xl border border-border/70 bg-background/85 p-6 sm:p-8"
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
          aria-labelledby="growth-clinic-title"
          className="py-20 sm:py-24 lg:py-32"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-card/75 lg:grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative isolate min-h-[24rem] overflow-hidden bg-primary/[0.08] p-8 sm:p-10 lg:p-12">
                <div
                  aria-hidden="true"
                  className="absolute -left-20 -top-20 -z-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
                />
                <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">
                  Child Growth Clinic
                </p>
                <h2
                  id="growth-clinic-title"
                  className="mt-5 text-3xl font-black tracking-[-0.035em] sm:text-5xl"
                >
                  什麼情況可以考慮
                  <span className="block text-primary">兒童生長門診？</span>
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
                  兒童成長不只看單次身高，也需要觀察生長速度、身高曲線、
                  骨齡、青春期發育、體重與內分泌功能。
                </p>
              </div>

              <div className="p-8 sm:p-10 lg:p-12">
                <ul className="grid gap-4 sm:grid-cols-2">
                  {[
                    "身高低於同年齡、同性別第 3 百分位",
                    "一年生長速度明顯低於預期",
                    "身高逐漸落後同學或原本的生長曲線",
                    "女孩 8 歲前出現第二性徵",
                    "男孩 9 歲前出現第二性徵",
                    "青春期發育明顯延遲",
                    "持續肥胖、BMI 偏高或合併代謝問題",
                    "希望了解骨齡、生長潛力與預估成年身高",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-2xl border border-border/60 bg-background/70 p-4 text-sm font-bold leading-6"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/child-growth-clinic"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-black text-background transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
                >
                  前往兒童生長門診
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="faq-title"
          className="border-t border-border/60 bg-muted/20 py-20 sm:py-24 lg:py-32"
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
                快速了解四個主題的定位，以及閱讀處方藥物與兒童生長資訊時的基本原則。
              </p>
            </div>

            <div className="mt-12 divide-y divide-border/70 overflow-hidden rounded-[2rem] border border-border/70 bg-card/75">
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

        <section className="px-6 py-20 lg:px-8 lg:py-28">
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
                  本站內容僅供衛教參考
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-muted-foreground lg:text-right">
                藥物效果、副作用與適合劑量因人而異。請勿依網路文章自行購買、
                共用、混合或調整處方藥物，也不要在未經專業評估下使用生長激素。
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
