"use client"

import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pt-8 md:px-10">

      {/* 背景柔光 */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#d4a373]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Hero 大圖 */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#d4a373]/15 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)]">

          {/* 圖片 */}
          <div className="relative">

            <Image
              src="/images/hero.png"
              alt="美麗好診所 減肥診所"
              width={1600}
              height={900}
              priority
              className="
                h-auto w-full object-cover
              "
            />

            {/* 漸層遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />

            {/* 左下文字 */}
            <div className="absolute bottom-0 left-0 z-10 p-6 md:p-12">

              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium tracking-[0.2em] text-white backdrop-blur-md">
                WEIGHT LOSS CLINIC
              </div>

              <h1 className="mt-5 text-3xl font-black leading-tight text-white md:text-6xl">
                美麗好診所
              </h1>

              <p className="mt-4 text-lg font-semibold text-[#ffe0ba] md:text-2xl">
                專業減肥診所・減重管理諮詢
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/90 md:text-base">
                美麗好診所專注於減肥、減重與體重管理，
                提供個人化減重評估與專業諮詢，
                協助打造更健康、更理想的體態。
              </p>

              {/* 熱門項目 */}
              <div className="mt-7 flex flex-wrap gap-3">

                <div className="rounded-full bg-white/15 px-5 py-2 text-sm font-medium text-white backdrop-blur-md">
                  猛健樂
                </div>

                <div className="rounded-full bg-white/15 px-5 py-2 text-sm font-medium text-white backdrop-blur-md">
                  週纖達
                </div>

                <div className="rounded-full bg-white/15 px-5 py-2 text-sm font-medium text-white backdrop-blur-md">
                  瑞倍適
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}