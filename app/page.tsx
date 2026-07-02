"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { LatestPostsSection } from "@/components/latest-posts-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "美麗好減肥減重-體重管理資訊站是什麼類型的診所？",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "美麗好減肥減重-體重管理資訊站是以減肥、減重管理與體重控制諮詢為主，協助民眾了解適合自己的減重方式。",
        },
      },
      {
        "@type": "Question",
        name: "減肥診所可以提供哪些服務？",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "減肥診所通常會依照個人身體狀況、體重目標與生活習慣，提供減重評估、飲食建議、追蹤管理與醫療諮詢。",
        },
      },
      {
        "@type": "Question",
        name: "猛健樂、週纖達、瑞倍適可以直接使用嗎？",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "猛健樂、週纖達、瑞倍適屬於減重相關熱門商品，是否適合使用仍需由專業醫師評估，並依個人狀況給予建議。",
        },
      },
      {
        "@type": "Question",
        name: "減肥診所適合哪些人諮詢？",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "適合想減肥、控制體重、改善體態、了解減重商品或需要體重管理建議的人，透過專業評估了解適合自己的減重方向。",
        },
      },
    ],
  }

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground selection:bg-primary/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navbar />

      <main>
        <section className="pt-24 pb-4 md:pt-32 md:pb-6">
          <HeroSection />
        </section>

        <LatestPostsSection />

        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}