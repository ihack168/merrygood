"use client"

import { useState, type ChangeEvent } from "react"
import { createClient } from "@/lib/supabase/client"

type Backup = {
  format: "growth-record-backup"
  schemaVersion: 1
  exportedAt: string
  counts: { patients: number; measurements: number }
  patients: Record<string, unknown>[]
  measurements: Record<string, unknown>[]
}
type Report = {
  addedPatients: number
  addedMeasurements: number
  skipped: number
  normalized: number
  mappedCreators: number
  dryRun: boolean
}
const MAX_BYTES = 20 * 1024 * 1024

function parseBackup(value: unknown): Backup {
  if (!value || typeof value !== "object") throw new Error("不是有效的備份檔")
  const b = value as Partial<Backup>
  if (b.format !== "growth-record-backup" || b.schemaVersion !== 1 ||
      !Array.isArray(b.patients) || !Array.isArray(b.measurements) ||
      !b.counts || b.counts.patients !== b.patients.length ||
      b.counts.measurements !== b.measurements.length ||
      typeof b.exportedAt !== "string" || !Number.isFinite(Date.parse(b.exportedAt))) {
    throw new Error("檔案格式、版本、日期或筆數不符，請選擇本系統下載的 JSON 備份")
  }
  return b as Backup
}
function errorMessage(error: unknown) {
  if (error && typeof error === "object" && "message" in error) return String(error.message)
  return "操作失敗，請確認網路與登入狀態"
}

export function GrowthBackup({ onRestored, disabled = false }: {
  onRestored: () => Promise<void>
  disabled?: boolean
}) {
  const [busy, setBusy] = useState(false)
  const [backup, setBackup] = useState<Backup | null>(null)
  const [filename, setFilename] = useState("")
  const [report, setReport] = useState<Report | null>(null)
  const [mapCreators, setMapCreators] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const blocked = busy || disabled
  const button = "rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"

  async function download() {
    setBusy(true); setError(""); setMessage("")
    try {
      const { data, error: rpcError } = await createClient().rpc("growth_backup_export_v1")
      if (rpcError) throw rpcError
      const result = parseBackup(data)
      // Compact JSON keeps the downloaded size aligned with the import limit.
      const blob = new Blob([JSON.stringify(result)], { type: "application/json;charset=utf-8" })
      if (blob.size > MAX_BYTES) throw new Error("備份超過 20 MB，本版無法還原此大小；請使用資料庫備份")
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `growth-backup-${new Date().toISOString().replace(/[:.]/g, "-")}.json`
      document.body.appendChild(a); a.click(); a.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
      setMessage(`已送出下載：${result.counts.patients} 位病童、${result.counts.measurements} 筆量測。請確認檔案已儲存。`)
    } catch (e) { setError(errorMessage(e)) }
    finally { setBusy(false) }
  }

  async function choose(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ""
    setBackup(null); setReport(null); setFilename(""); setError(""); setMessage(""); setMapCreators(false)
    if (!file) return
    setBusy(true)
    try {
      if (file.size > MAX_BYTES) throw new Error("檔案超過 20 MB 上限")
      const parsed = parseBackup(JSON.parse((await file.text()).replace(/^\uFEFF/, "")))
      setBackup(parsed); setFilename(file.name)
    } catch (e) { setError(errorMessage(e)) }
    finally { setBusy(false) }
  }

  async function restore(dryRun: boolean) {
    if (!backup || (!dryRun && !report)) return
    if (!dryRun && !window.confirm("確定新增預覽中的資料？既有資料不會刪除或覆蓋。")) return
    setBusy(true); setError(""); setMessage("")
    try {
      const { data, error: rpcError } = await createClient().rpc("growth_backup_restore_v1", {
        backup, dry_run: dryRun, map_creators: mapCreators,
      })
      if (rpcError) throw rpcError
      const result = data as Report
      if (!result || result.dryRun !== dryRun) throw new Error("伺服器回傳格式不符，請重新預覽確認狀態")
      if (dryRun) {
        setReport(result)
        setMessage("預覽驗證通過，尚未保存任何匯入資料。")
      } else {
        setReport(null); setBackup(null); setFilename("")
        setMessage(`還原完成：新增 ${result.addedPatients} 位病童、${result.addedMeasurements} 筆量測；跳過 ${result.skipped} 筆相同紀錄。`)
        try { await onRestored() }
        catch { setError("還原已完成，但頁面重新載入失敗，請重新整理頁面。") }
      }
    } catch (e) {
      setReport(null)
      setError(`${errorMessage(e)}${dryRun ? "" : " 若是網路中斷，結果可能尚未確認；請重新預覽，相同資料會跳過。"}`)
    } finally { setBusy(false) }
  }

  return (
    <section className="mx-auto mt-5 max-w-[1500px] px-4 sm:px-6 lg:px-8" aria-label="資料備份與還原">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-bold text-slate-900">資料備份與還原</h2>
        <p className="mt-1 text-sm text-slate-600">備份目前帳號可存取的全部病童與量測，不受搜尋條件影響。檔案含個人及健康資料，請妥善保存。</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button type="button" className={button} disabled={blocked} onClick={download}>下載 JSON 備份</button>
          <label className="text-sm font-medium text-slate-700">選擇備份檔
            <input type="file" accept=".json,application/json" disabled={blocked} onChange={choose} className="ml-2 max-w-full text-sm" />
          </label>
          {busy && <span role="status" className="text-sm text-blue-700">處理中，請勿關閉頁面…</span>}
        </div>
        {backup && <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
          <p className="break-all font-semibold">{filename}</p>
          <p className="mt-1">備份時間：{new Date(backup.exportedAt).toLocaleString()}；{backup.counts.patients} 位病童、{backup.counts.measurements} 筆量測。</p>
          <label className="mt-3 flex items-start gap-2">
            <input type="checkbox" checked={mapCreators} disabled={blocked} onChange={e => { setMapCreators(e.target.checked); setReport(null); setMessage("") }} />
            <span>搬到新專案時：將非目前帳號的建立者改為目前登入者（空白建立者保持空白；原始備份檔不變）。</span>
          </label>
          <p className="mt-2">還原會新增缺少的紀錄、跳過完全相同的紀錄；內容衝突會停止整批匯入。若要回復被修改的資料，需另外處理衝突。</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button type="button" className={button} disabled={blocked} onClick={() => restore(true)}>檢查與預覽</button>
            {report && <button type="button" className={button} disabled={blocked} onClick={() => restore(false)}>確認還原</button>}
          </div>
          {report && <div className="mt-3 space-y-1" role="status">
            <p>將新增：{report.addedPatients} 位病童、{report.addedMeasurements} 筆量測；跳過相同紀錄：{report.skipped} 筆。</p>
            <p>新舊欄位補齊／換算：{report.normalized} 筆；建立者重新對應：{report.mappedCreators} 筆。</p>
            <p>欄位補齊沿用既有資料庫規則；備份檔仍保留原始值。正式還原會重新檢查資料。</p>
          </div>}
        </div>}
        {message && <p role="status" className="mt-3 text-sm text-green-700">{message}</p>}
        {error && <p role="alert" className="mt-3 whitespace-pre-wrap text-sm text-red-700">{error}</p>}
      </div>
    </section>
  )
}
