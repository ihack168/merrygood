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
            專業醫美療程、肌膚管理與客製化美學規劃，
            陪你打造更自然、細緻與安心的美麗體驗。
          </p>
        </div>

        {/* 中間導覽 */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a
            href="/"
            className="transition-colors hover:text-primary"
          >
            首頁
          </a>

          <a
            href="/#services"
            className="transition-colors hover:text-primary"
          >
            療程介紹
          </a>

          <a
            href="/blog"
            className="transition-colors hover:text-primary"
          >
            最新文章
          </a>

          <a
            href="/#contact"
            className="transition-colors hover:text-primary"
          >
            聯絡我們
          </a>
        </div>

        {/* 右側聯絡 */}
        <div className="text-center md:text-right">
          <p className="text-sm font-medium text-foreground">
            LINE 線上預約諮詢
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

      {/* 底部版權 */}
      <div className="relative mx-auto mt-10 max-w-6xl border-t border-border/60 pt-6 text-center">
        <p className="text-xs tracking-wide text-muted-foreground">
          © 2026 美麗好診所 Aesthetic Clinic. All rights reserved.
        </p>
      </div>
    </footer>
  )
}