"use client"

import type { Patient } from "@/lib/growth/types"

interface PatientListProps {
  patients: Patient[]
  selectedPatientId: string
  onSelect: (id: string) => void
}

export default function PatientList({
  patients,
  selectedPatientId,
  onSelect,
}: PatientListProps) {
  return (
    <div className="max-h-[calc(100vh-240px)] overflow-y-auto p-2">
      {patients.map((patient) => {
        const active = patient.id === selectedPatientId
        const latest = [...patient.measurements]
          .sort((a,b)=>new Date(b.measuredAt).getTime()-new Date(a.measuredAt).getTime())[0]

        return (
          <button
            key={patient.id}
            type="button"
            onClick={() => onSelect(patient.id)}
            className={`mb-2 w-full rounded-xl border p-4 text-left transition ${
              active
                ? "border-blue-500 bg-blue-50 shadow-sm"
                : "border-transparent hover:border-slate-200 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-slate-900">{patient.name}</p>
                <p className="mt-1 text-xs text-slate-500">{patient.chartNumber}</p>
              </div>

              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                patient.biologicalSex==="male"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-rose-100 text-rose-700"
              }`}>
                {patient.biologicalSex==="male" ? "男" : "女"}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>{patient.measurements.length} 筆紀錄</span>
              <span>{latest?.measuredAt ?? "尚未量測"}</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}