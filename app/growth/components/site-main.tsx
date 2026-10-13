"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

export function SiteMain({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isGrowthPage = pathname?.replace(/\/+$/, "") === "/growth"

  if (isGrowthPage) return <div className="flex-1">{children}</div>

  return <main className="flex-1 pt-20">{children}</main>
}
