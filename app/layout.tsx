import type { Metadata } from 'next'
import { Noto_Sans_TC, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: '美麗好診所｜專業醫美療程、肌膚管理與微整形諮詢',

  description:
    '美麗好診所提供專業醫美療程、肌膚管理、雷射光療、微整形注射與客製化保養建議，打造自然、細緻、安心的美麗體驗。',

  metadataBase: new URL('https://www.example.com'),

  alternates: {
    canonical: 'https://www.example.com',
  },

  icons: {
    icon: '/images/logo.png',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: '美麗好診所｜專業醫美療程與肌膚管理',
    description:
      '提供肌膚管理、雷射光療、微整形注射與客製化醫美諮詢，陪你打造自然細緻的理想狀態。',
    url: 'https://www.example.com',
    siteName: '美麗好診所',
    locale: 'zh_TW',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: '美麗好診所｜專業醫美療程與肌膚管理',
    description:
      '肌膚管理、雷射光療、微整形注射與客製化醫美諮詢服務。',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-Hant" className={`${notoSansTC.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {children}
      </body>
    </html>
  )
}