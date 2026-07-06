import type { Metadata } from "next"

const siteUrl = "https://news.merrygood.com.tw"
const siteName = "美麗好減肥減重-體重管理資訊站"

export const metadata: Metadata = {
  title: "最新文章",
  description:
    "減重管理、體重控制、減肥門診與熱門減重商品相關文章整理。",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `最新文章｜${siteName}`,
    description:
      "減重管理、體重控制、減肥門診與熱門減重商品相關文章整理。",
    url: `${siteUrl}/blog`,
    siteName,
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "美麗好減肥減重-體重管理資訊站最新文章",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `最新文章｜${siteName}`,
    description:
      "減重管理、體重控制、減肥門診與熱門減重商品相關文章整理。",
    images: ["/images/hero.png"],
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}