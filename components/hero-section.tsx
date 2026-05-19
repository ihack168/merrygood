"use client"

import Image from "next/image"

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6">

      <div className="relative group cursor-pointer">

        {/* 金色柔光背景 */}
        <div className="absolute -inset-10 bg-[#d4a373]/10 rounded-full blur-[80px] group-hover:bg-[#d4a373]/20 transition-all duration-1000 animate-pulse"></div>

        <div className="absolute inset-0 bg-[#d4a373]/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <div className="relative z-10">
          <Image
            src="/images/logo.png"
            alt="美麗好診所 減肥診所"
            width={500}
            height={200}
            className="
              w-56 md:w-[360px] h-auto transition-all duration-700
              drop-shadow-[0_0_15px_rgba(212,163,115,0.2)]
              group-hover:drop-shadow-[0_0_35px_rgba(212,163,115,0.5)]
              group-hover:scale-105
            "
            priority
          />
        </div>

        {/* 底部光條 */}
        <div className="mt-4 mx-auto w-20 h-[3px]
          bg-gradient-to-r from-transparent via-[#d4a373] to-transparent
          shadow-[0_0_15px_#d4a373]
          transition-all duration-700 group-hover:w-40">
        </div>

      </div>

      {/* 主標題 */}
      <div className="mt-8">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
          美麗好診所
        </h1>

        <p className="mt-4 text-lg md:text-2xl font-semibold text-[#d4a373]">
          專業減肥診所・減重管理諮詢
        </p>

        <p className="mt-5 max-w-2xl text-sm md:text-base leading-8 text-gray-300">
          美麗好診所專注於減肥、減重與體重管理，
          提供個人化減重諮詢與專業評估，
          協助您打造更健康、更理想的體態。
        </p>
      </div>

      {/* 熱門項目 */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">

        <div className="rounded-full border border-[#d4a373]/30 bg-[#d4a373]/10 px-5 py-2 text-sm text-[#f5d7b2] backdrop-blur-sm">
          猛健樂
        </div>

        <div className="rounded-full border border-[#d4a373]/30 bg-[#d4a373]/10 px-5 py-2 text-sm text-[#f5d7b2] backdrop-blur-sm">
          週纖達
        </div>

        <div className="rounded-full border border-[#d4a373]/30 bg-[#d4a373]/10 px-5 py-2 text-sm text-[#f5d7b2] backdrop-blur-sm">
          瑞倍適
        </div>

      </div>

    </section>
  )
}