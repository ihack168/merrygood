"use client"

import Image from "next/image"
import { MessageCircle, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-5 pt-8 md:px-10">
      {/* 背景柔光 */}
      <div className="absolute left-1/2 top-0 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-primary/16 blur-[140px]" />
      <div className="absolute -left-32 top-40 h-[320px] w-[320px] rounded-full bg-primary/10 blur-[110px]" />
      <div className="absolute -right-32 bottom-0 h-[360px] w-[360px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div
          className="
            relative overflow-hidden rounded-[2.8rem]
            border border-white/50
            bg-gradient-to-br from-white via-white/90 to-primary/10
            px-5 py-6
            shadow-[0_30px_100px_rgba(129,216,208,0.20)]
            backdrop-blur-2xl
            md:px-10 md:py-10
          "
        >
          {/* 內部背景紋理 */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(129,216,208,0.20),transparent_34%),radial-gradient(circle_at_25%_70%,rgba(129,216,208,0.10),transparent_35%)]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            {/* 左側文字 */}
            <div className="order-2 text-center lg:order-1 lg:text-left">
              <div className="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-white/70 px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-accent shadow-sm backdrop-blur lg:mx-0">
                <Sparkles size={14} />
                WEIGHT LOSS CLINIC
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
                美麗好診所
              </h1>

              <p className="mt-5 text-xl font-black leading-relaxed text-accent md:text-3xl">
                專業減肥診所
                <span className="block text-foreground">
                  從評估開始，安心管理體重
                </span>
              </p>

              <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-muted-foreground md:text-base lg:mx-0">
                美麗好診所專注於減肥、減重與體重管理，
                提供個人化減重評估與專業諮詢，
                協助你找到更適合自己的減重方向。
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href="https://line.me/R/ti/p/@你的LINEID"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-full bg-primary px-8 py-4
                    text-sm font-bold text-white
                    shadow-[0_18px_45px_rgba(129,216,208,0.38)]
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_24px_60px_rgba(129,216,208,0.45)]
                  "
                >
                  <MessageCircle size={18} />
                  加入 LINE 免費諮詢
                </a>

              </div>

              {/* 信任標籤 */}
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {["醫師評估", "個人化建議", "預約制諮詢"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-primary/15 bg-white/60 px-4 py-3 text-sm font-bold text-accent shadow-sm backdrop-blur lg:justify-start"
                  >
                    <CheckCircle2 size={16} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* 右側圖片 */}
            <div className="order-1 lg:order-2">
              <div className="relative mx-auto max-w-[620px]">
                {/* 後方大柔光 */}
                <div className="absolute inset-8 rounded-full bg-primary/25 blur-[70px]" />

                {/* 浮動小資訊卡 */}
                <div className="absolute -left-1 top-8 z-20 hidden rounded-3xl border border-white/60 bg-white/75 px-5 py-4 shadow-[0_18px_50px_rgba(129,216,208,0.22)] backdrop-blur-xl md:block">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <ShieldCheck size={22} />
                    </div>

                    <div>
                      <p className="text-sm font-black text-foreground">
                        專業評估
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        依個人狀況規劃
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="
                    relative overflow-hidden rounded-[2.6rem]
                    border border-white/70
                    bg-white/50
                    p-3
                    shadow-[0_30px_90px_rgba(129,216,208,0.26)]
                    backdrop-blur-xl
                  "
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-secondary md:aspect-square">
                    <Image
                      src="/images/hero.png"
                      alt="美麗好診所 減肥診所"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/25 via-transparent to-white/10" />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/40" />
                  </div>
                </div>

                {/* 下方狀態條 */}
                <div className="mx-auto -mt-7 flex w-[90%] max-w-md items-center justify-center gap-3 rounded-full border border-white/60 bg-white/80 px-5 py-3 text-xs font-bold text-muted-foreground shadow-[0_18px_50px_rgba(129,216,208,0.20)] backdrop-blur-xl">
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