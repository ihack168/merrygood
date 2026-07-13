import type { Metadata } from "next"
import { Noto_Sans_TC, Geist_Mono } from "next/font/google"
import Script from "next/script"

import { Navbar } from "@/components/navbar"

import "./globals.css"

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

const siteUrl = "https://news.merrygood.com.tw"
const siteName = "美麗好減肥減重－體重管理資訊站"
const shortSiteName = "美麗好減肥減重"

const siteDescription =
  "美麗好減肥減重是由美麗好診所建立的體重管理資訊網站，整理健康減重、飲食控制、運動習慣、減重醫療與處方藥物相關資訊。"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: siteName,

  verification: {
    google: "a-9jNT0C1-qzTClGXVBoLvI3EQYipF18AXpmvBf3qiM",
  },

  title: {
    default: "美麗好減肥減重｜健康減重與體重管理資訊",
    template: `%s｜${shortSiteName}`,
  },

  description: siteDescription,

  keywords: [
    "美麗好減肥減重",
    "健康減重",
    "減肥",
    "減重",
    "體重管理",
    "飲食控制",
    "減重醫療",
    "減重門診",
    "體重控制",
    "猛健樂",
    "週纖達",
    "瑞倍適",
  ],

  authors: [
    {
      name: "美麗好",
      url: `${siteUrl}/about`,
    },
  ],

  creator: "美麗好",
  publisher: siteName,

  category: "健康與體重管理",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  icons: {
    icon: [
      {
        url: "/images/logo.png",
        type: "image/png",
      },
    ],
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
    title: "美麗好減肥減重｜健康減重與體重管理資訊",
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "美麗好減肥減重－體重管理資訊站",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "美麗好減肥減重｜健康減重與體重管理資訊",
    description: siteDescription,
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
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    alternateName: shortSiteName,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#logo`,
      url: `${siteUrl}/images/logo.png`,
      contentUrl: `${siteUrl}/images/logo.png`,
      caption: siteName,
    },
    image: {
      "@id": `${siteUrl}/#logo`,
    },
    description: siteDescription,
    areaServed: {
      "@type": "Country",
      name: "Taiwan",
    },
    knowsAbout: [
      "健康減重",
      "體重管理",
      "飲食控制",
      "運動與體態管理",
      "肥胖管理",
      "減重醫療資訊",
      "減重處方藥物",
      "猛健樂",
      "週纖達",
      "瑞倍適",
    ],
    parentOrganization: {
      "@type": "MedicalClinic",
      "@id": "https://www.merrygood.com.tw/#organization",
      name: "美麗好診所",
      url: "https://www.merrygood.com.tw",
    },
  }

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: siteName,
    alternateName: shortSiteName,
    description: siteDescription,
    inLanguage: "zh-Hant-TW",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <html
      lang="zh-Hant-TW"
      className={`${notoSansTC.variable} ${geistMono.variable}`}
    >
      <body className="bg-background text-foreground font-sans antialiased">
        <Navbar />

        <Script
          id="organization-jsonld"
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
          id="umami-analytics"
          src="https://cloud.umami.is/script.js"
          data-website-id="252dacef-7992-411c-83d8-2ab1a6830843"
          strategy="afterInteractive"
        />

        {children}
      </body>
    </html>
  )
}