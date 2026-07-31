import type { Metadata } from "next"

const SITE_URL = "https://news.merrygood.com.tw"

export const metadata: Metadata = {
  title: "醫療內容政策",
  description:
    "了解美麗好減肥減重在醫療與健康內容的製作、專業審核、風險揭露、處方藥物資訊與讀者安全方面所遵循的原則。",
  alternates: {
    canonical: "/medical-content-policy",
  },
  openGraph: {
    title: "醫療內容政策｜美麗好減肥減重",
    description:
      "了解美麗好減肥減重在醫療與健康內容的製作、專業審核、風險揭露、處方藥物資訊與讀者安全方面所遵循的原則。",
    url: `${SITE_URL}/medical-content-policy`,
    type: "article",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
    title: "醫療內容政策｜美麗好減肥減重",
    description:
      "了解美麗好減肥減重在醫療與健康內容的製作、專業審核、風險揭露、處方藥物資訊與讀者安全方面所遵循的原則。",
  },
}

const policySections = [
  {
    number: "01",
    title: "政策目的",
    content: (
      <>
        <p>
          美麗好減肥減重提供健康減重、體重管理、飲食控制、運動習慣、
          肥胖管理、減重門診與處方藥物相關資訊。
        </p>

        <p>
          本政策用於說明本站如何處理可能影響讀者健康判斷的內容，
          並建立醫療資訊製作、審核、更新與風險揭露的基本原則。
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "資訊用途與限制",
    content: (
      <>
        <p>
          本站內容僅供一般健康教育與資訊參考，不構成醫療診斷、
          個別化治療建議、處方、用藥指示或醫病關係。
        </p>

        <p>
          每個人的身體狀況、病史、用藥、過敏史與治療需求不同，
          讀者不應僅依據本站內容自行診斷、停止治療、調整藥物或延誤就醫。
        </p>
      </>
    ),
  },
  {
    number: "03",
    title: "醫療內容製作原則",
    content: (
      <>
        <p>本站製作醫療與健康內容時，遵循以下原則：</p>

        <ul>
          <li>以正確、清楚、平衡且可理解的方式呈現資訊。</li>
          <li>避免使用保證療效、快速見效、零風險或絕對安全等表述。</li>
          <li>不以恐懼、羞辱或身材焦慮誘導讀者接受特定療程。</li>
          <li>清楚區分一般健康建議、醫療處置與處方藥物資訊。</li>
          <li>同時說明可能的效益、限制、風險與不確定性。</li>
        </ul>
      </>
    ),
  },
  {
    number: "04",
    title: "專業審核與確認",
    content: (
      <>
        <p>
          涉及疾病、藥物、診療方式、醫療處置、副作用、禁忌症或其他可能影響健康決策的內容，
          原則上會由具相關專業背景的人員進行確認或審閱。
        </p>

        <p>
          審核重點包括資訊正確性、適用範圍、風險揭露、文字是否容易造成誤解，
          以及內容是否可能鼓勵讀者自行用藥或延誤就醫。
        </p>
      </>
    ),
  },
  {
    number: "05",
    title: "處方藥物資訊",
    content: (
      <>
        <p>
          本站若介紹猛健樂、週纖達、瑞倍適或其他處方藥物，
          目的在於提供一般性資訊，不代表本站推薦所有讀者使用。
        </p>

        <p>
          是否適合使用處方藥物，必須由醫師依個人健康狀況、病史、
          目前用藥、過敏史、懷孕或哺乳狀態等條件進行評估。
        </p>

        <p>
          讀者不應自行購買、轉讓、共用、調整劑量、混合使用或停止處方藥物。
          任何用藥問題都應諮詢醫師或藥師。
        </p>
      </>
    ),
  },
  {
    number: "06",
    title: "效益、風險與副作用揭露",
    content: (
      <>
        <p>
          介紹治療方式、藥物、飲食策略或其他健康管理方法時，
          本站會盡可能同時說明可能效益、常見限制、風險、副作用與不適用情況。
        </p>

        <p>
          個別案例、使用心得或研究結果不代表所有人都會獲得相同結果。
          本站不會將單一案例、初步研究或尚未確定的證據描述為普遍有效的結論。
        </p>
      </>
    ),
  },
  {
    number: "07",
    title: "緊急狀況與就醫提醒",
    content: (
      <>
        <p>
          本站不提供緊急醫療服務。若讀者出現呼吸困難、胸痛、意識改變、
          嚴重過敏反應、持續大量出血或其他可能危及生命的症狀，
          應立即聯絡當地緊急醫療服務或前往急診。
        </p>

        <p>
          若症狀持續、惡化或影響日常生活，亦應儘速尋求合格醫療專業人員的評估，
          不應只依賴網路資訊自行處理。
        </p>
      </>
    ),
  },
  {
    number: "08",
    title: "資料來源與證據品質",
    content: (
      <>
        <p>
          本站會盡可能參考政府衛生主管機關、醫學會、醫療機構、
          藥品仿單、臨床指引、學術期刊與經同儕審查的研究資料。
        </p>

        <p>
          若不同研究或專業指引存在差異，本站會盡可能說明證據限制與不同觀點，
          不會刻意省略重要的不確定性。
        </p>
      </>
    ),
  },
  {
    number: "09",
    title: "文章更新與時效性",
    content: (
      <>
        <p>
          醫療資訊可能因研究進展、法規、藥品核准狀態、仿單內容或臨床指引而改變。
          本站會依內容的重要性與變動程度進行檢視與更新。
        </p>

        <p>
          若原有資訊已不再適用，本站可能進行修正、補充、重新編寫或下架。
          文章頁面如有更新，會盡可能標示發布日期與最後更新日期。
        </p>
      </>
    ),
  },
  {
    number: "10",
    title: "商業合作與利益揭露",
    content: (
      <>
        <p>
          醫療內容應以事實正確性、讀者安全與公共利益為優先，
          不因廣告、贊助、品牌合作或其他商業關係而隱藏重要風險或改變醫療事實。
        </p>

        <p>
          若內容涉及贊助、合作、廣告、產品體驗或其他可能影響判斷的關係，
          應在適當位置清楚揭露。
        </p>
      </>
    ),
  },
  {
    number: "11",
    title: "人工智慧與數位工具",
    content: (
      <>
        <p>
          本站可能使用人工智慧或其他數位工具協助資料整理、文章架構、
          文字校對與內容維護。
        </p>

        <p>
          人工智慧不取代專業判斷與人工查證。涉及醫療、藥物、
          診療方式或健康風險的內容，發布前仍應由人工確認，
          不會僅依賴自動產生的結果直接刊登。
        </p>
      </>
    ),
  },
  {
    number: "12",
    title: "讀者回饋與內容更正",
    content: (
      <>
        <p>
          若讀者發現醫療內容可能有錯誤、資料過時、引用不當或容易造成誤解，
          可透過本站提供的聯絡方式提出反映。
        </p>

        <p>
          本站會依問題的重要性進行查核。若錯誤可能影響健康判斷，
          將優先處理，並視情況修正、補充說明或移除相關內容。
        </p>
      </>
    ),
  },
]

export default function MedicalContentPolicyPage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/medical-content-policy#webpage`,
    url: `${SITE_URL}/medical-content-policy`,
    name: "醫療內容政策",
    description:
      "美麗好減肥減重在醫療與健康內容的製作、專業審核、風險揭露、處方藥物資訊與讀者安全方面所遵循的原則。",
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
            Medical Content Policy
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-gray-950 sm:text-5xl">
            醫療內容政策
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-9 text-gray-600">
            我們重視醫療與健康資訊的正確性、平衡性與讀者安全。
            本頁說明美麗好減肥減重在醫療內容製作、專業審核、
            處方藥物資訊、風險揭露與內容更新方面所遵循的原則。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800">
              讀者安全
            </span>

            <span className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800">
              專業審核
            </span>

            <span className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800">
              風險揭露
            </span>

            <span className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800">
              用藥安全
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-6 py-14 lg:px-8 lg:py-20">
        <section className="mb-8 rounded-3xl border border-red-200 bg-red-50 p-6 sm:p-8">
          <h2 className="text-xl font-black text-red-950">
            重要醫療聲明
          </h2>

          <p className="mt-3 leading-8 text-red-900/80">
            本站內容不能取代醫師診斷、處方或個別化醫療建議。
            請勿僅依據本站內容自行診斷、購買處方藥物、調整劑量、
            停止治療或延誤就醫。
          </p>
        </section>

        <div className="space-y-6">
          {policySections.map((section) => (
            <section
              key={section.number}
              aria-labelledby={`medical-policy-${section.number}`}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-sm font-black text-emerald-800">
                  {section.number}
                </div>

                <div className="min-w-0">
                  <h2
                    id={`medical-policy-${section.number}`}
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
            特殊健康狀況提醒
          </h2>

          <p className="mt-3 leading-8 text-amber-900/80">
            若您有慢性疾病、正在服藥、曾有藥物過敏、懷孕、備孕、
            哺乳或其他特殊健康狀況，在採取任何減重方式、
            使用藥物或調整飲食前，請先諮詢合格醫療專業人員。
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
