"use client"

import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-5 pt-8 md:px-10">
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#d4a373]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-[2rem] border border-[#d4a373]/15 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)] md:grid-cols-2 md:rounded-[2.5rem]">

          {/* 文字區 */}
          <div className="order-2 flex flex-col justify-center px-6 py-10 text-center md:order-1 md:px-12 md:py-16 md:text-left">
            <div className="mx-auto inline-flex w-fit rounded-full border border-[#d4a373]/30 bg-[#fff7ef] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[#8b5e34] md:mx-0">
              WEIGHT LOSS CLINIC
            </div>

            <h1 className="mt-5 text-3xl font-black leading-tight text-gray-900 md:text-6xl">
              美麗好診所
            </h1>

            <p className="mt-4 text-lg font-semibold text-[#8b5e34] md:text-2xl">
              專業減肥診所・減重管理諮詢
            </p>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-gray-600 md:mx-0 md:text-base">
              美麗好診所專注於減肥、減重與體重管理，
              提供個人化減重評估與專業諮詢，
              協助打造更健康、更理想的體態。
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
              {["猛健樂", "週纖達", "瑞倍適"].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-[#d4a373]/30 bg-[#fff7ef] px-5 py-2 text-sm font-medium text-[#6b4423]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* 圖片區 */}
          <div className="order-1 bg-[#fff7ef] p-4 md:order-2 md:p-8">
            <div className="relative aspect-square overflow-hidden rounded-[1.6rem] md:rounded-[2rem]">
              <Image
                src="/images/hero.png"
                alt="美麗好診所 減肥診所"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}