import type { Metadata } from "next"

const SITE_URL = "https://news.merrygood.com.tw"

export const metadata: Metadata = {
  title: "隱私權政策",
  description:
    "了解美麗好減肥減重如何蒐集、使用、保護與管理網站使用者的個人資料，以及分析工具、外部連結與第三方服務的使用方式。",
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "隱私權政策｜美麗好減肥減重",
    description:
      "了解美麗好減肥減重如何蒐集、使用、保護與管理網站使用者的個人資料，以及分析工具、外部連結與第三方服務的使用方式。",
    url: `${SITE_URL}/privacy-policy`,
    type: "article",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
    title: "隱私權政策｜美麗好減肥減重",
    description:
      "了解美麗好減肥減重如何蒐集、使用、保護與管理網站使用者的個人資料，以及分析工具、外部連結與第三方服務的使用方式。",
  },
}

const policySections = [
  {
    number: "01",
    title: "政策適用範圍",
    content: (
      <>
        <p>
          本隱私權政策適用於美麗好減肥減重網站，以及使用本網站內容、
          功能與相關服務時所涉及的資料蒐集、處理及利用。
        </p>

        <p>
          本政策不適用於經由本網站連結前往的第三方網站、社群平台、
          通訊服務或其他非由本站管理的服務。第三方服務將依其各自的隱私權政策處理資料。
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "可能蒐集的資料",
    content: (
      <>
        <p>依照您使用網站的方式，本站可能蒐集下列資料：</p>

        <ul>
          <li>
            <strong>網站使用資料：</strong>
            包括造訪時間、瀏覽頁面、停留時間、來源頁面、裝置類型、
            瀏覽器類型、作業系統與大致地區等技術資訊。
          </li>
          <li>
            <strong>網路識別資訊：</strong>
            包括 IP 位址、裝置或瀏覽器產生的識別資訊，以及分析工具所使用的必要技術資料。
          </li>
          <li>
            <strong>您主動提供的資料：</strong>
            當您透過 Line、電子郵件、表單或其他方式與我們聯絡時，
            可能提供姓名、聯絡方式、詢問內容及其他您自行選擇提供的資料。
          </li>
        </ul>

        <p>
          除非為完成您主動提出的詢問或服務需求所必要，
          本站不會要求您透過一般網站頁面提供身分證字號、
          金融帳戶、完整病歷或其他高度敏感資料。
        </p>
      </>
    ),
  },
  {
    number: "03",
    title: "資料使用目的",
    content: (
      <>
        <p>本站可能基於下列目的使用所蒐集的資料：</p>

        <ul>
          <li>維持網站正常運作、資訊安全與系統穩定。</li>
          <li>了解網站流量、內容表現與使用者瀏覽情形。</li>
          <li>改善網站內容、版面、功能與使用體驗。</li>
          <li>回覆您主動提出的問題、預約或聯絡需求。</li>
          <li>防止濫用、惡意攻擊、垃圾訊息與其他不當行為。</li>
          <li>履行適用法令、主管機關要求或法律義務。</li>
        </ul>

        <p>
          本站不會將所蒐集的個人資料用於與原始目的無關的用途，
          除非已取得您的同意或法律另有允許。
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "網站分析工具",
    content: (
      <>
        <p>
          本站使用 Umami Analytics 或其他網站分析工具，
          用於了解網站流量、熱門頁面、來源管道與基本使用情形。
        </p>

        <p>
          分析工具可能處理 IP 位址、裝置、瀏覽器、作業系統、
          造訪時間與瀏覽頁面等技術資料。本站使用這些資訊的目的，
          是改善內容與網站效能，而非建立可直接識別特定個人的詳細使用者檔案。
        </p>

        <p>
          實際資料處理方式仍可能依分析工具設定、版本與服務提供者政策而有所不同。
        </p>
      </>
    ),
  },
  {
    number: "05",
    title: "Cookie 與類似技術",
    content: (
      <>
        <p>
          本站或所使用的第三方服務可能透過 Cookie、Local Storage、
          工作階段識別資訊或其他類似技術，維持網站功能、記錄必要設定、
          分析流量或提升使用體驗。
        </p>

        <p>
          您可透過瀏覽器設定限制或刪除 Cookie。
          但停用部分技術後，網站的某些功能或第三方服務可能無法正常運作。
        </p>
      </>
    ),
  },
  {
    number: "06",
    title: "Line 與外部聯絡服務",
    content: (
      <>
        <p>
          當您點擊本站的 Line 預約或諮詢按鈕時，
          您將前往由 Line 或相關第三方提供的服務環境。
        </p>

        <p>
          您在第三方服務中提供的姓名、帳號、聯絡內容、健康問題或其他資料，
          將同時受到該第三方的服務條款與隱私權政策規範。
        </p>

        <p>
          請避免透過一般即時通訊傳送不必要的身分證件、金融資料、
          帳號密碼或其他與諮詢無關的敏感資訊。
        </p>
      </>
    ),
  },
  {
    number: "07",
    title: "外部網站與嵌入內容",
    content: (
      <>
        <p>
          本站文章可能包含外部網站連結、圖片、影片、社群內容、
          地圖或其他第三方資源。當您瀏覽或操作這些內容時，
          第三方可能依其自身政策蒐集相關技術資料。
        </p>

        <p>
          本站無法控制第三方網站的內容、資訊安全或資料處理方式。
          建議您在使用第三方服務前，先閱讀其隱私權政策與服務條款。
        </p>
      </>
    ),
  },
  {
    number: "08",
    title: "資料分享與揭露",
    content: (
      <>
        <p>
          本站不會任意出售、交換或出租您的個人資料。
          但在下列情況下，可能於必要範圍內提供或揭露資料：
        </p>

        <ul>
          <li>為維持網站主機、分析、資訊安全或聯絡服務所必要。</li>
          <li>經您同意或由您主動要求提供。</li>
          <li>依法令、法院、主管機關或合法程序要求。</li>
          <li>為保護本站、使用者或第三人的權利、安全與財產。</li>
          <li>為調查或防止詐欺、濫用、資安事件或其他違法行為。</li>
        </ul>

        <p>
          受託協助處理資料的服務提供者，原則上只能在執行指定服務所必要的範圍內使用資料。
        </p>
      </>
    ),
  },
  {
    number: "09",
    title: "資料保存期間",
    content: (
      <>
        <p>
          本站僅在完成蒐集目的、維持服務、處理爭議、
          符合法令或履行必要義務的期間內保存資料。
        </p>

        <p>
          保存期限可能依資料類型、使用目的、技術需求與法律要求而不同。
          當資料已無繼續保存的必要時，本站將依實際情況刪除、去識別化或停止使用。
        </p>
      </>
    ),
  },
  {
    number: "10",
    title: "資料安全",
    content: (
      <>
        <p>
          本站會採取合理的技術與管理措施，降低資料遭未經授權存取、
          洩漏、竄改、遺失、破壞或不當使用的風險。
        </p>

        <p>
          然而，任何網路傳輸或電子儲存方式都無法保證百分之百安全。
          請勿透過不安全或公開的網路環境傳送不必要的敏感資料。
        </p>
      </>
    ),
  },
  {
    number: "11",
    title: "您的個人資料權利",
    content: (
      <>
        <p>
          在適用法令允許的範圍內，您可就本站持有的個人資料，
          提出查詢、閱覽、製給複製本、補充、更正、停止蒐集、
          停止處理、停止利用或刪除等要求。
        </p>

        <p>
          為保護資料安全，本站在處理相關要求前，
          可能需要確認申請人的身分與請求內容。
          若法令要求保存資料，或有其他合法理由，部分要求可能無法立即執行。
        </p>
      </>
    ),
  },
  {
    number: "12",
    title: "兒童與未成年人",
    content: (
      <>
        <p>
          本站主要提供一般健康與體重管理資訊，
          並非以兒童為主要服務對象，也不會明知而主動蒐集兒童的個人資料。
        </p>

        <p>
          未成年人如需提供個人資料、進行醫療諮詢或預約服務，
          應由法定代理人、監護人或適當成年人陪同及協助。
        </p>
      </>
    ),
  },
  {
    number: "13",
    title: "政策更新",
    content: (
      <>
        <p>
          本站可能因法令、網站功能、第三方服務或資料處理方式變更，
          不定期調整本隱私權政策。
        </p>

        <p>
          更新後的內容將公布於本頁，並標示最後更新日期。
          若有重大變更，本站可能透過網站上的適當方式提供額外說明。
        </p>
      </>
    ),
  },
]

export default function PrivacyPolicyPage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/privacy-policy#webpage`,
    url: `${SITE_URL}/privacy-policy`,
    name: "隱私權政策",
    description:
      "美麗好減肥減重如何蒐集、使用、保護與管理網站使用者資料的說明。",
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
            Privacy Policy
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-gray-950 sm:text-5xl">
            隱私權政策
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-9 text-gray-600">
            我們重視您的隱私與個人資料安全。
            本頁說明美麗好減肥減重在您瀏覽網站、
            使用分析功能或透過外部服務與我們聯絡時，
            可能涉及的資料蒐集、使用與保護方式。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800">
              資料透明
            </span>

            <span className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800">
              最小必要
            </span>

            <span className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800">
              資訊安全
            </span>

            <span className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800">
              使用者權利
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-6 py-14 lg:px-8 lg:py-20">
        <section className="mb-8 rounded-3xl border border-sky-200 bg-sky-50 p-6 sm:p-8">
          <h2 className="text-xl font-black text-sky-950">
            隱私重點摘要
          </h2>

          <p className="mt-3 leading-8 text-sky-900/80">
            本站主要蒐集維持網站運作與分析流量所需的技術資料。
            當您透過 Line 或其他外部服務主動聯絡時，
            您提供的資料也會受到該第三方服務政策的規範。
            請勿傳送與諮詢無關的敏感個人資訊。
          </p>
        </section>

        <div className="space-y-6">
          {policySections.map((section) => (
            <section
              key={section.number}
              aria-labelledby={`privacy-policy-${section.number}`}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-sm font-black text-emerald-800">
                  {section.number}
                </div>

                <div className="min-w-0">
                  <h2
                    id={`privacy-policy-${section.number}`}
                    className="text-2xl font-black tracking-tight text-gray-950"
                  >
                    {section.title}
                  </h2>

                  <div className="mt-4 space-y-4 text-base leading-8 text-gray-600 [&_li]:pl-1 [&_strong]:font-bold [&_strong]:text-gray-800 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                    {section.content}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
          <h2 className="text-xl font-black text-amber-950">
            聯絡與權利申請
          </h2>

          <p className="mt-3 leading-8 text-amber-900/80">
            如您對本政策、個人資料處理方式或資料權利有疑問，
            請透過本站提供的聯絡管道與我們聯繫。
            提出資料查詢、更正或刪除要求時，
            請提供足以確認請求內容與身分的必要資訊。
          </p>
        </section>

        <section className="mt-10 border-t border-gray-200 pt-8">
          <p className="text-sm leading-7 text-gray-500">
            本政策將依網站功能、第三方服務、法規與資料處理方式調整。
            最後更新日期：2026 年 7 月 31 日。
          </p>
        </section>
      </main>
    </div>
  )
}
