"use client"

import { useEffect } from "react"
import { LineConsultButton } from "@/components/line-consult-button"

export default function LinePage() {
  useEffect(() => {
    document.body.style.background = "#f8fafc"

    return () => {
      document.body.style.background = ""
    }
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-[2rem] border border-border/70 bg-white/90 p-10 text-center shadow-[0_20px_80px_rgba(31,78,121,0.12)] backdrop-blur">
        
        <p className="text-sm font-semibold tracking-[0.25em] text-primary">
          LINE CONSULTATION
        </p>

        <h1 className="mt-4 text-3xl font-black leading-tight text-foreground md:text-5xl">
          房東 LINE 免費諮詢
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base leading-8 text-muted-foreground">
          加入官方 LINE，
          了解社會住宅包租代管、
          房屋出租管理、
          租屋補助與房東出租相關資訊。
        </p>

        <div className="mt-10">
          <LineConsultButton
            className="
              inline-flex
              items-center
              justify-center
              rounded-full
              bg-primary
              px-10
              py-5
              text-base
              font-black
              text-primary-foreground
              shadow-[0_18px_44px_rgba(31,78,121,0.28)]
              transition-all
              hover:-translate-y-1
              hover:shadow-[0_22px_54px_rgba(31,78,121,0.36)]
            "
          >
            立即加入 LINE 諮詢
          </LineConsultButton>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-2xl border border-border/60 bg-secondary/30 p-4">
            房東出租
          </div>

          <div className="rounded-2xl border border-border/60 bg-secondary/30 p-4">
            包租代管
          </div>

          <div className="rounded-2xl border border-border/60 bg-secondary/30 p-4">
            租屋補助
          </div>
        </div>
      </div>
    </main>
  )
}