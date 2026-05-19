"use client"

import Link from "next/link"
import {
  Scale,
  ClipboardCheck,
  Apple,
  Activity,
  HeartPulse,
  ShieldCheck,
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
      {/* 背景光暈 */}
      <div className="absolute left-0 top-20 h-[240px] w-[240px] rounded-full bg-primary/10 blur-[90px]" />
      <div className="absolute right-0 bottom-0 h-[280px] w-[280px] rounded-full bg-accent/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">

        {/* 標題 */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-primary">
            WEIGHT LOSS CLINIC
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
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
              <div className="group relative h-full overflow-hidden rounded-[2rem] border border-border/70 bg-white/80 p-7 shadow-[0_10px_40px_rgba(120,80,70,0.08)] backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(217,143,143,0.14)]">

                {/* hover 光暈 */}
                <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">

                  {/* icon */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    {service.icon}
                  </div>

                  {/* title */}
                  <h3 className="text-xl font-bold text-foreground">
                    {service.title}
                  </h3>

                  {/* desc */}
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {service.description}
                  </p>

                  {/* arrow */}
                  <div className="mt-6 flex items-center text-sm font-medium text-primary">
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
                  className="block"
                >
                  {CardContent}
                </Link>
              )
            }

            return (
              <div key={service.title}>
                {CardContent}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}