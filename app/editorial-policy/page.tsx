import type { Metadata } from "next"

const SITE_URL = "https://news.merrygood.com.tw"

export const metadata: Metadata = {
  title: "編輯政策",
  description:
    "了解美麗好減肥減重的內容製作、資料查證、醫療審核、文章更新與錯誤更正原則。",
  alternates: {
    canonical: "/editorial-policy",
  },
  openGraph: {
    title: "編輯政策｜美麗好減肥減重",
    description:
      "了解美麗好減肥減重的內容製作、資料查證、醫療審核、文章更新與錯誤更正原則。",
    url: `${SITE_URL}/editorial-policy`,
    type: "article",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
    title: "編輯政策｜美麗好減肥減重",
    description:
      "了解美麗好減肥減重的內容製作、資料查證、醫療審核、文章更新與錯誤更正原則。",
  },
}

const policySections = [
  {
    number: "01",
    title: "內容宗旨",
    content: (
      <>
        <p>
          美麗好減肥減重致力於提供健康減重、體重管理、飲食控制、運動習慣、
          肥胖管理與減重醫療相關資訊，協助讀者建立清楚、正確且可理解的健康觀念。
        </p>
        <p>
          本站內容以一般健康教育與知識傳遞為目的，不取代醫師診斷、
          個別化治療、處方或其他專業醫療建議。
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "內容製作原則",
    content: (
      <>
        <p>本站在規劃與撰寫內容時，遵循以下原則：</p>
        <ul>
          <li>以讀者實際需要與常見健康疑問為出發點。</li>
          <li>使用清楚、易懂且不誇大的文字說明。</li>
          <li>區分一般健康資訊、醫療建議與處方藥物資訊。</li>
          <li>避免使用保證療效、快速見效或容易造成誤解的描述。</li>
          <li>不鼓勵讀者自行診斷、購買處方藥物或調整用藥劑量。</li>
        </ul>
      </>
    ),
  },
  {
    number: "03",
    title: "資料來源與查證",
    content: (
      <>
        <p>
          本站內容會盡可能參考具公信力的資料來源，包括政府衛生主管機關、
          醫學會、醫療機構、藥品仿單、學術期刊與經同儕審查的研究資料。
        </p>
        <p>
          涉及藥物、疾病、治療方式或醫療風險的內容，會特別注意適應症、
          禁忌症、副作用、使用限制與資料發布時間，避免將初步研究結果描述為確定結論。
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "醫療內容審核",
    content: (
      <>
        <p>
          涉及疾病、藥物、診療方式、醫療處置或其他可能影響健康決策的文章，
          原則上會由具相關專業背景的人員進行內容確認或審閱。
        </p>
        <p>
          審核重點包括內容是否正確、是否符合目前醫療常識、是否清楚揭露風險，
          以及是否可能造成讀者誤解或不當自行用藥。
        </p>
      </>
    ),
  },
  {
    number: "05",
    title: "文章更新與維護",
    content: (
      <>
        <p>
          醫療與健康資訊可能隨研究、法規、藥品核准狀態及臨床指引而改變。
          本站會依內容重要性、資料變動程度與讀者需求，定期檢視並更新文章。
        </p>
        <p>
          文章如有重大更新，會盡可能在頁面標示更新日期。
          若原有資訊已不再適用，本站可能進行修正、補充、下架或重新編寫。
        </p>
      </>
    ),
  },
  {
    number: "06",
    title: "錯誤更正原則",
    content: (
      <>
        <p>
          若本站發現內容有事實錯誤、資料過時、文字容易誤解或引用不當，
          會在確認後儘速修正。
        </p>
        <p>
          若錯誤可能影響讀者的健康判斷，將優先處理，並視情況補充更正說明。
          讀者若發現內容疑義，也可透過本站聯絡方式提出反映。
        </p>
      </>
    ),
  },
  {
    number: "07",
    title: "獨立性與利益揭露",
    content: (
      <>
        <p>
          本站內容應以資訊正確性與讀者利益為優先，不因商業合作、
          品牌關係或其他利益而改變醫療事實與風險說明。
        </p>
        <p>
          若文章涉及贊助、合作、廣告、產品體驗或其他可能影響內容判斷的關係，
          應在適當位置清楚揭露。
        </p>
      </>
    ),
  },
  {
    number: "08",
    title: "人工智慧與輔助工具",
    content: (
      <>
        <p>
          本站可能使用人工智慧、文字處理或其他數位工具協助資料整理、
          文章架構、文字校對與內容維護。
        </p>
        <p>
          相關工具不取代人工查證與專業審核。涉及醫療、藥物或健康風險的內容，
          發布前仍應經人工確認，不會僅依賴自動產生的結果直接刊登。
        </p>
      </>
    ),
  },
]

export default function EditorialPolicyPage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/editorial-policy#webpage`,
    url: `${SITE_URL}/editorial-policy`,
    name: "編輯政策",
    description:
      "美麗好減肥減重的內容製作、資料查證、醫療審核、文章更新與錯誤更正原則。",
    inLanguage: "zh-Hant-TW",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
  }

  return (
    <div className="bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="border-b border-emerald-100 bg-gradient-to-b from-emerald-50 via-white to-white">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-700">
            Editorial Policy
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-gray-950 sm:text-5xl">
            編輯政策
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-9 text-gray-600">
            我們重視健康資訊的正確性、透明度與可理解性。
            本頁說明美麗好減肥減重在內容規劃、資料查證、醫療審核、
            文章更新與錯誤更正方面所遵循的原則。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800">
              資料查證
            </span>
            <span className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800">
              專業審核
            </span>
            <span className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800">
              定期更新
            </span>
            <span className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800">
              錯誤更正
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-6 py-14 sm:py-18 lg:px-8 lg:py-20">
        <div className="space-y-6">
          {policySections.map((section) => (
            <section
              key={section.number}
              aria-labelledby={`policy-${section.number}`}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-sm font-black text-emerald-800">
                  {section.number}
                </div>

                <div className="min-w-0">
                  <h2
                    id={`policy-${section.number}`}
                    className="text-2xl font-black tracking-tight text-gray-950"
                  >
                    {section.title}
                  </h2>

                  <div className="mt-4 space-y-4 text-base leading-8 text-gray-600 [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                    {section.content}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
          <h2 className="text-xl font-black text-amber-950">
            健康資訊使用提醒
          </h2>

          <p className="mt-3 leading-8 text-amber-900/80">
            本站內容僅供一般健康教育與資訊參考，不能取代醫師診斷、
            個別化治療或處方建議。如有疾病、正在服藥、懷孕、
            哺乳或其他特殊健康狀況，請先諮詢合格醫療專業人員。
          </p>
        </section>

        <section className="mt-10 border-t border-gray-200 pt-8">
          <p className="text-sm leading-7 text-gray-500">
            本政策將依網站營運、法規、醫療資訊標準與內容流程調整。
            最後更新日期：2026 年 7 月 31 日。
          </p>
        </section>
      </main>
    </div>
  )
}
