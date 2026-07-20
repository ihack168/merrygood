"use client"

import { useEffect, useState } from "react"

import type { Patient, Sex } from "@/components/growth/types"

type NewPatientInput = Omit<Patient, "id" | "measurements">

type PatientModalProps = {
  open: boolean
  onClose: () => void
  onSubmit: (patient: NewPatientInput) => void
}

const initialForm: NewPatientInput = {
  medicalRecordNumber: "",
  name: "",
  sex: "male",
  birthDate: "",
  firstVisitDate: new Date().toISOString().slice(0, 10),
  parentName: "",
  parentPhone: "",
  premature: false,
  birthWeeks: null,
  birthHeight: null,
  birthWeight: null,
  note: "",
}

function parseOptionalNumber(value: string) {
  if (value.trim() === "") {
    return null
  }

  const parsed = Number(value)

  return Number.isFinite(parsed) ? parsed : null
}

export function PatientModal({
  open,
  onClose,
  onSubmit,
}: PatientModalProps) {
  const [form, setForm] = useState<NewPatientInput>(initialForm)
  const [error, setError] = useState("")

  useEffect(() => {
    if (open) {
      setForm({
        ...initialForm,
        firstVisitDate: new Date().toISOString().slice(0, 10),
      })

      setError("")
    }
  }, [open])

  if (!open) {
    return null
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (
      !form.medicalRecordNumber.trim() ||
      !form.name.trim() ||
      !form.birthDate
    ) {
      setError("病歷號、姓名及出生日期為必填欄位。")
      return
    }

    onSubmit({
      ...form,
      medicalRecordNumber: form.medicalRecordNumber.trim(),
      name: form.name.trim(),
      parentName: form.parentName.trim(),
      parentPhone: form.parentPhone.trim(),
      note: form.note.trim(),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <p className="text-sm font-medium text-sky-700">病例管理</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              新增病例
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
            <Field label="病歷號" required>
              <input
                type="text"
                value={form.medicalRecordNumber}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    medicalRecordNumber: event.target.value,
                  }))
                }
                className={inputClassName}
              />
            </Field>

            <Field label="病童姓名" required>
              <input
                type="text"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                className={inputClassName}
              />
            </Field>

            <Field label="性別" required>
              <select
                value={form.sex}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    sex: event.target.value as Sex,
                  }))
                }
                className={inputClassName}
              >
                <option value="male">男童</option>
                <option value="female">女童</option>
              </select>
            </Field>

            <Field label="出生日期" required>
              <input
                type="date"
                value={form.birthDate}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    birthDate: event.target.value,
                  }))
                }
                className={inputClassName}
              />
            </Field>

            <Field label="初診日期">
              <input
                type="date"
                value={form.firstVisitDate}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    firstVisitDate: event.target.value,
                  }))
                }
                className={inputClassName}
              />
            </Field>

            <Field label="是否早產">
              <label className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-300 px-4">
                <input
                  type="checkbox"
                  checked={form.premature}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      premature: event.target.checked,
                    }))
                  }
                  className="h-4 w-4"
                />

                <span className="text-sm text-slate-700">此病童為早產兒</span>
              </label>
            </Field>

            <Field label="出生週數">
              <input
                type="number"
                min="20"
                max="45"
                step="1"
                value={form.birthWeeks ?? ""}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    birthWeeks: parseOptionalNumber(event.target.value),
                  }))
                }
                className={inputClassName}
              />
            </Field>

            <Field label="出生身高（cm）">
              <input
                type="number"
                min="0"
                step="0.1"
                value={form.birthHeight ?? ""}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    birthHeight: parseOptionalNumber(event.target.value),
                  }))
                }
                className={inputClassName}
              />
            </Field>

            <Field label="出生體重（kg）">
              <input
                type="number"
                min="0"
                step="0.001"
                value={form.birthWeight ?? ""}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    birthWeight: parseOptionalNumber(event.target.value),
                  }))
                }
                className={inputClassName}
              />
            </Field>

            <Field label="家長姓名">
              <input
                type="text"
                value={form.parentName}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    parentName: event.target.value,
                  }))
                }
                className={inputClassName}
              />
            </Field>

            <Field label="家長電話">
              <input
                type="tel"
                value={form.parentPhone}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    parentPhone: event.target.value,
                  }))
                }
                className={inputClassName}
              />
            </Field>

            <div className="md:col-span-2">
              <Field label="病例備註">
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
              建立病例
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