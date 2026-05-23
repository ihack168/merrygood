"use client"

import {
  MessageCircle,
  MapPin,
  CalendarCheck,
  Sparkles,
} from "lucide-react"

const contacts = [
  {
    label: "LINE 線上諮詢",
    description: "加入 LINE 預約減肥門診與減重諮詢，由專人協助安排。",
    href: "https://line.me/R/ti/p/@你的LINEID",
    icon: <MessageCircle size={28} />,
    action: "立即加入 LINE",
  },
  {
    label: "診所位置",
    description: "台北市中山區南京東路一段42號3樓｜採預約制服務。",
    href: "https://www.google.com/maps/search/?api=1&query=台北市中山區南京東路一段42號3樓",
    icon: <MapPin size={28} />,
    action: "查看診所位置",
  },
]

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-24"
    >
      {/* 背景柔光 */}
      <div className="absolute left-1/2 top-0 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
      <div className="absolute -right-24 bottom-10 h-[280px] w-[280px] rounded-full bg-accent/10 blur-[100px]" />
      <div className="absolute -left-24 top-32 h-[260px] w-[260px] rounded-full bg-primary/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* 標題 */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/60 px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-accent shadow-sm backdrop-blur">
            <Sparkles size={14} />
            CONTACT US
          </div>

          <h2 className="text-3xl font-black tracking-tight text-foreground md:text-5xl">
            預約減重諮詢
          </h2>

          <p className="mt-5 text-base leading-8 text-muted-foreground">
            美麗好診所提供減肥診所與減重管理諮詢服務，
            歡迎透過 LINE 或診所位置資訊與我們聯絡，
            由專人協助安排預約與相關諮詢。
          </p>
        </div>

        {/* 主卡片 */}
        <div className="overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/55 p-4 shadow-[0_25px_90px_rgba(129,216,208,0.16)] backdrop-blur-2xl md:p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group relative overflow-hidden rounded-[2rem]
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
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/12 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex items-start gap-5">
                  <div
                    className="
                      flex h-16 w-16 flex-shrink-0 items-center justify-center
                      rounded-2xl
                      border border-primary/15
                      bg-primary/10
                      text-primary
                      shadow-[0_12px_30px_rgba(129,216,208,0.12)]
                      transition-all duration-500
                      group-hover:scale-110
                      group-hover:bg-primary
                      group-hover:text-white
                    "
                  >
                    {contact.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-black text-foreground">
                      {contact.label}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {contact.description}
                    </p>

                    <div className="mt-6 flex items-center text-sm font-bold text-primary">
                      {contact.action}
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* 底部提示 */}
          <div className="mt-5 rounded-[1.75rem] border border-primary/15 bg-gradient-to-r from-primary/10 via-white/60 to-primary/10 p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/75 text-primary shadow-sm">
              <CalendarCheck size={24} />
            </div>

            <p className="text-lg font-black text-foreground">
              採預約制，建議先加入 LINE 詢問時段
            </p>

            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              由專人協助了解需求、安排減重諮詢，讓每一次評估都更安心。
            </p>

            <a
              href="https://line.me/R/ti/p/@你的LINEID"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-6 inline-flex items-center justify-center
                rounded-full
                bg-primary
                px-8 py-4
                text-sm font-bold
                text-white
                shadow-[0_18px_45px_rgba(129,216,208,0.35)]
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_24px_60px_rgba(129,216,208,0.42)]
              "
            >
              加入 LINE 預約減重諮詢
            </a>
          </div>
        </div>

        {/* SEO 語意文字 */}
        <div className="sr-only">
          <h3>減肥診所聯絡方式</h3>

          <p>
            美麗好診所提供減肥、減重診所、體重管理與熱門減重商品諮詢服務，
            包含猛健樂、週纖達與瑞倍適等相關資訊。
          </p>

          <p>
            若您正在尋找減肥診所、減重診所或專業減重管理，
            歡迎透過 LINE 與美麗好診所預約諮詢。
          </p>
        </div>
      </div>
    </section>
  )
}