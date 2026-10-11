"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

export function FooterVisibility({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const normalizedPath = pathname?.replace(/\/+$/, "")

  if (normalizedPath === "/growth") return null

  return <>{children}</>
}
