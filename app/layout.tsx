import type { Metadata } from "next"
import { Noto_Sans_TC, Geist_Mono } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const siteUrl = "https://blog.merrygood.com.tw"
const siteName = "美麗好診所"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "美麗好診所｜專業減肥診所・減重管理諮詢",
    template: `%s｜${siteName}`,
  },

  description:
    "美麗好診所是專注於減肥、減重管理與體重控制諮詢的減肥診所，提供個人化減重評估、減肥門診諮詢、飲食與生活型態建議，以及猛健樂、週纖達、瑞倍適等熱門減重相關商品諮詢。",

  keywords: [
    "美麗好診所",
    "減肥診所",
    "減重診所",
    "減肥",
    "減重",
    "體重管理",
    "減肥門診",
    "減重管理",
    "體重控制",
    "猛健樂",
    "週纖達",
    "瑞倍適",
  ],

  alternates: {
    canonical: siteUrl,
  },

  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "美麗好診所｜專業減肥診所・減重管理諮詢",
    description:
      "提供減肥門診、減重管理、體重控制諮詢與個人化減重評估，協助了解適合自己的減重方式。",
    url: siteUrl,
    siteName,
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "美麗好診所｜專業減肥診所・減重管理諮詢",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "美麗好診所｜專業減肥診所・減重管理諮詢",
    description:
      "美麗好診所提供減肥、減重管理、體重控制與熱門減重商品諮詢服務。",
    images: ["/images/hero.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    image: `${siteUrl}/images/hero.png`,
    description:
      "美麗好診所是專注於減肥、減重管理與體重控制諮詢的減肥診所，提供個人化減重評估與專業諮詢服務。",
    medicalSpecialty: [
      "Weight Loss",
      "Obesity Medicine",
      "Nutrition",
      "Preventive Medicine",
    ],
    areaServed: {
      "@type": "Country",
      name: "Taiwan",
    },
    availableService: [
      {
        "@type": "MedicalTherapy",
        name: "減肥門診諮詢",
        description:
          "提供體重管理、減肥諮詢、生活型態調整與個人化減重建議。",
      },
      {
        "@type": "MedicalTherapy",
        name: "個人化減重評估",
        description:
          "依照體重狀況、生活習慣、飲食模式與減重目標，規劃適合的減重方向。",
      },
      {
        "@type": "MedicalTherapy",
        name: "體重管理追蹤",
        description:
          "透過定期追蹤與回診評估，協助掌握減重進度並調整減肥策略。",
      },
    ],
  }

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: "zh-Hant-TW",
    description:
      "美麗好診所減肥診所官方網站，提供減肥、減重診所、體重管理與熱門減重商品諮詢相關資訊。",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <html lang="zh-Hant" className={`${notoSansTC.variable} ${geistMono.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <Script
          id="medical-clinic-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        <Script
          id="website-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
<script defer src="https://cloud.umami.is/script.js" data-website-id="252dacef-7992-411c-83d8-2ab1a6830843"></script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());
            gtag("config", "G-XXXXXXXXXX", {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {children}
      </body>
    </html>
  )
}