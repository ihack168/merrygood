"use client"

import Image from "next/image"

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center px-6 text-center">

      <div className="relative group cursor-pointer">

        {/* 柔光背景 */}
        <div className="absolute -inset-10 rounded-full bg-[#d4a373]/10 blur-[80px] transition-all duration-1000 animate-pulse group-hover:bg-[#d4a373]/20"></div>

        <div className="absolute inset-0 rounded-full bg-[#d4a373]/5 blur-[40px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"></div>

        <div className="relative z-10">
          <Image
            src="/images/logo.png"
            alt="美麗好診所 減肥診所"
            width={500}
            height={200}
            className="
              h-auto w-56 md:w-[360px]
              transition-all duration-700
              drop-shadow-[0_0_15px_rgba(212,163,115,0.18)]
              group-hover:scale-105
              group-hover:drop-shadow-[0_0_35px_rgba(212,163,115,0.45)]
            "
            priority
          />
        </div>

        {/* 底部光條 */}
        <div
          className="
            mx-auto mt-4 h-[3px] w-20
            bg-gradient-to-r from-transparent via-[#b07b45] to-transparent
            shadow-[0_0_15px_#b07b45]
            transition-all duration-700
            group-hover:w-40
          "
        />
      </div>

      {/* 主標題 */}
      <div className="mt-8">

        <h1 className="text-3xl font-black tracking-tight text-gray-900 md:text-5xl">
          美麗好診所
        </h1>

        <p className="mt-4 text-lg font-semibold text-[#8b5e34] md:text-2xl">
          專業減肥診所・減重管理諮詢
        </p>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-gray-600 md:text-base">
          美麗好診所專注於減肥、減重與體重管理，
          提供個人化減重諮詢與專業評估，
          協助您打造更健康、更理想的體態。
        </p>

      </div>

      {/* 熱門項目 */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">

        <div
          className="
            rounded-full
            border border-[#d4a373]/30
            bg-[#fff7ef]
            px-5 py-2
            text-sm font-medium
            text-[#6b4423]
            shadow-sm
            backdrop-blur-sm
          "
        >
          猛健樂
        </div>

        <div
          className="
            rounded-full
            border border-[#d4a373]/30
            bg-[#fff7ef]
            px-5 py-2
            text-sm font-medium
            text-[#6b4423]
            shadow-sm
            backdrop-blur-sm
          "
        >
          週纖達
        </div>

        <div
          className="
            rounded-full
            border border-[#d4a373]/30
            bg-[#fff7ef]
            px-5 py-2
            text-sm font-medium
            text-[#6b4423]
            shadow-sm
            backdrop-blur-sm
          "
        >
          瑞倍適
        </div>

      </div>

    </section>
  )
}