"use client"

import Link from "next/link"
import {
  Sparkles,
  Syringe,
  ScanLine,
  ShieldCheck,
  HeartHandshake,
  Smile,
} from "lucide-react"

interface ServiceItem {
  title: string
  description: string
  icon: React.ReactNode
  link?: string
}

const services: ServiceItem[] = [
  {
    title: "肌膚管理",
    description:
      "依照個人膚況提供保濕修護、粉刺調理與日常保養規劃。",
    icon: <Sparkles size={24} />,
  },
  {
    title: "微整形注射",
    description:
      "提供玻尿酸、肉毒桿菌等微整療程，打造自然精緻輪廓。",
    icon: <Syringe size={24} />,
  },
  {
    title: "雷射光療",
    description:
      "針對毛孔、膚色不均、痘疤與細紋進行客製化改善。",
    icon: <ScanLine size={24} />,
  },
  {
    title: "術前專業評估",
    description:
      "由專業團隊進行完整膚況分析與個人化療程建議。",
    icon: <ShieldCheck size={24} />,
  },
  {
    title: "術後修護照護",
    description:
      "提供完整術後保養與修護建議，降低不適與恢復期壓力。",
    icon: <HeartHandshake size={24} />,
  },
  {
    title: "自然美感規劃",
    description:
      "重視五官比例與自然協調，打造更適合自己的狀態。",
    icon: <Smile size={24} />,
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
            OUR SERVICES
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            專業醫美療程與
            <span className="block text-primary">
              客製化肌膚管理
            </span>
          </h2>

          <p className="mt-5 text-base leading-8 text-muted-foreground">
            從日常肌膚保養到醫學美容療程，
            依照個人需求與膚況，
            規劃更自然、安心且適合自己的改善方式。
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