"use client"

import type { Patient } from "@/lib/growth/types"

interface PatientSearchProps {
  searchKeyword: string
  onSearchChange: (value: string) => void
  onCreatePatient: () => void
  resultCount: number
}

export default function PatientSearch({
  searchKeyword,
  onSearchChange,
  onCreatePatient,
  resultCount,
}: PatientSearchProps) {
  return (
    <div className="border-b border-slate-200 p-4">
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        搜尋病例
      </label>

      <input
        type="search"
        value={searchKeyword}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="輸入病歷號碼、姓名或電話"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />

      <p className="mt-3 text-xs text-slate-500">
        共 {resultCount} 筆結果
      </p>

      <button
        type="button"
        onClick={onCreatePatient}
        className="mt-3 w-full rounded-xl border border-blue-600 bg-white px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50"
      >
        ＋ 新增病例
      </button>
    </div>
  )
}