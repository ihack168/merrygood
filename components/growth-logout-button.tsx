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
      className="
        rounded-xl border border-slate-300
        bg-white px-4 py-2 text-sm font-bold text-slate-700
        transition hover:bg-slate-100
        disabled:cursor-not-allowed disabled:opacity-50
      "
    >
      {loading ? "登出中…" : "登出"}
    </button>
  )
}