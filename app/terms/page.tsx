import type { Metadata } from "next"

const SITE_URL = "https://news.merrygood.com.tw"

export const metadata: Metadata = {
  title: "使用條款",
  description: "閱讀美麗好減肥減重網站的使用條款，了解網站內容使用、智慧財產權、免責聲明與使用者責任。",
  alternates: { canonical: "/terms-of-use" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "使用條款｜美麗好減肥減重",
    description: "閱讀美麗好減肥減重網站的使用條款，了解網站內容使用、智慧財產權、免責聲明與使用者責任。",
    url: `${SITE_URL}/terms-of-use`,
    type: "article",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
    title: "使用條款｜美麗好減肥減重",
    description: "閱讀美麗好減肥減重網站的使用條款，了解網站內容使用、智慧財產權、免責聲明與使用者責任。",
  },
}

const sections = [
  {
    no: "01",
    title: "條款適用",
    body: [
      "歡迎使用美麗好減肥減重網站（以下稱「本站」）。使用本站即表示您同意遵守本使用條款及相關法令。",
      "若您不同意本條款，請停止使用本站。",
    ],
  },
  {
    no: "02",
    title: "網站內容性質",
    body: [
      "本站提供健康減重、體重管理、飲食控制、運動及減重醫療相關資訊。",
      "所有內容僅供一般健康教育與資訊參考，不構成醫療診斷、治療、處方或醫病關係。",
    ],
  },
  {
    no: "03",
    title: "使用者責任",
    body: [
      "使用者應遵守中華民國相關法令，不得利用本站從事違法、侵權、散布惡意程式或影響網站正常運作之行為。",
      "您應自行判斷網站資訊是否符合自身需求。",
    ],
  },
  {
    no: "04",
    title: "醫療免責聲明",
    body: [
      "本站內容不能取代醫師診斷、處方或個別化醫療建議。",
      "如有疾病、慢性病、懷孕、哺乳或正在服藥，請先諮詢合格醫療專業人員。",
    ],
  },
  {
    no: "05",
    title: "智慧財產權",
    body: [
      "本站文章、圖片、設計及其他內容均受智慧財產權保護。",
      "未經授權不得重製、散布、改作或作為商業用途；依法合理引用者，請註明來源。",
    ],
  },
  {
    no: "06",
    title: "第三方服務",
    body: [
      "本站可能連結至 Line、政府機關或其他第三方網站。",
      "第三方網站之內容與隱私政策由其自行負責，本站不負管理責任。",
    ],
  },
  {
    no: "07",
    title: "責任限制",
    body: [
      "本站盡力提供正確資訊，但不保證所有內容完全正確、即時或適用於所有讀者。",
      "因依賴本站資訊所造成之損失，在法律允許範圍內，本站不承擔相關責任。",
    ],
  },
  {
    no: "08",
    title: "條款修改",
    body: [
      "本站得因法令、網站功能或營運需求修改本使用條款。",
      "更新後將公布於本頁並自公告時生效。",
    ],
  },
  {
    no: "09",
    title: "準據法",
    body: [
      "本使用條款以中華民國（臺灣）法律為準據法。",
      "如有爭議，以臺灣有管轄權之法院為第一審管轄法院。",
    ],
  },
]

export default function TermsOfUsePage() {
  const jsonLd = {
    "@context":"https://schema.org",
    "@type":"WebPage",
    "@id":`${SITE_URL}/terms-of-use#webpage`,
    url:`${SITE_URL}/terms-of-use`,
    name:"使用條款",
    inLanguage:"zh-Hant-TW",
    isPartOf:{ "@id":`${SITE_URL}/#website`},
    about:{ "@id":`${SITE_URL}/#organization`}
  }

  return (
    <div className="bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}}
      />

      <section className="border-b border-emerald-100 bg-gradient-to-b from-emerald-50 via-white to-white">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-700">
            Terms of Use
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-5xl">
            使用條款
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-9 text-gray-600">
            本條款說明您使用本站時所適用的規範，包括網站內容使用、
            智慧財產權、免責聲明與雙方權利義務。
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-6 py-14 lg:px-8 lg:py-20">
        {sections.map((section)=>(
          <section key={section.no} className="mb-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 font-black text-emerald-800">
                {section.no}
              </div>

              <div>
                <h2 className="text-2xl font-black">{section.title}</h2>

                {section.body.map((p)=>(
                  <p key={p} className="mt-4 leading-8 text-gray-600">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="mt-10 rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
          <h2 className="text-xl font-black text-amber-950">聯絡我們</h2>

          <p className="mt-3 leading-8 text-amber-900/80">
            若您對本使用條款有任何疑問，歡迎透過本站聯絡方式與我們聯繫。
          </p>
        </section>

        <section className="mt-10 border-t border-gray-200 pt-8">
          <p className="text-sm leading-7 text-gray-500">
            最後更新日期：2026 年 7 月 31 日。
          </p>
        </section>
      </main>
    </div>
  )
}
