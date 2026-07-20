"use client"

import { useMemo, useState } from "react"

import boysBmiJson from "@/data/growth/boys-bmi.json"
import boysHeadCircumferenceJson from "@/data/growth/boys-head-circumference.json"
import boysHeightJson from "@/data/growth/boys-height.json"
import boysWeightJson from "@/data/growth/boys-weight.json"
import girlsBmiJson from "@/data/growth/girls-bmi.json"
import girlsHeadCircumferenceJson from "@/data/growth/girls-head-circumference.json"
import girlsHeightJson from "@/data/growth/girls-height.json"
import girlsWeightJson from "@/data/growth/girls-weight.json"

import { GrowthChart } from "@/components/growth/growth-chart"
import { MeasurementModal } from "@/components/growth/measurement-modal"
import { PatientModal } from "@/components/growth/patient-modal"
import { PatientSidebar } from "@/components/growth/patient-sidebar"

import type {
  GrowthMetric,
  GrowthReferencePoint,
  Measurement,
  Patient,
} from "@/components/growth/types"

const boysHeight = boysHeightJson as GrowthReferencePoint[]
const boysWeight = boysWeightJson as GrowthReferencePoint[]
const boysBmi = boysBmiJson as GrowthReferencePoint[]
const boysHeadCircumference =
  boysHeadCircumferenceJson as GrowthReferencePoint[]

const girlsHeight = girlsHeightJson as GrowthReferencePoint[]
const girlsWeight = girlsWeightJson as GrowthReferencePoint[]
const girlsBmi = girlsBmiJson as GrowthReferencePoint[]
const girlsHeadCircumference =
  girlsHeadCircumferenceJson as GrowthReferencePoint[]

const initialPatients: Patient[] = [
  {
    id: "patient-demo-1",
    medicalRecordNumber: "A000001",
    name: "王小明",
    sex: "male",
    birthDate: "2020-03-15",
    firstVisitDate: "2024-02-10",
    parentName: "王先生",
    parentPhone: "0912-345-678",
    premature: false,
    birthWeeks: 39,
    birthHeight: 50,
    birthWeight: 3.2,
    note: "示範病例，可在串接資料庫後移除。",
    measurements: [
      {
        id: "measurement-demo-1",
        measuredAt: "2024-02-10",
        ageMonths: 46,
        height: 103.2,
        weight: 16.4,
        bmi: 15.4,
        headCircumference: 51,
        boneAge: null,
        note: "初診量測",
      },
      {
        id: "measurement-demo-2",
        measuredAt: "2024-08-12",
        ageMonths: 52,
        height: 107.1,
        weight: 17.6,
        bmi: 15.35,
        headCircumference: 51.4,
        boneAge: null,
        note: "",
      },
      {
        id: "measurement-demo-3",
        measuredAt: "2025-02-15",
        ageMonths: 59,
        height: 111.2,
        weight: 18.8,
        bmi: 15.2,
        headCircumference: 51.8,
        boneAge: 5,
        note: "持續追蹤",
      },
    ],
  },
]

const metricOptions: {
  value: GrowthMetric
  label: string
}[] = [
  {
    value: "height",
    label: "身高",
  },
  {
    value: "weight",
    label: "體重",
  },
  {
    value: "bmi",
    label: "BMI",
  },
  {
    value: "headCircumference",
    label: "頭圍",
  },
]

function createId(prefix: string) {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function calculateAgeMonths(birthDate: string, targetDate: string) {
  const birth = new Date(`${birthDate}T00:00:00`)
  const target = new Date(`${targetDate}T00:00:00`)

  let months =
    (target.getFullYear() - birth.getFullYear()) * 12 +
    target.getMonth() -
    birth.getMonth()

  if (target.getDate() < birth.getDate()) {
    months -= 1
  }

  return Math.max(0, months)
}

function formatAge(months: number) {
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12

  return `${years} 歲 ${remainingMonths} 個月`
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(`${date}T00:00:00`))
}

function getSortedMeasurements(patient: Patient) {
  return [...patient.measurements].sort(
    (a, b) =>
      new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime(),
  )
}

function getReferenceData(patient: Patient, metric: GrowthMetric) {
  if (patient.sex === "male") {
    switch (metric) {
      case "height":
        return boysHeight

      case "weight":
        return boysWeight

      case "bmi":
        return boysBmi

      case "headCircumference":
        return boysHeadCircumference
    }
  }

  switch (metric) {
    case "height":
      return girlsHeight

    case "weight":
      return girlsWeight

    case "bmi":
      return girlsBmi

    case "headCircumference":
      return girlsHeadCircumference
  }
}

export function GrowthDashboard() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients)
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    initialPatients[0]?.id ?? null,
  )

  const [searchKeyword, setSearchKeyword] = useState("")
  const [selectedMetric, setSelectedMetric] =
    useState<GrowthMetric>("height")

  const [patientModalOpen, setPatientModalOpen] = useState(false)
  const [measurementModalOpen, setMeasurementModalOpen] = useState(false)

  const selectedPatient =
    patients.find((patient) => patient.id === selectedPatientId) ?? null

  const filteredPatients = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase()

    if (!keyword) {
      return patients
    }

    return patients.filter((patient) => {
      return [
        patient.name,
        patient.medicalRecordNumber,
        patient.parentPhone,
        patient.parentName,
      ].some((value) => value.toLowerCase().includes(keyword))
    })
  }, [patients, searchKeyword])

  function handleCreatePatient(
    input: Omit<Patient, "id" | "measurements">,
  ) {
    const duplicateRecordNumber = patients.some(
      (patient) =>
        patient.medicalRecordNumber === input.medicalRecordNumber,
    )

    if (duplicateRecordNumber) {
      window.alert("此病歷號已存在，請確認後再輸入。")
      return
    }

    const patient: Patient = {
      ...input,
      id: createId("patient"),
      measurements: [],
    }

    setPatients((current) => [patient, ...current])
    setSelectedPatientId(patient.id)
    setPatientModalOpen(false)
  }

  function handleCreateMeasurement(
    input: Omit<Measurement, "id">,
  ) {
    if (!selectedPatient) {
      return
    }

    const measurement: Measurement = {
      ...input,
      id: createId("measurement"),
    }

    setPatients((current) =>
      current.map((patient) => {
        if (patient.id !== selectedPatient.id) {
          return patient
        }

        return {
          ...patient,
          measurements: [...patient.measurements, measurement],
        }
      }),
    )

    setMeasurementModalOpen(false)
  }

  function handleDeleteMeasurement(measurementId: string) {
    if (!selectedPatient) {
      return
    }

    const confirmed = window.confirm("確定要刪除這筆量測紀錄嗎？")

    if (!confirmed) {
      return
    }

    setPatients((current) =>
      current.map((patient) => {
        if (patient.id !== selectedPatient.id) {
          return patient
        }

        return {
          ...patient,
          measurements: patient.measurements.filter(
            (measurement) => measurement.id !== measurementId,
          ),
        }
      }),
    )
  }

  const sortedMeasurements = selectedPatient
    ? getSortedMeasurements(selectedPatient)
    : []

  const latestMeasurement = sortedMeasurements[0] ?? null
  const previousMeasurement = sortedMeasurements[1] ?? null

  const currentAgeMonths = selectedPatient
    ? calculateAgeMonths(
        selectedPatient.birthDate,
        new Date().toISOString().slice(0, 10),
      )
    : 0

  const referenceData = selectedPatient
    ? getReferenceData(selectedPatient, selectedMetric)
    : []

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold text-sky-700">
              兒童健康管理
            </p>

            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              兒童生長曲線追蹤系統
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              管理病例、歷史量測及國健署兒童生長曲線。
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setPatientModalOpen(true)}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              新增病例
            </button>

            <button
              type="button"
              disabled={!selectedPatient}
              onClick={() => setMeasurementModalOpen(true)}
              className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              新增量測
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:px-8">
        <PatientSidebar
          patients={filteredPatients}
          selectedPatientId={selectedPatientId}
          searchKeyword={searchKeyword}
          onSearchKeywordChange={setSearchKeyword}
          onSelectPatient={setSelectedPatientId}
          onOpenPatientModal={() => setPatientModalOpen(true)}
        />

        {!selectedPatient ? (
          <section className="flex min-h-[600px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <div>
              <p className="text-xl font-bold text-slate-800">
                尚未選擇病例
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                請從左側選擇既有病例，或建立新的病例。
              </p>
            </div>
          </section>
        ) : (
          <div className="min-w-0 space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-black text-slate-900">
                      {selectedPatient.name}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        selectedPatient.sex === "male"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {selectedPatient.sex === "male" ? "男童" : "女童"}
                    </span>

                    {selectedPatient.premature ? (
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                        早產兒
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    病歷號：{selectedPatient.medicalRecordNumber}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setMeasurementModalOpen(true)}
                  className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  新增本次量測
                </button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <InformationItem
                  label="出生日期"
                  value={formatDate(selectedPatient.birthDate)}
                />

                <InformationItem
                  label="目前年齡"
                  value={formatAge(currentAgeMonths)}
                />

                <InformationItem
                  label="家長姓名"
                  value={selectedPatient.parentName || "未填寫"}
                />

                <InformationItem
                  label="家長電話"
                  value={selectedPatient.parentPhone || "未填寫"}
                />

                <InformationItem
                  label="出生週數"
                  value={
                    selectedPatient.birthWeeks
                      ? `${selectedPatient.birthWeeks} 週`
                      : "未填寫"
                  }
                />

                <InformationItem
                  label="出生身高"
                  value={
                    selectedPatient.birthHeight
                      ? `${selectedPatient.birthHeight} cm`
                      : "未填寫"
                  }
                />

                <InformationItem
                  label="出生體重"
                  value={
                    selectedPatient.birthWeight
                      ? `${selectedPatient.birthWeight} kg`
                      : "未填寫"
                  }
                />

                <InformationItem
                  label="初診日期"
                  value={
                    selectedPatient.firstVisitDate
                      ? formatDate(selectedPatient.firstVisitDate)
                      : "未填寫"
                  }
                />
              </div>

              {selectedPatient.note ? (
                <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
                  {selectedPatient.note}
                </div>
              ) : null}
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <SummaryCard
                label="最新身高"
                value={
                  latestMeasurement?.height !== null &&
                  latestMeasurement?.height !== undefined
                    ? `${latestMeasurement.height} cm`
                    : "尚無資料"
                }
                comparison={getDifference(
                  latestMeasurement?.height,
                  previousMeasurement?.height,
                  "cm",
                )}
              />

              <SummaryCard
                label="最新體重"
                value={
                  latestMeasurement?.weight !== null &&
                  latestMeasurement?.weight !== undefined
                    ? `${latestMeasurement.weight} kg`
                    : "尚無資料"
                }
                comparison={getDifference(
                  latestMeasurement?.weight,
                  previousMeasurement?.weight,
                  "kg",
                )}
              />

              <SummaryCard
                label="最新 BMI"
                value={
                  latestMeasurement?.bmi !== null &&
                  latestMeasurement?.bmi !== undefined
                    ? String(latestMeasurement.bmi)
                    : "尚無資料"
                }
              />

              <SummaryCard
                label="量測紀錄"
                value={`${selectedPatient.measurements.length} 筆`}
                comparison={
                  latestMeasurement
                    ? `最近：${formatDate(latestMeasurement.measuredAt)}`
                    : "尚未建立量測紀錄"
                }
              />
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex flex-wrap gap-2">
                {metricOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedMetric(option.value)}
                    className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                      selectedMetric === option.value
                        ? "bg-sky-600 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </section>

            <GrowthChart
              metric={selectedMetric}
              measurements={selectedPatient.measurements}
              referenceData={referenceData}
            />

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <p className="text-sm font-medium text-sky-700">
                  歷史紀錄
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  歷次量測資料
                </h2>
              </div>

              {sortedMeasurements.length === 0 ? (
                <div className="p-10 text-center">
                  <p className="font-semibold text-slate-700">
                    尚無量測紀錄
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    請按下新增量測，建立第一筆紀錄。
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1050px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-6 py-4">量測日期</th>
                        <th className="px-6 py-4">實際年齡</th>
                        <th className="px-6 py-4">身高</th>
                        <th className="px-6 py-4">體重</th>
                        <th className="px-6 py-4">BMI</th>
                        <th className="px-6 py-4">頭圍</th>
                        <th className="px-6 py-4">骨齡</th>
                        <th className="px-6 py-4">備註</th>
                        <th className="px-6 py-4 text-right">操作</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {sortedMeasurements.map((measurement, index) => (
                        <tr
                          key={measurement.id}
                          className="text-slate-700 hover:bg-slate-50"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-900">
                            {formatDate(measurement.measuredAt)}

                            {index === 0 ? (
                              <span className="ml-2 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700">
                                最新
                              </span>
                            ) : null}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            {formatAge(measurement.ageMonths)}
                          </td>

                          <td className="px-6 py-4">
                            {measurement.height !== null
                              ? `${measurement.height} cm`
                              : "—"}
                          </td>

                          <td className="px-6 py-4">
                            {measurement.weight !== null
                              ? `${measurement.weight} kg`
                              : "—"}
                          </td>

                          <td className="px-6 py-4">
                            {measurement.bmi ?? "—"}
                          </td>

                          <td className="px-6 py-4">
                            {measurement.headCircumference !== null
                              ? `${measurement.headCircumference} cm`
                              : "—"}
                          </td>

                          <td className="px-6 py-4">
                            {measurement.boneAge !== null
                              ? `${measurement.boneAge} 歲`
                              : "—"}
                          </td>

                          <td className="max-w-[260px] px-6 py-4 text-slate-500">
                            {measurement.note || "—"}
                          </td>

                          <td className="px-6 py-4 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteMeasurement(measurement.id)
                              }
                              className="rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                            >
                              刪除
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        )}
      </div>

      <PatientModal
        open={patientModalOpen}
        onClose={() => setPatientModalOpen(false)}
        onSubmit={handleCreatePatient}
      />

      <MeasurementModal
        open={measurementModalOpen}
        patient={selectedPatient}
        onClose={() => setMeasurementModalOpen(false)}
        onSubmit={handleCreateMeasurement}
      />
    </main>
  )
}

function InformationItem({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-2 font-semibold text-slate-800">{value}</p>
    </div>
  )
}

function SummaryCard({
  label,
  value,
  comparison,
}: {
  label: string
  value: string
  comparison?: string
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>

      <p className="mt-3 text-2xl font-black text-slate-900">{value}</p>

      {comparison ? (
        <p className="mt-2 text-xs leading-5 text-slate-500">
          {comparison}
        </p>
      ) : null}
    </div>
  )
}

function getDifference(
  latest: number | null | undefined,
  previous: number | null | undefined,
  unit: string,
) {
  if (
    latest === null ||
    latest === undefined ||
    previous === null ||
    previous === undefined
  ) {
    return "尚無前次資料可比較"
  }

  const difference = Number((latest - previous).toFixed(2))

  if (difference === 0) {
    return `與前次相同`
  }

  return `較前次${difference > 0 ? "增加" : "減少"} ${Math.abs(
    difference,
  )} ${unit}`
}