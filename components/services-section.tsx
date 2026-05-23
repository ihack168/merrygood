"use client"

import Link from "next/link"
import {
  Scale,
  ClipboardCheck,
  Apple,
  Activity,
  HeartPulse,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

interface ServiceItem {
  title: string
  description: string
  icon: React.ReactNode
  link?: string
}

const services: ServiceItem[] = [
  {
    title: "減肥門診諮詢",
    description:
      "針對想減肥、控制體重或改善體態的人，提供專業減重評估與諮詢建議。",
    icon: <Scale size={24} />,
  },
  {
    title: "個人化減重評估",
    description:
      "依照體重狀況、生活習慣、飲食模式與減重目標，規劃適合自己的減肥方向。",
    icon: <ClipboardCheck size={24} />,
  },
  {
    title: "飲食與生活型態建議",
    description:
      "協助調整日常飲食、作息與生活習慣，讓減重不只是短期控制，而是長期管理。",
    icon: <Apple size={24} />,
  },
  {
    title: "體重管理追蹤",
    description:
      "透過定期追蹤與回診評估，協助掌握減重進度，調整更適合的減肥策略。",
    icon: <Activity size={24} />,
  },
  {
    title: "熱門減重商品諮詢",
    description:
      "提供猛健樂、週纖達、瑞倍適等熱門減重相關商品諮詢，實際使用需經醫師評估。",
    icon: <HeartPulse size={24} />,
  },
  {
    title: "安全醫療評估",
    description:
      "重視安全與個人身體狀況，由專業團隊提供減重前評估與後續追蹤建議。",
    icon: <ShieldCheck size={24} />,
  },
]

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden px-6 py-24"
    >
      {/* 背景柔光 */}
      <div className="absolute left-1/2 top-0 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-primary/12 blur-[120px]" />
      <div className="absolute -left-24 top-32 h-[260px] w-[260px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute -right-24 bottom-10 h-[280px] w-[280px] rounded-full bg-accent/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* 標題 */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/60 px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-accent shadow-sm backdrop-blur">
            <Sparkles size={14} />
            WEIGHT LOSS CLINIC
          </div>

          <h2 className="text-3xl font-black tracking-tight text-foreground md:text-5xl">
            專業減肥診所
            <span className="block text-primary">
              個人化減重管理
            </span>
          </h2>

          <p className="mt-5 text-base leading-8 text-muted-foreground">
            美麗好診所專注於減肥、減重診所諮詢與體重管理，
            依照每個人的身體狀況、生活習慣與減重目標，
            提供更安心、更適合自己的減肥建議。
          </p>
        </div>

        {/* 卡片 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const CardContent = (
              <div
                className="
                  group relative h-full overflow-hidden rounded-[2rem]
                  border border-white/50
                  bg-white/70
                  p-7
                  shadow-[0_12px_40px_rgba(129,216,208,0.12)]
                  backdrop-blur
                  transition-all duration-500
                  hover:-translate-y-1.5
                  hover:border-primary/35
                  hover:bg-white/90
                  hover:shadow-[0_24px_70px_rgba(129,216,208,0.22)]
                "
              >
                {/* hover 光暈 */}
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/12 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  {/* icon */}
                  <div
                    className="
                      mb-5 flex h-14 w-14 items-center justify-center
                      rounded-2xl
                      border border-primary/15
                      bg-primary/10
                      text-primary
                      shadow-[0_12px_30px_rgba(129,216,208,0.10)]
                      transition-all duration-500
                      group-hover:scale-110
                      group-hover:bg-primary
                      group-hover:text-white
                    "
                  >
                    {service.icon}
                  </div>

                  {/* title */}
                  <h3 className="text-xl font-black text-foreground">
                    {service.title}
                  </h3>

                  {/* desc */}
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {service.description}
                  </p>

                  {/* arrow */}
                  <div className="mt-6 flex items-center text-sm font-bold text-primary">
                    了解更多
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            )

            if (service.link) {
              return (
                <Link
                  key={service.title}
                  href={service.link}
                  className="block h-full"
                >
                  {CardContent}
                </Link>
              )
            }

            return (
              <div key={service.title} className="h-full">
                {CardContent}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}