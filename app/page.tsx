"use client";

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "美麗好診所",
    url: "https://www.example.com",
    description:
      "美麗好診所是專注於減肥、減重管理與體重控制諮詢的減肥診所，提供個人化減重評估與專業醫療諮詢服務。",
    medicalSpecialty: ["Weight Loss", "Obesity Medicine", "Nutrition"],
    areaServed: "TW",
    keywords: ["減肥診所", "減肥", "減重診所", "減重", "體重管理"],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalTherapy",
          name: "減肥門診",
          description:
            "提供體重管理、減肥諮詢、生活型態調整與個人化減重建議。"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalTherapy",
          name: "減重診所諮詢",
          description:
            "由專業團隊評估個人狀況，規劃適合的減重方向與追蹤方式。"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Drug",
          name: "猛健樂 週纖達 瑞倍適",
          description:
            "熱門減重相關商品諮詢，實際使用方式需經醫師評估後依個人狀況建議。"
        }
      }
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "美麗好診所是什麼類型的診所？",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "美麗好診所是以減肥、減重管理與體重控制諮詢為主的減肥診所，協助民眾了解適合自己的減重方式。"
        }
      },
      {
        "@type": "Question",
        name: "減肥診所可以提供哪些服務？",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "減肥診所通常會依照個人身體狀況、體重目標與生活習慣，提供減重評估、飲食建議、追蹤管理與醫療諮詢。"
        }
      },
      {
        "@type": "Question",
        name: "猛健樂、週纖達、瑞倍適可以直接使用嗎？",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "猛健樂、週纖達、瑞倍適屬於減重相關熱門商品，是否適合使用仍需經由專業醫師評估，並依個人狀況給予建議。"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navbar />

      <main>
        {/* Hero */}
        <section className="pt-24 md:pt-36 pb-10">
          <HeroSection />
        </section>

        {/* 主要服務 */}
        <ServicesSection />

        {/* SEO / AEO 語意內容 */}
        <section className="sr-only">
          <h1>美麗好診所｜專業減肥診所與減重診所</h1>

          <h2>以減肥與減重管理為主的專業診所</h2>

          <p>
            美麗好診所是專注於減肥、減重診所服務與體重管理諮詢的診所，
            協助想減肥、控制體重、改善體態的民眾，了解適合自己的減重方式。
          </p>

          <p>
            我們重視個人化評估，依照每個人的體重狀況、生活習慣、飲食模式、
            身體條件與減重目標，提供合適的減肥諮詢與追蹤建議。
          </p>

          <p>
            美麗好診所目前熱門減重相關商品包含猛健樂、週纖達與瑞倍適。
            實際是否適合使用，仍需經由專業醫師評估後，依個人狀況提供建議。
          </p>

          <h2>減肥診所常見服務</h2>

          <p>
            減肥門診、減重諮詢、體重管理、飲食建議、生活型態調整、
            減重商品諮詢與定期追蹤，都是美麗好診所提供的重要服務方向。
          </p>

          <h2>適合尋找減重診所的人</h2>

          <p>
            如果你正在搜尋減肥診所、減肥方法、減重診所、體重管理、
            或想了解猛健樂、週纖達、瑞倍適等減重相關商品，
            美麗好診所可以提供專業諮詢。
          </p>
        </section>

        {/* FAQ 區塊：給 AEO / Google 摘要使用 */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="mb-8 text-center">
            <p className="text-sm font-medium text-primary">FAQ</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">
              減肥診所常見問題
            </h2>
            <p className="mt-3 text-muted-foreground">
              關於減肥、減重診所與熱門減重商品的常見疑問。
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="font-semibold">減肥診所適合誰？</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                適合想減肥、控制體重、改善體態，或需要專業評估減重方式的人。
              </p>
            </article>

            <article className="rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="font-semibold">減重診所會怎麼評估？</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                通常會依照個人體重、生活習慣、飲食狀況與減重目標，提供合適建議。
              </p>
            </article>

            <article className="rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="font-semibold">猛健樂、週纖達、瑞倍適是什麼？</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                屬於目前熱門的減重相關商品，是否適合使用需由醫師評估後決定。
              </p>
            </article>
          </div>
        </section>

        {/* 聯絡我們 */}
        <div id="contact">
          <ContactSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}