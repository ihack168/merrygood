"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { createClient } from "@/lib/supabase/client"

export function GrowthLogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)

    const supabase = createClient()

    const { error } = await supabase.auth.signOut({
      scope: "local",
    })

    if (error) {
      console.error("登出失敗：", error.message)
      setLoading(false)
      return
    }

    router.replace("/growth/login")
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
className="rounded-xl border-2 border-red-500 bg-red-50 px-5 py-3 text-sm font-extrabold text-red-700 shadow-sm transition hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-200"
    >
      {loading ? "登出中…" : "登出"}
    </button>
  )
}