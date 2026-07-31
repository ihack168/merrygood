"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react"

import { LineConsultButton } from "@/components/line-consult-button"

const highlights = [
  "專業醫療團隊",
  "個人化減重評估",
  "台北・新竹院區",
]

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-[linear-gradient(135deg,hsl(var(--background))_0%,hsl(var(--background))_58%,hsl(var(--primary)/0.08)_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute -left-40 top-10 -z-20 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-32 bottom-[-10rem] -z-20 h-[34rem] w-[34rem] rounded-full bg-emerald-300/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.025] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:72px_72px]"
      />

      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-6 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-8 lg:py-16">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-primary sm:text-sm">
            Merrygood Weight Management
          </p>

          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[1.02] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl">
            專業減重資訊
            <span className="mt-2 block text-primary">
              從理解開始
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg font-bold leading-8 text-foreground/85 sm:text-xl">
            體重管理、飲食控制與減重醫療資訊整理
          </p>

          <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            美麗好減重資訊站整理減肥、減重、體重管理與熱門減重療程相關知識，
            幫助你先看懂資訊，再與專業醫療人員討論適合自己的方向。
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LineConsultButton
              className="
                inline-flex min-h-12 items-center justify-center gap-2
                rounded-full bg-[#06C755]
                px-7 py-3 text-base font-black text-white
                shadow-[0_14px_32px_rgba(6,199,85,0.24)]
                transition duration-300
                hover:-translate-y-0.5 hover:bg-[#05b94f]
                hover:shadow-[0_18px_38px_rgba(6,199,85,0.32)]
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-[#06C755] focus-visible:ring-offset-2
              "
            >
              <MessageCircle size={18} />
              Line 預約諮詢
            </LineConsultButton>

            <Link
              href="/weight-loss-programs"
              className="
                inline-flex min-h-12 items-center justify-center gap-2
                rounded-full border border-border/80 bg-background/80
                px-7 py-3 text-base font-black text-foreground
                transition duration-300
                hover:-translate-y-0.5 hover:border-primary/40
                hover:bg-primary/[0.06] hover:text-primary
              "
            >
              查看減重項目
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-border/70 pt-6">
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm font-bold text-foreground/75"
              >
                <CheckCircle2 size={17} className="text-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-[680px]">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[2.75rem] bg-primary/10 blur-2xl"
            />

            <div className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-card shadow-[0_28px_80px_-38px_rgba(15,23,42,0.45)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/hero.png"
                  alt="美麗好減重資訊站專業減重諮詢"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover object-center"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="max-w-md rounded-2xl border border-white/20 bg-black/28 p-4 text-white backdrop-blur-md">

                    <p className="mt-2 text-lg font-black leading-7">
                     健康的減重方式。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-3 top-8 hidden rounded-2xl border border-border/70 bg-background/92 px-5 py-4 shadow-lg backdrop-blur-md sm:block">
              <p className="mt-1 text-xs text-muted-foreground">
                安全比速度更重要
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
