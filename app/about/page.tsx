import type { Metadata } from "next"
import Image from "next/image"

import { LineConsultButton } from "@/components/line-consult-button"

export const metadata: Metadata = {
  title: "關於美麗好診所｜專業減重與醫學美容",
  description:
    "美麗好診所提供專業瘦身、減重、健康管理與醫學美容服務，於台北與新竹設有院區。",
}

const clinicImages = [
  {
    src: "https://merrygood.com.tw/wp-content/uploads/2026/05/578dce82-4f50-4f66-b50b-b77308294ea8.jpg",
    alt: "美麗好診所院所環境",
  },
  {
    src: "https://merrygood.com.tw/wp-content/uploads/2026/05/6e48a94b-3d78-4b2c-a069-b7d733173f79-1.jpg",
    alt: "美麗好診所候診空間",
  },
  {
    src: "https://merrygood.com.tw/wp-content/uploads/2026/05/9f9eef39-93d8-4ad2-8463-a507651d8af4.jpg",
    alt: "美麗好診所諮詢空間",
  },
  {
    src: "https://merrygood.com.tw/wp-content/uploads/2026/05/2266e66d-3b36-45fe-bc61-7e85690bba66-1.jpg",
    alt: "美麗好診所室內空間",
  },
  {
    src: "https://merrygood.com.tw/wp-content/uploads/2026/04/DSCF8765.jpg",
    alt: "美麗好診所明亮環境",
  },
  {
    src: "https://merrygood.com.tw/wp-content/uploads/2026/04/DSCF8773.jpg",
    alt: "美麗好診所診療空間",
  },
  {
    src: "https://merrygood.com.tw/wp-content/uploads/2026/04/DSCF8954.jpg",
    alt: "美麗好診所舒適環境",
  },
  {
    src: "https://merrygood.com.tw/wp-content/uploads/2026/04/DSCF8973.jpg",
    alt: "美麗好診所院內環境",
  },
]

const clinics = [
  {
    name: "台北院區",
    address: "台北市南京東路一段42號3樓",
  },
  {
    name: "新竹院區",
    address: "新竹市北大路40巷30號",
  },
]

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* 緊湊 Hero */}
      <section className="relative isolate h-[440px] overflow-hidden sm:h-[500px] lg:h-[540px]">
        <Image
          src={clinicImages[0].src}
          alt={clinicImages[0].alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/48 to-black/18" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300 sm:text-sm">
              About Merrygood Clinic
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
              關於美麗好診所
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 drop-shadow sm:text-lg sm:leading-8">
              美麗好診所為一間專業瘦身、減重、減肥與醫學美容的診所，
              位於台北市區與新竹市區，交通便利。
            </p>

            <p className="mt-2 max-w-2xl text-base leading-7 text-white/85 drop-shadow sm:text-lg sm:leading-8">
              我們以專業醫療團隊，搭配親切且重視隱私的服務，
              陪伴每個追求健康與美麗的你，逐步達成理想目標。
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold text-white backdrop-blur-md sm:text-sm">
                專業醫療團隊
              </span>

              <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold text-white backdrop-blur-md sm:text-sm">
                重視個人隱私
              </span>

              <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold text-white backdrop-blur-md sm:text-sm">
                台北・新竹院區
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 院區資訊 */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:py-12 lg:px-8 lg:py-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Clinic Locations
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                院區資訊
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-gray-600 sm:text-right">
              台北與新竹皆設有院區，歡迎透過 Line 預約諮詢。
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {clinics.map((clinic) => (
              <article
                key={clinic.name}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {clinic.name}
                </h3>

                <p className="mt-2 text-sm leading-7 text-gray-600 sm:text-base">
                  {clinic.address}
                </p>

                <div className="mt-4">
                  <LineConsultButton
                    className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#06C755] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(6,199,85,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#05b94f] hover:shadow-[0_12px_26px_rgba(6,199,85,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06C755] focus-visible:ring-offset-2"
                  >
                    Line 預約諮詢
                  </LineConsultButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 院所理念 */}
      <section className="mx-auto max-w-5xl px-6 py-10 sm:py-12 lg:px-8 lg:py-14">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Environment & Facilities
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            院所環境與空間
          </h2>
        </div>

        <div className="mx-auto mt-5 max-w-3xl space-y-3 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
          <p>
            站在減重診所的門外，總有人望之卻步。對於效果、安全與花費，
            都可能有所疑慮。
          </p>

          <p>
            我們懂，因為我們也曾是那個對體態樣貌不滿意，
            卻感到束手無策的人；也曾走到減重門診前，
            卻因為各種考量而遲遲踏不進去。
          </p>

          <p>
            因為感同身受，所以打造了美麗好。我們希望以親民且透明的收費，
            提供完善且專業的服務，幫助每一位想要健康管理的人，
            都能放心踏出改變的第一步。
          </p>
        </div>
      </section>

      {/* 院所圖片 */}
      <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-8 lg:pb-12">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {clinicImages.map((image, index) => (
            <div
              key={image.src}
              className={`relative overflow-hidden rounded-xl ${
                index === 0 || index === 5
                  ? "aspect-[4/3] sm:col-span-2"
                  : "aspect-square"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
