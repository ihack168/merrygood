"use client"

import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6">
      {/* 柔和背景裝飾 */}
      <div className="absolute left-1/2 top-0 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute right-0 top-32 -z-10 h-[260px] w-[260px] rounded-full bg-accent/10 blur-[90px]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* 左側文案 */}
        <div className="text-center md:text-left">
          <p className="mb-5 inline-flex rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-sm font-medium text-primary shadow-sm">
            專業醫美｜肌膚管理｜自然微整
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            讓美麗回到
            <span className="block text-primary">自然、細緻、安心</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted-foreground md:mx-0 md:text-lg">
            由專業團隊提供客製化醫美諮詢，從膚況分析、雷射光療到微整形療程，
            為你規劃適合自己的美麗節奏。
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <a
              href="https://line.me/R/ti/p/@你的LINEID"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_36px_rgba(217,143,143,0.32)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(217,143,143,0.42)]"
            >
              立即預約諮詢
            </a>

            <Link
              href="/#services"
              className="rounded-full border border-border bg-white px-7 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
            >
              查看療程介紹
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 rounded-3xl border border-border/70 bg-white/70 p-4 shadow-sm backdrop-blur">
            <div>
              <p className="text-xl font-bold text-foreground">1 對 1</p>
              <p className="mt-1 text-xs text-muted-foreground">專人諮詢</p>
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">客製化</p>
              <p className="mt-1 text-xs text-muted-foreground">療程規劃</p>
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">安心感</p>
              <p className="mt-1 text-xs text-muted-foreground">專業評估</p>
            </div>
          </div>
        </div>

        {/* 右側形象圖 */}
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/20 via-white to-accent/20 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2.5rem] border border-white bg-white p-3 shadow-[0_24px_80px_rgba(120,80,70,0.16)]">
            <Image
              src="/images/hero.png"
              alt="醫美診所專業諮詢形象"
              width={720}
              height={860}
              className="h-[420px] w-full rounded-[2rem] object-cover md:h-[560px]"
              priority
            />

            <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-lg backdrop-blur-xl">
              <p className="text-sm font-semibold text-foreground">
                專業醫美諮詢
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                依照膚況、五官比例與生活需求，規劃更自然的改善方式。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}