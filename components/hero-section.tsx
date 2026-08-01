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
        className="absolute -left-36 top-4 -z-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-28 bottom-[-8rem] -z-20 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.025] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-6 px-6 py-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8 lg:px-8 lg:py-8">
        <div className="order-2 lg:order-1">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-primary sm:text-xs">
            Merrygood Weight Management
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-foreground sm:text-5xl lg:text-6xl">
            專業減重資訊
            <span className="mt-1 block text-primary">從理解開始</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base font-bold leading-7 text-foreground/85 sm:text-lg">
            體重管理、飲食控制與減重醫療資訊整理
          </p>

          <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            美麗好減重資訊站整理減肥、減重、體重管理與熱門減重療程相關知識，
            幫助你先看懂資訊，再與專業醫療人員討論適合自己的方向。
          </p>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <LineConsultButton
              className="
                inline-flex min-h-11 items-center justify-center gap-2
                rounded-full bg-[#06C755]
                px-6 py-2.5 text-sm font-black text-white
                shadow-[0_12px_28px_rgba(6,199,85,0.22)]
                transition duration-300
                hover:-translate-y-0.5 hover:bg-[#05b94f]
                hover:shadow-[0_16px_34px_rgba(6,199,85,0.30)]
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-[#06C755] focus-visible:ring-offset-2
              "
            >
              <MessageCircle size={17} />
              Line 預約諮詢
            </LineConsultButton>

            <Link
              href="/weight-loss-programs"
              className="
                inline-flex min-h-11 items-center justify-center gap-2
                rounded-full border border-border/80 bg-background/80
                px-6 py-2.5 text-sm font-black text-foreground
                transition duration-300
                hover:-translate-y-0.5 hover:border-primary/40
                hover:bg-primary/[0.06] hover:text-primary
              "
            >
              查看減重項目
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-border/70 pt-4">
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-xs font-bold text-foreground/75 sm:text-sm"
              >
                <CheckCircle2 size={16} className="text-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-[620px]">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2.5rem] bg-primary/10 blur-2xl"
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-[0_24px_70px_-38px_rgba(15,23,42,0.42)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/hero.png"
                  alt="美麗好減重資訊站專業減重諮詢"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                />

                <div className="absolute bottom-3 left-3">
                  <div className="rounded-full border border-white/20 bg-black/35 px-3.5 py-1.5 text-white shadow-lg backdrop-blur-md sm:px-4 sm:py-2">
                    <p className="text-xs font-black tracking-tight sm:text-sm">
                      健康減重，從理解開始。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
