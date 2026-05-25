export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/30 bg-white/55 px-6 pt-16 backdrop-blur-2xl">

      {/* 背景光暈 */}
      <div className="absolute left-1/2 top-0 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">

        {/* 主內容 */}
        <div className="flex flex-col gap-14 md:flex-row md:items-start md:justify-between">

          {/* 左側品牌 */}
          <div className="max-w-md text-center md:text-left">

            <div className="flex items-center justify-center gap-4 md:justify-start">

              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/25 blur-md" />

                <img
                  src="/images/logo.png"
                  alt="美麗好診所 Logo"
                  className="
                    relative
                    h-14 w-14
                    rounded-full
                    border border-white/60
                    bg-white
                    object-cover
                    shadow-[0_10px_30px_rgba(129,216,208,0.20)]
                  "
                />
              </div>

              <div>
                <h3 className="text-2xl font-black tracking-tight text-foreground">
                  美麗好診所
                </h3>

                <p className="mt-1 text-[11px] tracking-[0.22em] text-muted-foreground">
                  WEIGHT LOSS CLINIC
                </p>
              </div>
            </div>


          </div>

          {/* 右側 CTA */}
          <div className="text-center md:text-right">

            <p className="text-sm font-bold tracking-[0.14em] text-foreground">
              LINE 線上減重諮詢
            </p>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              猛健樂｜週纖達｜瑞倍適
              <br />
              專業減重管理諮詢
            </p>

            <a
              href="https://line.me/R/ti/p/@你的LINEID"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-6 inline-flex items-center justify-center
                rounded-full
                bg-primary
                px-7 py-3
                text-sm font-bold
                text-white
                shadow-[0_18px_40px_rgba(129,216,208,0.35)]
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_24px_55px_rgba(129,216,208,0.42)]
              "
            >
              加入官方 LINE
            </a>

          </div>

        </div>

        {/* 分隔線 */}
        <div className="mt-14 border-t border-white/40" />

        {/* 底部 */}
        <div className="flex flex-col items-center justify-between gap-5 py-7 text-center md:flex-row md:text-left">

          <p className="text-xs tracking-wide text-muted-foreground">
            © 2026 美麗好診所 Weight Loss Clinic.
            <br className="md:hidden" />
            All rights reserved.
          </p>

        </div>

      </div>

      {/* SEO 隱藏內容 */}
      <div className="sr-only">
        <h3>美麗好診所｜減肥診所｜減重診所</h3>

        <p>
          美麗好診所提供減肥、減重管理、體重控制與減重諮詢服務，
          包含猛健樂、週纖達、瑞倍適等熱門減重相關商品諮詢。
        </p>

        <p>
          如果您正在尋找減肥診所、減重診所或專業體重管理，
          歡迎與美麗好診所聯絡預約。
        </p>
      </div>

    </footer>
  )
}