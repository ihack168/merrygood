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
      {/* 頁首介紹 */}
      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
              About Merrygood Clinic
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              關於美麗好診所
            </h1>

            <p className="mt-6 text-lg leading-9 text-gray-600">
              美麗好診所為一間專業瘦身、減重、減肥與醫學美容的診所，
              位於台北市區與新竹市區，交通便利。
            </p>

            <p className="mt-4 text-lg leading-9 text-gray-600">
              我們以專業的醫療團隊，搭配親切且重視隱私的服務，
              陪伴每個追求瘦身、健康與美麗的你，逐步達成理想目標。
            </p>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src={clinicImages[0].src}
              alt={clinicImages[0].alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 院區資訊 */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Clinic Locations
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              院區資訊
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              台北與新竹皆設有院區，歡迎透過 Line 預約諮詢。
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {clinics.map((clinic) => (
              <article
                key={clinic.name}
                className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900">
                  {clinic.name}
                </h3>

                <p className="mt-4 text-base leading-7 text-gray-600">
                  {clinic.address}
                </p>

                <div className="mt-7">
                  <LineConsultButton />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 院所理念 */}
      <section className="mx-auto max-w-5xl px-6 py-14 sm:py-20 lg:px-8 lg:py-24">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Environment & Facilities
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            院所環境與空間
          </h2>
        </div>

        <div className="mx-auto mt-8 max-w-3xl space-y-5 text-base leading-8 text-gray-600 sm:text-lg sm:leading-9">
          <p>
            站在減重診所的門外，總有人望之卻步。對於效果有疑慮，
            對於安全有疑慮，也對於花費有疑慮。
          </p>

          <p>
            我們懂，因為我們自己也曾是那個對體態樣貌不滿意，
            卻感到束手無策的人；也曾經走到減重門診前，
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
      <section className="mx-auto max-w-7xl px-6 pb-14 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {clinicImages.map((image, index) => (
            <div
              key={image.src}
              className={`relative overflow-hidden rounded-2xl ${
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
