import { LineConsultButton } from "@/components/line-consult-button"

export function Footer() {
  return (
    <footer
      className="
        relative overflow-hidden
        border-t border-white/40
        bg-gradient-to-b from-white/55 to-white/75
        px-6 pt-20
        backdrop-blur-2xl
      "
    >
      {/* 背景柔光 */}
      <div className="absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-primary/12 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* 主內容 */}
        <div className="flex flex-col gap-16 md:flex-row md:items-center md:justify-between">
          
          {/* 左側品牌 */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-5 md:justify-start">
              
              {/* Logo */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl" />

                <img
                  src="/images/logo.png"
                  alt="美麗好減肥減重-體重管理資訊站 Logo"
                  className="
                    relative
                    h-16 w-16
                    rounded-full
                    border border-white/70
                    bg-white
                    object-cover
                    shadow-[0_14px_40px_rgba(129,216,208,0.22)]
                  "
                />
              </div>

              {/* Brand */}
              <div>
                <h3 className="text-3xl font-black tracking-tight text-foreground">
                  美麗好減肥減重-體重管理資訊站
                </h3>

                <p className="mt-2 text-[11px] tracking-[0.28em] text-muted-foreground">
                  WEIGHT LOSS CLINIC
                </p>
              </div>
            </div>

            {/* slogan */}
            <p className="mx-auto mt-7 max-w-md text-sm leading-8 text-muted-foreground md:mx-0">
              專注於減肥、減重管理與體重控制諮詢，
              提供個人化評估與專業減重建議。
            </p>
          </div>

          {/* 右側 CTA */}
          <div className="text-center md:text-right">
            <div
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-primary/15
                bg-white/60
                px-4 py-2
                text-[11px] font-black
                tracking-[0.2em]
                text-accent
                shadow-sm
                backdrop-blur
              "
            >
              LINE CONSULTATION
            </div>

            <p className="mt-5 text-2xl font-black tracking-tight text-foreground">
              線上減重諮詢
            </p>

            <p className="mt-4 text-sm leading-8 text-muted-foreground">
              猛健樂｜週纖達｜瑞倍適
              <br />
              專業減重管理與體重控制建議
            </p>

            <LineConsultButton
              className="
                mt-7 inline-flex items-center justify-center
                rounded-full
                bg-primary
                px-8 py-3.5
                text-sm font-black
                text-white
                shadow-[0_20px_50px_rgba(129,216,208,0.34)]
                transition-all duration-300
                hover:-translate-y-1
                hover:scale-[1.02]
                hover:shadow-[0_26px_65px_rgba(129,216,208,0.42)]
              "
            >
              加入官方 LINE
            </LineConsultButton>
          </div>
        </div>

        {/* 分隔線 */}
        <div className="mt-16 border-t border-white/50" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 py-8 text-center md:flex-row md:text-left">
          
          <p className="text-xs tracking-[0.12em] text-muted-foreground">
            © 2026 美麗好減肥減重-體重管理資訊站 Weight Loss Clinic.
            <br className="md:hidden" />
            All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs font-medium text-muted-foreground">
            <span>減肥診所</span>
            <span>減重管理</span>
            <span>體重控制</span>
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="sr-only">
        <h3>美麗好減肥減重-體重管理資訊站｜減肥診所｜減重診所</h3>

        <p>
          美麗好減肥減重-體重管理資訊站提供減肥、減重管理、體重控制與減重諮詢服務，
          包含猛健樂、週纖達、瑞倍適等熱門減重相關商品諮詢。
        </p>

        <p>
          如果您正在尋找減肥診所、減重診所或專業體重管理，
          歡迎與美麗好減肥減重-體重管理資訊站聯絡預約。
        </p>
      </div>
    </footer>
  )
}