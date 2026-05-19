"use client"

import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-5 pt-8 md:px-10">

      {/* 背景柔光 */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#d4a373]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        <div className="overflow-hidden rounded-[2rem] border border-[#d4a373]/15 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)] md:rounded-[2.5rem]">

          {/* 圖片區 */}
          <div className="relative h-[360px] bg-[#fff7ef] md:h-[720px]">

            <Image
              src="/images/hero.png"
              alt="美麗好診所 減肥診所"
              fill
              priority
              sizes="100vw"
              className="
                object-cover object-center
                md:object-contain
              "
            />

            {/* 電腦版遮罩 */}
            <div className="absolute inset-0 hidden bg-gradient-to-r from-black/25 via-black/5 to-transparent md:block" />

            {/* 電腦版文字 */}
            <div className="absolute bottom-0 left-0 z-10 hidden max-w-3xl p-12 md:block">

              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium tracking-[0.2em] text-white backdrop-blur-md">
                WEIGHT LOSS CLINIC
              </div>

              <h1 className="mt-5 text-6xl font-black leading-tight text-white">
                美麗好診所
              </h1>

              <p className="mt-4 text-2xl font-semibold text-[#ffe0ba]">
                專業減肥診所・減重管理諮詢
              </p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/90">
                美麗好診所專注於減肥、減重與體重管理，
                提供個人化減重評估與專業諮詢，
                協助打造更健康、更理想的體態。
              </p>

              {/* 熱門項目 */}
              <div className="mt-7 flex flex-wrap gap-3">
                {["猛健樂", "週纖達", "瑞倍適"].map((item) => (
                  <div
                    key={item}
                    className="rounded-full bg-white/15 px-5 py-2 text-sm font-medium text-white backdrop-blur-md"
                  >
                    {item}
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* 手機版文字卡片 */}
          <div className="bg-white px-6 py-8 text-center md:hidden">

            <div className="mx-auto inline-flex rounded-full border border-[#d4a373]/30 bg-[#fff7ef] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[#8b5e34]">
              WEIGHT LOSS CLINIC
            </div>

            <h1 className="mt-5 text-3xl font-black leading-tight text-gray-900">
              美麗好診所
            </h1>

            <p className="mt-3 text-lg font-semibold text-[#8b5e34]">
              專業減肥診所
            </p>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-600">
              提供減肥、減重與體重管理諮詢，
              依個人狀況規劃適合的減重方向。
            </p>

            {/* 手機熱門項目 */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">

              {["猛健樂", "週纖達", "瑞倍適"].map((item) => (
                <div
                  key={item}
                  className="
                    rounded-full
                    border border-[#d4a373]/30
                    bg-[#fff7ef]
                    px-4 py-2
                    text-sm font-medium
                    text-[#6b4423]
                  "
                >
                  {item}
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}