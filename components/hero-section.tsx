"use client"

import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-5 pt-8 md:px-10">
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/18 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-[2rem] border border-primary/20 bg-card shadow-[0_25px_80px_rgba(111,119,66,0.10)] md:grid-cols-2 md:rounded-[2.5rem]">
          <div className="order-2 flex flex-col justify-center px-6 py-10 text-center md:order-1 md:px-12 md:py-16 md:text-left">
            <div className="mx-auto inline-flex w-fit rounded-full border border-primary/30 bg-secondary px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-accent md:mx-0">
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
                  className="rounded-full border border-primary/30 bg-secondary px-5 py-2 text-sm font-medium text-accent"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 bg-secondary p-4 md:order-2 md:p-8">
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