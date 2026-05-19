"use client";

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {

  // 醫美診所 SEO / AEO Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "美麗好診所",
    "url": "https://www.example.com",
    "description":
      "提供專業醫美療程、肌膚管理、雷射光療、微整形與客製化醫學美容諮詢服務。",

    "medicalSpecialty": [
      "Aesthetic Medicine",
      "Dermatology"
    ],

    "areaServed": "TW",

    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalProcedure",
          "name": "雷射光療",
          "description":
            "提供皮秒雷射、除斑、美白、毛孔與肌膚改善療程。"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalProcedure",
          "name": "微整形注射",
          "description":
            "提供玻尿酸、肉毒桿菌與輪廓微調等醫美注射療程。"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalProcedure",
          "name": "肌膚管理",
          "description":
            "提供客製化膚況分析、保濕修護與日常肌膚保養規劃。"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalProcedure",
          "name": "醫學美容諮詢",
          "description":
            "由專業醫師提供個人化醫美評估與療程建議。"
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

      <Navbar />

      <main>

        {/* Hero */}
        <div className="pt-24 md:pt-36 pb-10">
          <HeroSection />
        </div>

        {/* 服務區塊 */}
        <ServicesSection />

        {/* AEO / SEO 隱藏語意內容 */}
        <section className="sr-only">

          <h2>
            專業醫美診所與客製化肌膚管理服務
          </h2>

          <p>
            美麗好診所提供專業醫學美容療程，
            包含雷射光療、皮秒雷射、微整形注射、
            玻尿酸、肉毒桿菌與肌膚管理服務。
          </p>

          <p>
            我們重視自然美感與安全醫療流程，
            由專業醫師與諮詢團隊提供客製化評估，
            協助改善膚況、輪廓線條與整體氣色。
          </p>

          <p>
            診所環境採用舒適明亮設計，
            提供安心、隱私且高品質的醫學美容體驗。
          </p>

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