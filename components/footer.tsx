export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/70 bg-white/70 px-6 py-12 backdrop-blur">

      {/* 背景光暈 */}
      <div className="absolute left-1/2 top-0 h-[180px] w-[180px] -translate-x-1/2 rounded-full bg-primary/10 blur-[80px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">

        {/* 左側品牌資訊 */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            美麗好診所
          </h3>

          <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
            美麗好診所專注於減肥、減重診所與體重管理諮詢，
            提供個人化減重評估與專業建議，
            協助打造更健康、更理想的體態。
          </p>
        </div>

        {/* 中間導覽 */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">

          <a
            href="/blog"
            className="transition-colors hover:text-primary"
          >
            文章列表
          </a>

          <a
            href="/#contact"
            className="transition-colors hover:text-primary"
          >
            聯絡方式
          </a>

        </div>

        {/* 右側聯絡 */}
        <div className="text-center md:text-right">
          <p className="text-sm font-medium text-foreground">
            減肥診所 LINE 線上諮詢
          </p>

          <a
            href="https://line.me/R/ti/p/@你的LINEID"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-primary transition-opacity hover:opacity-70"
          >
            加入官方 LINE →
          </a>
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

      {/* 底部版權 */}
      <div className="relative mx-auto mt-10 max-w-6xl border-t border-border/60 pt-6 text-center">
        <p className="text-xs tracking-wide text-muted-foreground">
          © 2026 美麗好診所 Weight Loss Clinic. All rights reserved.
        </p>
      </div>

    </footer>
  )
}