import type { Metadata } from "next"
import Image from "next/image"

import { LineConsultButton } from "@/components/line-consult-button"

export const metadata: Metadata = {
  title: "關於美麗好診所｜專業減重、健康管理與醫學美容",
  description:
    "美麗好診所位於台北與新竹，提供專業減重、瘦身、健康管理與醫學美容服務，以專業醫療團隊及重視隱私的貼心服務，陪伴每位追求健康與美麗的人。",
}

const clinicImages = [
  {
    src: "https://merrygood.com.tw/wp-content/uploads/2026/05/578dce82-4f50-4f66-b50b-b77308294ea8.jpg",
    alt: "美麗好診所接待空間",
  },
  {
    src: "https://merrygood.com.tw/wp-content/uploads/2026/05/6e48a94b-3d78-4b2c-a069-b7d733173f79-1.jpg",
    alt: "美麗好診所舒適候診空間",
  },
  {
    src: "https://merrygood.com.tw/wp-content/uploads/2026/05/9f9eef39-93d8-4ad2-8463-a507651d8af4.jpg",
    alt: "美麗好診所諮詢環境",
  },
  {
    src: "https://merrygood.com.tw/wp-content/uploads/2026/05/2266e66d-3b36-45fe-bc61-7e85690bba66-1.jpg",
    alt: "美麗好診所院內空間",
  },
  {
    src: "https://merrygood.com.tw/wp-content/uploads/2026/04/DSCF8765.jpg",
    alt: "美麗好診所明亮室內環境",
  },
  {
    src: "https://merrygood.com.tw/wp-content/uploads/2026/04/DSCF8773.jpg",
    alt: "美麗好診所診療空間",
  },
  {
    src: "https://merrygood.com.tw/wp-content/uploads/2026/04/DSCF8954.jpg",
    alt: "美麗好診所舒適空間",
  },
  {
    src: "https://merrygood.com.tw/wp-content/uploads/2026/04/DSCF8973.jpg",
    alt: "美麗好診所院所環境",
  },
]

const clinicLocations = [
  {
    city: "台北",
    name: "台北院區",
    address: "台北市南京東路一段42號3樓",
    description: "位於台北市中心，交通便利，提供舒適且重視隱私的諮詢與診療空間。",
  },
  {
    city: "新竹",
    name: "新竹院區",
    address: "新竹市北大路40巷30號",
    description: "鄰近新竹市區，以安心、親切的環境陪伴每一段健康管理旅程。",
  },
]

const serviceFeatures = [
  {
    number: "01",
    title: "專業醫療評估",
    description:
      "由專業醫療團隊了解個人需求、生活習慣與身體狀況，規劃適合的健康管理方向。",
  },
  {
    number: "02",
    title: "個人化減重計畫",
    description:
      "不套用單一公式，依據每個人的目標與條件，提供更適合長期執行的減重策略。",
  },
  {
    number: "03",
    title: "重視隱私與感受",
    description:
      "從預約、諮詢到後續追蹤，皆以安心、尊重與隱私為服務核心。",
  },
]

function LocationIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-5.03 7-12a7 7 0 1 0-14 0c0 6.97 7 12 7 12Z"
      />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

function ArrowDownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m6 9 6 6 6-6"
      />
    </svg>
  )
}

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#fbfaf7] text-stone-900">
      {/* Hero */}
      <section className="relative isolate min-h-[760px] overflow-hidden">
        <Image
          src={clinicImages[0].src}
          alt="美麗好診所院所環境"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/55 to-stone-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-stone-950/20" />

        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-6 py-24 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-white/75">
              About Merrygood Clinic
            </p>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              讓健康與美麗，
              <span className="mt-2 block text-emerald-200">
                成為可以安心開始的改變
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              美麗好診所為一間專業瘦身、減重、減肥與醫學美容診所，
              位於台北市區與新竹市區，交通便利。我們以專業的醫療團隊，
              搭配親切且重視隱私的服務，陪伴每個追求健康、自信與美麗的你，
              一步一步達成理想目標。
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#locations"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-stone-900 transition hover:bg-emerald-50"
              >
                查看院區資訊
              </a>

              <a
                href="#environment"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/35 px-7 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10"
              >
                探索院所空間
                <ArrowDownIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-6 hidden text-right text-xs uppercase tracking-[0.24em] text-white/60 sm:block lg:right-12">
          Taipei · Hsinchu
        </div>
      </section>

      {/* Introduction */}
      <section className="relative py-24 sm:py-28 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
              Our Philosophy
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.035em] text-stone-900 sm:text-5xl">
              我們理解，
              <br />
              踏出第一步並不容易
            </h2>
          </div>

          <div className="space-y-7 text-base leading-8 text-stone-600 sm:text-lg sm:leading-9">
            <p>
              站在減重診所的門外，總有人望之卻步。對於效果有疑慮、
              對於安全有疑慮，也對於花費有疑慮。
            </p>

            <p>
              我們懂。因為我們自己也曾是那個對體態樣貌不滿意，
              卻感到束手無策的人；也曾經走到減重門診前，
              卻因為各種考量而遲遲踏不進去。
            </p>

            <p className="font-medium text-stone-900">
              正因為感同身受，我們打造了美麗好。
            </p>

            <p>
              我們希望以親民且透明的收費，提供完善、專業且重視感受的醫療服務，
              幫助每一位想要健康管理的人，能夠放心開始，並在專業團隊的陪伴下，
              找到適合自己的改變方式。
            </p>
          </div>
        </div>
      </section>

      {/* Feature image */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto h-[520px] max-w-[1500px] overflow-hidden rounded-[2rem] sm:h-[680px] lg:h-[780px]">
          <Image
            src={clinicImages[1].src}
            alt={clinicImages[1].alt}
            fill
            sizes="(max-width: 1536px) 100vw, 1500px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 max-w-2xl p-8 sm:p-12 lg:p-16">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-white/70">
              A Place Designed for You
            </p>
            <p className="mt-4 text-3xl font-medium leading-tight tracking-[-0.03em] text-white sm:text-4xl">
              安心、舒適、重視隱私，
              <br />
              是我們設計每一處空間的起點。
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
              Professional Care
            </p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-stone-900 sm:text-5xl">
              從理解需求開始，
              <br />
              提供適合你的專業陪伴
            </h2>
          </div>

          <div className="mt-16 grid border-t border-stone-300 lg:grid-cols-3">
            {serviceFeatures.map((feature) => (
              <article
                key={feature.number}
                className="border-b border-stone-300 py-10 lg:border-b-0 lg:border-r lg:px-10 lg:py-12 first:lg:pl-0 last:lg:border-r-0 last:lg:pr-0"
              >
                <span className="text-sm font-semibold tracking-[0.18em] text-emerald-700">
                  {feature.number}
                </span>
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.025em] text-stone-900">
                  {feature.title}
                </h3>
                <p className="mt-5 leading-8 text-stone-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section
        id="locations"
        className="scroll-mt-24 bg-[#153f35] py-24 text-white sm:py-28 lg:py-36"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">
                Clinic Locations
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl">
                台北與新竹，
                <br />
                陪你就近開始
              </h2>
              <p className="mt-7 max-w-md leading-8 text-white/65">
                兩個院區皆提供專業減重、健康管理與醫學美容諮詢服務，
                歡迎透過 Line 預約，讓專業團隊先了解你的需求。
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {clinicLocations.map((clinic) => (
                <article
                  key={clinic.name}
                  className="flex min-h-[390px] flex-col rounded-[2rem] border border-white/15 bg-white/[0.07] p-8 backdrop-blur-sm sm:p-10"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
                      {clinic.city}
                    </span>
                    <span className="rounded-full border border-white/15 p-3 text-white/75">
                      <LocationIcon />
                    </span>
                  </div>

                  <h3 className="mt-14 text-3xl font-semibold tracking-[-0.03em]">
                    {clinic.name}
                  </h3>

                  <p className="mt-5 text-lg leading-8 text-white/90">
                    {clinic.address}
                  </p>

                  <p className="mt-5 leading-7 text-white/60">
                    {clinic.description}
                  </p>

                  <div className="mt-auto pt-9">
                    <LineConsultButton />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Environment */}
      <section
        id="environment"
        className="scroll-mt-24 py-24 sm:py-28 lg:py-36"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Environment & Facilities
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.035em] text-stone-900 sm:text-5xl">
                院所環境
                <br />
                與空間
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-8 text-stone-600 sm:text-lg sm:leading-9 lg:justify-self-end">
              我們希望你踏進診所的那一刻，不是感到壓力，
              而是感受到安心。明亮、舒適且保有隱私的空間，
              讓每一次諮詢與療程，都能在更放鬆的狀態下進行。
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
            <div className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] sm:min-h-[560px] lg:col-span-7">
              <Image
                src={clinicImages[2].src}
                alt={clinicImages[2].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition duration-700 hover:scale-[1.02]"
              />
            </div>

            <div className="grid gap-5 lg:col-span-5">
              <div className="relative min-h-[270px] overflow-hidden rounded-[1.75rem]">
                <Image
                  src={clinicImages[3].src}
                  alt={clinicImages[3].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition duration-700 hover:scale-[1.02]"
                />
              </div>

              <div className="relative min-h-[270px] overflow-hidden rounded-[1.75rem]">
                <Image
                  src={clinicImages[4].src}
                  alt={clinicImages[4].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition duration-700 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {clinicImages.slice(5).map((image) => (
              <div
                key={image.src}
                className="relative min-h-[320px] overflow-hidden rounded-[1.75rem] sm:min-h-[390px]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
        <div className="relative mx-auto overflow-hidden rounded-[2rem] bg-stone-900 px-6 py-20 text-center text-white sm:px-10 sm:py-24 lg:max-w-[1500px] lg:py-28">
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">
              Start Your Journey
            </p>
            <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              你的改變，
              <br />
              可以從一次安心的諮詢開始
            </h2>
            <p className="mx-auto mt-7 max-w-2xl leading-8 text-white/65">
              無論是減重、健康管理或醫學美容需求，
              美麗好診所的專業團隊都會先傾聽你的想法，
              再一起找到適合你的方向。
            </p>

            <div className="mt-10 flex justify-center">
              <LineConsultButton />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
