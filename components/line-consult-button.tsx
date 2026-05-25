"use client"

import { ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwFpZDhMveHhdOYdDkh02JpWk28jUCBqikyM-Urg_6Uw2jTH7d8ZluKxinKTWh5_20N/exec"

const LINE_ADD_URL_MAP = {
  taipei: "https://line.me/R/ti/p/@merrygood",
  hsinchu: "https://line.me/R/ti/p/@merrygoodhc",
}

const VENDOR_ID = "merrygood"
const VENDOR_NAME = "減肥診所"

interface LineConsultButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function LineConsultButton({
  children,
  className = "",
  onClick,
}: LineConsultButtonProps) {
  const [mounted, setMounted] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [clinicArea, setClinicArea] = useState<"taipei" | "hsinchu">("taipei")
  const [lastName, setLastName] = useState("")
  const [phoneLast3, setPhoneLast3] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const resetModal = () => {
    setShowModal(false)
    setClinicArea("taipei")
    setLastName("")
    setPhoneLast3("")
    setLoading(false)
  }

  const handleOpenModal = () => {
    setShowModal(true)
    setClinicArea("taipei")
    setLastName("")
    setPhoneLast3("")
  }

  const handleSubmitLineConsult = async () => {
    const cleanLastName = lastName.trim()
    const cleanPhoneLast3 = phoneLast3.trim()

    if (!clinicArea) {
      alert("請選擇院區")
      return
    }

    if (!cleanLastName) {
      alert("請輸入貴姓")
      return
    }

    if (!/^\d{3}$/.test(cleanPhoneLast3)) {
      alert("請輸入手機末 3 碼")
      return
    }

    const clinicAreaName =
      clinicArea === "taipei" ? "台北院區" : "新竹院區"

    try {
      setLoading(true)

      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "lineConsult",
          vendorId: VENDOR_ID,
          vendorName: VENDOR_NAME,
          serviceType: "weightLossClinic",
          clinicArea,
          clinicAreaName,
          lastName: cleanLastName,
          phoneLast3: cleanPhoneLast3,
          sourcePage: window.location.href,
        }),
      })

      const result = await res.json()

      if (!result.success) {
        alert(result.message || "送出失敗，請稍後再試")
        return
      }

      const lineAddUrl = LINE_ADD_URL_MAP[clinicArea]

      resetModal()

      window.open(lineAddUrl, "_blank", "noopener,noreferrer")
    } catch (error) {
      alert("送出失敗，請稍後再試")
    } finally {
      setLoading(false)
    }
  }

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-8">
      <div className="my-auto w-full max-w-sm rounded-2xl bg-white p-6 text-left shadow-xl">
        <h3 className="text-xl font-black text-foreground">
          LINE 免費諮詢
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          請選擇院區，並留下貴姓與手機末 3 碼，送出後會自動開啟對應院區 LINE 加好友。
        </p>

        <div className="mt-5">
          <label className="text-sm font-semibold text-foreground">
            選擇院區
          </label>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <label
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition-all ${
                clinicArea === "taipei"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-foreground"
              }`}
            >
              <input
                type="radio"
                name="clinicArea"
                checked={clinicArea === "taipei"}
                onChange={() => setClinicArea("taipei")}
                className="h-4 w-4"
              />
              台北院區
            </label>

            <label
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition-all ${
                clinicArea === "hsinchu"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-foreground"
              }`}
            >
              <input
                type="radio"
                name="clinicArea"
                checked={clinicArea === "hsinchu"}
                onChange={() => setClinicArea("hsinchu")}
                className="h-4 w-4"
              />
              新竹院區
            </label>
          </div>
        </div>

        <div className="mt-5">
          <label className="text-sm font-semibold text-foreground">
            貴姓
          </label>

          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="例如：王"
            className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-semibold text-foreground">
            手機末 3 碼
          </label>

          <input
            value={phoneLast3}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 3)
              setPhoneLast3(value)
            }}
            placeholder="例如：168"
            inputMode="numeric"
            maxLength={3}
            className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={resetModal}
            disabled={loading}
            className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground"
          >
            取消
          </button>

          <button
            type="button"
            onClick={handleSubmitLineConsult}
            disabled={loading}
            className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
          >
            {loading ? "送出中..." : "送出並加 LINE"}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onClick?.()
          handleOpenModal()
        }}
        className={className}
      >
        {children}
      </button>

      {mounted && showModal && createPortal(modalContent, document.body)}
    </>
  )
}