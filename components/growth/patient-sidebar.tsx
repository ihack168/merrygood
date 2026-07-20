"use client"

import type { Patient } from "@/components/growth/types"

type PatientSidebarProps = {
  patients: Patient[]
  selectedPatientId: string | null
  searchKeyword: string
  onSearchKeywordChange: (value: string) => void
  onSelectPatient: (patientId: string) => void
  onOpenPatientModal: () => void
}

function getLatestMeasurementDate(patient: Patient) {
  const measurements = [...patient.measurements].sort(
    (a, b) =>
      new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime(),
  )

  return measurements[0]?.measuredAt ?? null
}

function formatDate(date: string | null) {
  if (!date) {
    return "尚無量測"
  }

  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date))
}

export function PatientSidebar({
  patients,
  selectedPatientId,
  searchKeyword,
  onSearchKeywordChange,
  onSelectPatient,
  onOpenPatientModal,
}: PatientSidebarProps) {
  return (
    <aside className="flex min-h-[calc(100vh-120px)] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-sky-700">病例管理</p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              病患列表
            </h2>
          </div>

          <button
            type="button"
            onClick={onOpenPatientModal}
            className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            新增病例
          </button>
        </div>

        <div className="mt-4">
          <label
            htmlFor="patient-search"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            搜尋病例
          </label>

          <input
            id="patient-search"
            type="search"
            value={searchKeyword}
            onChange={(event) => onSearchKeywordChange(event.target.value)}
            placeholder="姓名、病歷號或電話"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
          />
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {patients.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center">
            <p className="font-semibold text-slate-700">找不到病例</p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              請調整搜尋條件，或建立新的病例。
            </p>
          </div>
        ) : (
          patients.map((patient) => {
            const selected = patient.id === selectedPatientId
            const latestDate = getLatestMeasurementDate(patient)

            return (
              <button
                key={patient.id}
                type="button"
                onClick={() => onSelectPatient(patient.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  selected
                    ? "border-sky-500 bg-sky-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-900">{patient.name}</p>

                    <p className="mt-1 text-xs text-slate-500">
                      病歷號：{patient.medicalRecordNumber}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      patient.sex === "male"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {patient.sex === "male" ? "男童" : "女童"}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-slate-400">最新量測</p>
                    <p className="mt-1 font-medium text-slate-700">
                      {formatDate(latestDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400">紀錄數</p>
                    <p className="mt-1 font-medium text-slate-700">
                      {patient.measurements.length} 筆
                    </p>
                  </div>
                </div>
              </button>
            )
          })
        )}
      </div>
    </aside>
  )
}