"use client"

import { useEffect, useMemo, useState } from "react"

import type { Measurement, Patient } from "@/components/growth/types"

type NewMeasurementInput = Omit<Measurement, "id">

type MeasurementModalProps = {
  open: boolean
  patient: Patient | null
  onClose: () => void
  onSubmit: (measurement: NewMeasurementInput) => void
}

type MeasurementForm = {
  measuredAt: string
  height: string
  weight: string
  headCircumference: string
  boneAge: string
  note: string
}

function createInitialForm(): MeasurementForm {
  return {
    measuredAt: new Date().toISOString().slice(0, 10),
    height: "",
    weight: "",
    headCircumference: "",
    boneAge: "",
    note: "",
  }
}

function calculateAgeMonths(birthDate: string, measuredAt: string) {
  if (!birthDate || !measuredAt) {
    return 0
  }

  const birth = new Date(`${birthDate}T00:00:00`)
  const measurement = new Date(`${measuredAt}T00:00:00`)

  let months =
    (measurement.getFullYear() - birth.getFullYear()) * 12 +
    measurement.getMonth() -
    birth.getMonth()

  if (measurement.getDate() < birth.getDate()) {
    months -= 1
  }

  return Math.max(0, months)
}

function parseOptionalNumber(value: string) {
  if (value.trim() === "") {
    return null
  }

  const parsed = Number(value)

  return Number.isFinite(parsed) ? parsed : null
}

function calculateBmi(height: number | null, weight: number | null) {
  if (!height || !weight || height <= 0 || weight <= 0) {
    return null
  }

  const heightInMeters = height / 100

  return Number((weight / heightInMeters ** 2).toFixed(2))
}

function formatAge(months: number) {
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12

  if (years === 0) {
    return `${remainingMonths} 個月`
  }

  return `${years} 歲 ${remainingMonths} 個月`
}

export function MeasurementModal({
  open,
  patient,
  onClose,
  onSubmit,
}: MeasurementModalProps) {
  const [form, setForm] = useState<MeasurementForm>(createInitialForm)
  const [error, setError] = useState("")

  useEffect(() => {
    if (open) {
      setForm(createInitialForm())
      setError("")
    }
  }, [open])

  const height = parseOptionalNumber(form.height)
  const weight = parseOptionalNumber(form.weight)

  const bmi = useMemo(() => {
    return calculateBmi(height, weight)
  }, [height, weight])

  const ageMonths = patient
    ? calculateAgeMonths(patient.birthDate, form.measuredAt)
    : 0

  if (!open || !patient) {
    return null
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.measuredAt) {
      setError("請選擇量測日期。")
      return
    }

    if (height === null && weight === null) {
      setError("身高與體重至少需要填寫一項。")
      return
    }

    if (new Date(form.measuredAt) < new Date(patient.birthDate)) {
      setError("量測日期不可早於出生日期。")
      return
    }

    onSubmit({
      measuredAt: form.measuredAt,
      ageMonths,
      height,
      weight,
      bmi,
      headCircumference: parseOptionalNumber(form.headCircumference),
      boneAge: parseOptionalNumber(form.boneAge),
      note: form.note.trim(),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <p className="text-sm font-medium text-sky-700">
              {patient.name}
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              新增量測紀錄
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            關閉
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="量測日期" required>
              <input
                type="date"
                value={form.measuredAt}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    measuredAt: event.target.value,
                  }))
                }
                className={inputClassName}
              />
            </Field>

            <Field label="自動計算年齡">
              <div className="flex min-h-12 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700">
                {formatAge(ageMonths)}
              </div>
            </Field>

            <Field label="身高（cm）">
              <input
                type="number"
                min="0"
                step="0.1"
                value={form.height}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    height: event.target.value,
                  }))
                }
                className={inputClassName}
              />
            </Field>

            <Field label="體重（kg）">
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.weight}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    weight: event.target.value,
                  }))
                }
                className={inputClassName}
              />
            </Field>

            <Field label="自動計算 BMI">
              <div className="flex min-h-12 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700">
                {bmi ?? "需同時輸入身高及體重"}
              </div>
            </Field>

            <Field label="頭圍（cm）">
              <input
                type="number"
                min="0"
                step="0.1"
                value={form.headCircumference}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    headCircumference: event.target.value,
                  }))
                }
                className={inputClassName}
              />
            </Field>

            <Field label="骨齡（歲）">
              <input
                type="number"
                min="0"
                step="0.1"
                value={form.boneAge}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    boneAge: event.target.value,
                  }))
                }
                className={inputClassName}
              />
            </Field>

            <div className="md:col-span-2">
              <Field label="本次量測備註">
                <textarea
                  rows={4}
                  value={form.note}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      note: event.target.value,
                    }))
                  }
                  className={inputClassName}
                />
              </Field>
            </div>
          </div>

          {error ? (
            <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <div className="mt-7 flex justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              取消
            </button>

            <button
              type="submit"
              className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700"
            >
              儲存量測紀錄
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const inputClassName =
  "min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"

function Field({
  label,
  required = false,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
        {required ? <span className="ml-1 text-rose-500">*</span> : null}
      </span>

      {children}
    </label>
  )
}