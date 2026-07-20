"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

import { createClient } from "@/lib/supabase/client"

export default function GrowthLoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)
    setErrorMessage("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorMessage("登入失敗，請確認 Email 與密碼是否正確。")
      setLoading(false)
      return
    }

    router.replace("/growth")
    router.refresh()
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold tracking-widest text-teal-600">
            CHILD GROWTH SYSTEM
          </p>

          <h1 className="mt-3 text-3xl font-black text-slate-900">
            兒童生長曲線系統
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            請使用診所人員帳號登入
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="請輸入管理員 Email"
              className="
                w-full rounded-xl border border-slate-300
                px-4 py-3 text-slate-900 outline-none
                transition focus:border-teal-500
                focus:ring-4 focus:ring-teal-100
              "
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              密碼
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="請輸入密碼"
              className="
                w-full rounded-xl border border-slate-300
                px-4 py-3 text-slate-900 outline-none
                transition focus:border-teal-500
                focus:ring-4 focus:ring-teal-100
              "
            />
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            >
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              flex w-full items-center justify-center
              rounded-xl bg-teal-600 px-5 py-3.5
              font-bold text-white transition
              hover:bg-teal-700
              disabled:cursor-not-allowed disabled:opacity-60
            "
          >
            {loading ? "登入中…" : "登入系統"}
          </button>
        </form>
      </section>
    </main>
  )
}