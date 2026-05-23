"use client"

import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-5 pt-8 md:px-10">
      {/* 背景光暈 */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-[2.5rem] border border-white/40 bg-card/80 shadow-[0_25px_90px_rgba(129,216,208,0.18)] backdrop-blur-xl md:grid-cols-2">
          
          {/* 左側文字 */}
          <div className="order-2 flex flex-col justify-center px-6 py-10 text-center md:order-1 md:px-12 md:py-16 md:text-left">
            <div className="mx-auto inline-flex w-fit rounded-full border border-primary/30 bg-secondary/80 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-accent backdrop-blur md:mx-0">
              WEIGHT LOSS CLINIC
            </div>

            <h1 className="mt-5 text-3xl font-black leading-tight text-foreground md:text-6xl">
              美麗好診所
            </h1>

            <p className="mt-4 text-lg font-semibold text-accent md:text-2xl">
              專業減肥診所・減重管理諮詢
            </p>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-muted-foreground md:mx-0 md:text-base">
              美麗好診所專注於減肥、減重與體重管理，
              提供個人化減重評估與專業諮詢，
              協助打造更健康、更理想的體態。
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
              {["猛健樂", "週纖達", "瑞倍適"].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-primary/20 bg-white/70 px-5 py-2 text-sm font-medium text-accent shadow-sm backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* 右側圖片 */}
          <div className="order-1 relative overflow-hidden bg-gradient-to-br from-secondary via-background to-primary/10 p-4 md:order-2 md:p-8">
            
            {/* 背景柔光 */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(129,216,208,0.22),transparent_65%)]" />

            {/* 圖片容器 */}
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-white/40 shadow-[0_24px_70px_rgba(129,216,208,0.22)] ring-1 ring-white/70 backdrop-blur-sm">
              
              <Image
                src="/images/hero.png"
                alt="美麗好診所 減肥診所"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />

              {/* 圖片柔化疊層 */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}