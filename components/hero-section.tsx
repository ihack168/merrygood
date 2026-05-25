"use client"

import Image from "next/image"
import {
  MessageCircle,
  Sparkles,
  CheckCircle2,
} from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-5 pt-6 md:px-10">
      {/* 背景大柔光 */}
      <div className="absolute left-1/2 top-0 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-primary/12 blur-[160px]" />

      <div className="absolute -left-40 top-32 h-[320px] w-[320px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="absolute -right-40 bottom-0 h-[360px] w-[360px] rounded-full bg-accent/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <div
          className="
            relative overflow-hidden
            rounded-[3rem]
            border border-white/60
            bg-gradient-to-br
            from-white
            via-white/92
            to-primary/8
            px-6 py-6
            shadow-[0_35px_120px_rgba(129,216,208,0.16)]
            backdrop-blur-2xl
            md:px-10 md:py-10
          "
        >
          {/* 紋理 */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.9),transparent_20%),radial-gradient(circle_at_80%_30%,rgba(129,216,208,0.14),transparent_30%),radial-gradient(circle_at_40%_80%,rgba(129,216,208,0.10),transparent_35%)]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            {/* 左側 */}
            <div className="order-2 text-center lg:order-1 lg:text-left">
              {/* badge */}
              <div className="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-2 text-[11px] font-black tracking-[0.24em] text-accent shadow-sm backdrop-blur lg:mx-0">
                <Sparkles size={13} />
                WEIGHT LOSS CLINIC
              </div>

              {/* title */}
              <h1 className="mt-7 text-5xl font-black tracking-[-0.04em] text-foreground md:text-7xl">
                美麗好診所
              </h1>

              {/* subtitle */}
              <div className="mt-6 space-y-2">
                <p className="text-2xl font-black tracking-tight text-accent md:text-4xl">
                  專業減肥診所
                </p>

                <p className="text-lg font-semibold text-foreground/80 md:text-2xl">
                  個人化減重管理與體重控制諮詢
                </p>
              </div>

              {/* desc */}
              <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-muted-foreground md:text-base lg:mx-0">
                美麗好診所專注於減肥、減重與體重管理，
                提供個人化減重評估與專業諮詢，
                協助打造更健康、更理想的體態。
              </p>

              {/* CTA */}
              <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href="https://line.me/R/ti/p/@你的LINEID"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-full
                    bg-primary
                    px-9 py-4
                    text-sm font-black
                    text-white
                    shadow-[0_20px_50px_rgba(129,216,208,0.35)]
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:scale-[1.02]
                    hover:shadow-[0_28px_70px_rgba(129,216,208,0.45)]
                  "
                >
                  <MessageCircle size={18} />
                  加入 LINE 免費諮詢
                </a>

              </div>

              {/* trust */}
              <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  "個人化評估",
                  "專業減重管理",
                  "預約制諮詢",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      flex items-center justify-center gap-2
                      rounded-2xl
                      border border-white/60
                      bg-white/55
                      px-4 py-3
                      text-sm font-bold
                      text-accent
                      shadow-[0_10px_30px_rgba(129,216,208,0.08)]
                      backdrop-blur
                      lg:justify-start
                    "
                  >
                    <CheckCircle2 size={16} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* 右側圖片 */}
            <div className="order-1 lg:order-2">
              <div className="relative mx-auto max-w-[660px]">
                {/* 背景柔光 */}
                <div className="absolute inset-10 rounded-full bg-primary/20 blur-[90px]" />

                {/* 主圖卡 */}
                <div
                  className="
                    relative overflow-hidden
                    rounded-[3rem]
                    border border-white/70
                    bg-white/50
                    p-3
                    shadow-[0_35px_100px_rgba(129,216,208,0.22)]
                    backdrop-blur-2xl
                  "
                >
                  <div className="relative aspect-square overflow-hidden rounded-[2.4rem] bg-secondary">
                    <Image
                      src="/images/hero.png"
                      alt="美麗好診所 減肥診所"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="
                        object-cover object-center
                        transition-transform duration-700
                        hover:scale-[1.03]
                      "
                    />

                    {/* 漸層 */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-white/10" />

                    {/* 玻璃邊 */}
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/40" />
                  </div>
                </div>

                {/* 底部狀態 */}
                <div
                  className="
                    mx-auto -mt-7
                    flex w-[92%] max-w-lg items-center justify-center gap-3
                    rounded-full
                    border border-white/70
                    bg-white/80
                    px-5 py-3
                    text-xs font-bold
                    text-muted-foreground
                    shadow-[0_18px_50px_rgba(129,216,208,0.18)]
                    backdrop-blur-xl
                  "
                >
                  <span className="h-2 w-2 rounded-full bg-primary" />

                  減重諮詢｜體重管理｜熱門減重商品諮詢
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}