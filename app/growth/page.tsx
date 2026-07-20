"use client"

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react"
import { GrowthLogoutButton } from "@/components/growth-logout-button"
import { createClient } from "@/lib/supabase/client"
import {
  getHpaGrowthCurves,
  getGrowthCurveValueRange,
  type GrowthPercentile,
} from "@/lib/growth/hpa-growth-data"

type BiologicalSex = "male" | "female"

type Measurement = {
  id: string
  measuredAt: string
  height: number
  weight: number
  headCircumference?: number
  boneAge?: number
  note?: string
}

type Patient = {
  id: string
  chartNumber: string
  name: string
  biologicalSex: BiologicalSex
  birthday: string
  guardianName: string
  guardianPhone: string
  firstVisitDate: string
  premature: boolean
  gestationalWeeks?: number
  birthHeight?: number
  birthWeight?: number
  note?: string
  measurements: Measurement[]
}

type PatientFormState = {
  chartNumber: string
  name: string
  biologicalSex: BiologicalSex
  birthday: string
  guardianName: string
  guardianPhone: string
  firstVisitDate: string
  premature: boolean
  gestationalWeeks: string
  birthHeight: string
  birthWeight: string
  note: string
}

type MeasurementFormState = {
  measuredAt: string
  height: string
  weight: string
  headCircumference: string
  boneAge: string
  note: string
}

const today = new Date().toISOString().split("T")[0]

const emptyPatientForm: PatientFormState = {
  chartNumber: "",
  name: "",
  biologicalSex: "male",
  birthday: "",
  guardianName: "",
  guardianPhone: "",
  firstVisitDate: today,
  premature: false,
  gestationalWeeks: "",
  birthHeight: "",
  birthWeight: "",
  note: "",
}

const emptyMeasurementForm: MeasurementFormState = {
  measuredAt: today,
  height: "",
  weight: "",
  headCircumference: "",
  boneAge: "",
  note: "",
}

function calculateAgeDetail(
  birthday: string,
  measuredAt: string,
) {
  const birthDate = new Date(`${birthday}T00:00:00`)
  const measurementDate = new Date(`${measuredAt}T00:00:00`)

  if (
    Number.isNaN(birthDate.getTime()) ||
    Number.isNaN(measurementDate.getTime()) ||
    measurementDate < birthDate
  ) {
    return {
      years: 0,
      months: 0,
      days: 0,
      totalMonths: 0,
      decimalYears: 0,
      label: "日期錯誤",
    }
  }

  let years =
    measurementDate.getFullYear() -
    birthDate.getFullYear()

  let months =
    measurementDate.getMonth() -
    birthDate.getMonth()

  let days =
    measurementDate.getDate() -
    birthDate.getDate()

  if (days < 0) {
    months -= 1

    const previousMonthDays = new Date(
      measurementDate.getFullYear(),
      measurementDate.getMonth(),
      0,
    ).getDate()

    days += previousMonthDays
  }

  if (months < 0) {
    years -= 1
    months += 12
  }

  const totalMonths = years * 12 + months
  const diffMilliseconds =
    measurementDate.getTime() - birthDate.getTime()

  const decimalYears =
    diffMilliseconds /
    (365.2425 * 24 * 60 * 60 * 1000)

  return {
    years,
    months,
    days,
    totalMonths,
    decimalYears,
    label: `${years} 歲 ${months} 個月 ${days} 天`,
  }
}

function calculateBmi(
  heightCm: number,
  weightKg: number,
) {
  if (heightCm <= 0 || weightKg <= 0) {
    return 0
  }

  const heightMeter = heightCm / 100

  return weightKg / (heightMeter * heightMeter)
}

function formatDate(date: string) {
  if (!date) {
    return "—"
  }

  return date.replaceAll("-", "/")
}

function SummaryCard({
  label,
  value,
  unit,
  description,
}: {
  label: string
  value: string
  unit?: string
  description?: string
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <div className="mt-2 flex items-end gap-2">
        <p className="text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </p>

        {unit && (
          <span className="pb-1 text-sm font-medium text-slate-500">
            {unit}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-2 text-xs leading-5 text-slate-500">
          {description}
        </p>
      )}
    </div>
  )
}

function EmptyChart({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex min-h-[340px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
        ↗
      </div>

      <h3 className="mt-4 text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  )
}

function MeasurementChart({
  patient,
  metric,
  title,
  unit,
}: {
  patient: Patient
  metric: "height" | "weight" | "bmi"
  title: string
  unit: string
}) {
  const chartWidth = 760
  const chartHeight = 320
  const paddingLeft = 64
  const paddingRight = 28
  const paddingTop = 32
  const paddingBottom = 52

  const points = useMemo(() => {
    return patient.measurements
      .map((measurement) => {
        const age = calculateAgeDetail(
          patient.birthday,
          measurement.measuredAt,
        )

        let value = measurement.height

        if (metric === "weight") {
          value = measurement.weight
        }

        if (metric === "bmi") {
          value = calculateBmi(
            measurement.height,
            measurement.weight,
          )
        }

        return {
          ...measurement,
          ageMonths: age.totalMonths,
          ageLabel: age.label,
          value,
        }
      })
      .sort((a, b) => a.ageMonths - b.ageMonths)
  }, [patient, metric])

  if (points.length === 0) {
    return (
      <EmptyChart
        title={title}
        description="新增至少一筆量測資料後，系統會將測量點顯示於圖表上。"
      />
    )
  }

  const ageValues = points.map((point) => point.ageMonths)
  const metricValues = points.map((point) => point.value)

  const minAge = Math.max(0, Math.min(...ageValues) - 6)
  const maxAge = Math.max(
    minAge + 12,
    Math.max(...ageValues) + 6,
  )

  const rawMinValue = Math.min(...metricValues)
  const rawMaxValue = Math.max(...metricValues)

  const valuePadding = Math.max(
    (rawMaxValue - rawMinValue) * 0.35,
    metric === "height"
      ? 5
      : metric === "weight"
        ? 2
        : 1.5,
  )

  const minValue = Math.max(
    0,
    rawMinValue - valuePadding,
  )

  const maxValue = rawMaxValue + valuePadding

  const plotWidth =
    chartWidth - paddingLeft - paddingRight

  const plotHeight =
    chartHeight - paddingTop - paddingBottom

  const mapX = (ageMonths: number) => {
    return (
      paddingLeft +
      ((ageMonths - minAge) / (maxAge - minAge)) *
        plotWidth
    )
  }

  const mapY = (value: number) => {
    return (
      paddingTop +
      (1 -
        (value - minValue) /
          (maxValue - minValue)) *
        plotHeight
    )
  }

  const polylinePoints = points
    .map(
      (point) =>
        `${mapX(point.ageMonths)},${mapY(point.value)}`,
    )
    .join(" ")

  const yTicks = Array.from({ length: 6 }, (_, index) => {
    const ratio = index / 5
    const value =
      maxValue - ratio * (maxValue - minValue)

    return {
      value,
      y: paddingTop + ratio * plotHeight,
    }
  })

  const xTicks = Array.from({ length: 7 }, (_, index) => {
    const ratio = index / 6
    const month =
      minAge + ratio * (maxAge - minAge)

    return {
      month,
      x: paddingLeft + ratio * plotWidth,
    }
  })

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-bold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            目前先顯示病童歷次量測軌跡，之後再疊加國健署正式百分位曲線。
          </p>
        </div>

        <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          官方曲線尚未匯入
        </span>
      </div>

      <div className="overflow-x-auto p-4">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="min-w-[700px]"
          role="img"
          aria-label={title}
        >
          <rect
            x={paddingLeft}
            y={paddingTop}
            width={plotWidth}
            height={plotHeight}
            rx="12"
            fill="#f8fafc"
          />

          {yTicks.map((tick, index) => (
            <g key={`y-${index}`}>
              <line
                x1={paddingLeft}
                y1={tick.y}
                x2={chartWidth - paddingRight}
                y2={tick.y}
                stroke="#e2e8f0"
                strokeWidth="1"
              />

              <text
                x={paddingLeft - 12}
                y={tick.y + 4}
                textAnchor="end"
                fontSize="11"
                fill="#64748b"
              >
                {tick.value.toFixed(
                  metric === "height" ? 0 : 1,
                )}
              </text>
            </g>
          ))}

          {xTicks.map((tick, index) => (
            <g key={`x-${index}`}>
              <line
                x1={tick.x}
                y1={paddingTop}
                x2={tick.x}
                y2={chartHeight - paddingBottom}
                stroke="#e2e8f0"
                strokeWidth="1"
              />

              <text
                x={tick.x}
                y={chartHeight - paddingBottom + 24}
                textAnchor="middle"
                fontSize="11"
                fill="#64748b"
              >
                {(tick.month / 12).toFixed(1)} 歲
              </text>
            </g>
          ))}

          <text
            x={16}
            y={paddingTop + plotHeight / 2}
            textAnchor="middle"
            fontSize="11"
            fill="#64748b"
            transform={`rotate(-90 16 ${
              paddingTop + plotHeight / 2
            })`}
          >
            {unit}
          </text>

          <polyline
            points={polylinePoints}
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((point, index) => {
            const latest = index === points.length - 1

            return (
              <g key={point.id}>
                <circle
                  cx={mapX(point.ageMonths)}
                  cy={mapY(point.value)}
                  r={latest ? 7 : 5}
                  fill={latest ? "#dc2626" : "#2563eb"}
                  stroke="#ffffff"
                  strokeWidth="3"
                >
                  <title>
                    {`${formatDate(
                      point.measuredAt,
                    )}｜${point.ageLabel}｜${point.value.toFixed(
                      metric === "height" ? 1 : 2,
                    )} ${unit}`}
                  </title>
                </circle>

                {latest && (
                  <text
                    x={mapX(point.ageMonths)}
                    y={mapY(point.value) - 14}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill="#dc2626"
                  >
                    最新
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label className="mb-2 block text-sm font-semibold text-slate-700">
      {children}

      {required && (
        <span className="ml-1 text-red-500">*</span>
      )}
    </label>
  )
}

export default function GrowthChartPage() {
  const [patients, setPatients] = useState<Patient[]>([])

  const [selectedPatientId, setSelectedPatientId] =
    useState("")

  const [loadingPatients, setLoadingPatients] =
    useState(true)

  const [saving, setSaving] = useState(false)

  const [dataError, setDataError] = useState("")

  const [searchKeyword, setSearchKeyword] =
    useState("")

  const [activeChart, setActiveChart] = useState<
    "height" | "weight" | "bmi"
  >("height")

  const [showNewPatientModal, setShowNewPatientModal] =
    useState(false)

  const [editingPatientId, setEditingPatientId] =
    useState<string | null>(null)

  const [
    showMeasurementModal,
    setShowMeasurementModal,
  ] = useState(false)

  const [patientForm, setPatientForm] =
    useState<PatientFormState>(emptyPatientForm)

  const [measurementForm, setMeasurementForm] =
    useState<MeasurementFormState>(
      emptyMeasurementForm,
    )

  useEffect(() => {
    void loadPatients()
  }, [])

  async function loadPatients(preferredPatientId?: string) {
    setLoadingPatients(true)
    setDataError("")

    const supabase = createClient()
    const { data, error } = await supabase
      .from("patients")
      .select(`
        id,
        chart_number,
        name,
        biological_sex,
        birthday,
        guardian_name,
        guardian_phone,
        first_visit_date,
        premature,
        gestational_weeks,
        birth_height,
        birth_weight,
        note,
        measurements (
          id,
          measured_at,
          height,
          weight,
          head_circumference,
          bone_age,
          note
        )
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("讀取病例失敗：", error)
      setDataError(`讀取病例失敗：${error.message}`)
      setLoadingPatients(false)
      return
    }

    const mappedPatients: Patient[] = (data ?? []).map((row) => ({
      id: row.id,
      chartNumber: row.chart_number,
      name: row.name,
      biologicalSex: row.biological_sex as BiologicalSex,
      birthday: row.birthday,
      guardianName: row.guardian_name ?? "",
      guardianPhone: row.guardian_phone ?? "",
      firstVisitDate: row.first_visit_date ?? row.birthday,
      premature: row.premature ?? false,
      gestationalWeeks: row.gestational_weeks ?? undefined,
      birthHeight: row.birth_height ?? undefined,
      birthWeight: row.birth_weight ?? undefined,
      note: row.note ?? "",
      measurements: (row.measurements ?? []).map((measurement) => ({
        id: measurement.id,
        measuredAt: measurement.measured_at,
        height: Number(measurement.height),
        weight: Number(measurement.weight),
        headCircumference:
          measurement.head_circumference === null
            ? undefined
            : Number(measurement.head_circumference),
        boneAge:
          measurement.bone_age === null
            ? undefined
            : Number(measurement.bone_age),
        note: measurement.note ?? "",
      })),
    }))

    setPatients(mappedPatients)

    const targetId = preferredPatientId ?? selectedPatientId
    const targetStillExists = mappedPatients.some(
      (patient) => patient.id === targetId,
    )

    setSelectedPatientId(
      targetStillExists ? targetId : mappedPatients[0]?.id ?? "",
    )
    setLoadingPatients(false)
  }

  const selectedPatient =
    patients.find(
      (patient) => patient.id === selectedPatientId,
    ) ?? null

  const filteredPatients = useMemo(() => {
    const keyword = searchKeyword
      .trim()
      .toLowerCase()

    if (!keyword) {
      return patients
    }

    return patients.filter((patient) => {
      return (
        patient.chartNumber
          .toLowerCase()
          .includes(keyword) ||
        patient.name
          .toLowerCase()
          .includes(keyword) ||
        patient.guardianPhone
          .toLowerCase()
          .includes(keyword)
      )
    })
  }, [patients, searchKeyword])

  const sortedMeasurements = useMemo(() => {
    if (!selectedPatient) {
      return []
    }

    return [...selectedPatient.measurements].sort(
      (a, b) =>
        new Date(b.measuredAt).getTime() -
        new Date(a.measuredAt).getTime(),
    )
  }, [selectedPatient])

  const latestMeasurement =
    sortedMeasurements[0] ?? null

  const previousMeasurement =
    sortedMeasurements[1] ?? null

  const latestAge =
    selectedPatient && latestMeasurement
      ? calculateAgeDetail(
          selectedPatient.birthday,
          latestMeasurement.measuredAt,
        )
      : null

  const latestBmi = latestMeasurement
    ? calculateBmi(
        latestMeasurement.height,
        latestMeasurement.weight,
      )
    : 0

  const heightChange =
    latestMeasurement && previousMeasurement
      ? latestMeasurement.height -
        previousMeasurement.height
      : null

  const weightChange =
    latestMeasurement && previousMeasurement
      ? latestMeasurement.weight -
        previousMeasurement.weight
      : null

  function openCreatePatientModal() {
    setEditingPatientId(null)
    setPatientForm(emptyPatientForm)
    setShowNewPatientModal(true)
  }

  function openEditPatientModal(patient: Patient) {
    setEditingPatientId(patient.id)
    setPatientForm({
      chartNumber: patient.chartNumber,
      name: patient.name,
      biologicalSex: patient.biologicalSex,
      birthday: patient.birthday,
      guardianName: patient.guardianName,
      guardianPhone: patient.guardianPhone,
      firstVisitDate: patient.firstVisitDate,
      premature: patient.premature,
      gestationalWeeks:
        patient.gestationalWeeks?.toString() ?? "",
      birthHeight: patient.birthHeight?.toString() ?? "",
      birthWeight: patient.birthWeight?.toString() ?? "",
      note: patient.note,
    })
    setShowNewPatientModal(true)
  }

  function closePatientModal() {
    if (saving) return
    setShowNewPatientModal(false)
    setEditingPatientId(null)
    setPatientForm(emptyPatientForm)
  }

  async function handleSavePatient(event: FormEvent) {
    event.preventDefault()

    if (
      !patientForm.chartNumber.trim() ||
      !patientForm.name.trim() ||
      !patientForm.birthday
    ) {
      window.alert(
        "請填寫病歷號碼、病童姓名及出生日期。",
      )
      return
    }

    const duplicatedChartNumber = patients.some(
      (patient) =>
        patient.id !== editingPatientId &&
        patient.chartNumber.toLowerCase() ===
          patientForm.chartNumber.trim().toLowerCase(),
    )

    if (duplicatedChartNumber) {
      window.alert("這個病歷號碼已經存在。")
      return
    }

    setSaving(true)
    const supabase = createClient()

    const patientPayload = {
      chart_number: patientForm.chartNumber.trim(),
      name: patientForm.name.trim(),
      biological_sex: patientForm.biologicalSex,
      birthday: patientForm.birthday,
      guardian_name: patientForm.guardianName.trim() || null,
      guardian_phone: patientForm.guardianPhone.trim() || null,
      first_visit_date: patientForm.firstVisitDate || today,
      premature: patientForm.premature,
      gestational_weeks:
        patientForm.premature && patientForm.gestationalWeeks !== ""
          ? Number(patientForm.gestationalWeeks)
          : null,
      birth_height:
        patientForm.birthHeight !== ""
          ? Number(patientForm.birthHeight)
          : null,
      birth_weight:
        patientForm.birthWeight !== ""
          ? Number(patientForm.birthWeight)
          : null,
      note: patientForm.note.trim() || null,
    }

    const result = editingPatientId
      ? await supabase
          .from("patients")
          .update(patientPayload)
          .eq("id", editingPatientId)
          .select("id")
          .single()
      : await supabase
          .from("patients")
          .insert(patientPayload)
          .select("id")
          .single()

    if (result.error) {
      const action = editingPatientId ? "更新" : "建立"
      console.error(`${action}病例失敗：`, result.error)
      window.alert(`${action}病例失敗：${result.error.message}`)
      setSaving(false)
      return
    }

    const savedPatientId = result.data.id
    setSearchKeyword("")
    setPatientForm(emptyPatientForm)
    setEditingPatientId(null)
    setShowNewPatientModal(false)
    await loadPatients(savedPatientId)
    setSaving(false)
  }

  async function handleAddMeasurement(event: FormEvent) {
    event.preventDefault()

    if (!selectedPatient) {
      return
    }

    const height = Number(measurementForm.height)
    const weight = Number(measurementForm.weight)

    if (
      !measurementForm.measuredAt ||
      !Number.isFinite(height) ||
      !Number.isFinite(weight) ||
      height <= 0 ||
      weight <= 0
    ) {
      window.alert(
        "請正確填寫測量日期、身高與體重。",
      )
      return
    }

    const measurementDate = new Date(
      `${measurementForm.measuredAt}T00:00:00`,
    )

    const birthdayDate = new Date(
      `${selectedPatient.birthday}T00:00:00`,
    )

    if (measurementDate < birthdayDate) {
      window.alert(
        "測量日期不可以早於出生日期。",
      )
      return
    }

    setSaving(true)
    const supabase = createClient()

    const { error } = await supabase
      .from("measurements")
      .insert({
        patient_id: selectedPatient.id,
        measured_at: measurementForm.measuredAt,
        height,
        weight,
        head_circumference:
          measurementForm.headCircumference !== ""
            ? Number(measurementForm.headCircumference)
            : null,
        bone_age:
          measurementForm.boneAge !== ""
            ? Number(measurementForm.boneAge)
            : null,
        note: measurementForm.note.trim() || null,
      })

    if (error) {
      console.error("新增量測失敗：", error)
      window.alert(`新增量測失敗：${error.message}`)
      setSaving(false)
      return
    }

    setMeasurementForm(emptyMeasurementForm)
    setShowMeasurementModal(false)
    await loadPatients(selectedPatient.id)
    setSaving(false)
  }

  async function handleDeleteMeasurement(
    measurementId: string,
  ) {
    if (!selectedPatient) {
      return
    }

    const confirmed = window.confirm(
      "確定要刪除這筆測量紀錄嗎？",
    )

    if (!confirmed) {
      return
    }

    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase
      .from("measurements")
      .delete()
      .eq("id", measurementId)

    if (error) {
      console.error("刪除量測失敗：", error)
      window.alert(`刪除量測失敗：${error.message}`)
      setSaving(false)
      return
    }

    await loadPatients(selectedPatient.id)
    setSaving(false)
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              兒童成長科診所
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              兒童生長曲線追蹤系統
            </h1>
<GrowthLogoutButton />
            <p className="mt-2 text-sm text-slate-500">
              記錄身高、體重及 BMI，並追蹤歷次生長變化。
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                openCreatePatientModal()
              }
              className="rounded-xl border border-blue-600 bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
            >
              ＋ 新增病例
            </button>

            <button
              type="button"
              disabled={!selectedPatient}
              onClick={() =>
                setShowMeasurementModal(true)
              }
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              ＋ 新增量測紀錄
            </button>
          </div>
        </div>
      </header>

      {dataError && (
        <div className="mx-auto mt-5 max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {dataError}
          </div>
        </div>
      )}

      {loadingPatients && (
        <div className="mx-auto mt-5 max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
            正在讀取病例資料…
          </div>
        </div>
      )}

      <div className="mx-auto grid max-w-[1500px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-8">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-6">
          <div className="border-b border-slate-200 p-4">
            <FieldLabel>搜尋病例</FieldLabel>

            <input
              type="search"
              value={searchKeyword}
              onChange={(event) =>
                setSearchKeyword(event.target.value)
              }
              placeholder="輸入病歷號碼、姓名或電話"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="max-h-[calc(100vh-240px)] overflow-y-auto p-2">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => {
                const active =
                  patient.id === selectedPatientId

                const latest =
                  [...patient.measurements].sort(
                    (a, b) =>
                      new Date(
                        b.measuredAt,
                      ).getTime() -
                      new Date(
                        a.measuredAt,
                      ).getTime(),
                  )[0] ?? null

                return (
                  <button
                    key={patient.id}
                    type="button"
                    onClick={() =>
                      setSelectedPatientId(patient.id)
                    }
                    className={`mb-2 w-full rounded-xl border p-4 text-left transition ${
                      active
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-slate-900">
                          {patient.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {patient.chartNumber}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          patient.biologicalSex ===
                          "male"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {patient.biologicalSex ===
                        "male"
                          ? "男"
                          : "女"}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <span>
                        {patient.measurements.length} 筆紀錄
                      </span>

                      <span>
                        {latest
                          ? formatDate(
                              latest.measuredAt,
                            )
                          : "尚未量測"}
                      </span>
                    </div>
                  </button>
                )
              })
            ) : (
              <div className="px-4 py-12 text-center">
                <p className="text-sm font-semibold text-slate-700">
                  找不到符合的病例
                </p>

                <button
                  type="button"
                  onClick={() =>
                    openCreatePatientModal()
                  }
                  className="mt-3 text-sm font-bold text-blue-600 hover:text-blue-700"
                >
                  建立新病例
                </button>
              </div>
            )}
          </div>
        </aside>

        <section className="min-w-0">
          {selectedPatient ? (
            <div className="space-y-6">
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white px-5 py-5 sm:px-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl font-bold text-slate-900">
                          {selectedPatient.name}
                        </h2>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            selectedPatient.biologicalSex ===
                            "male"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {selectedPatient.biologicalSex ===
                          "male"
                            ? "男童"
                            : "女童"}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-slate-500">
                        病歷號碼：
                        <span className="font-semibold text-slate-700">
                          {
                            selectedPatient.chartNumber
                          }
                        </span>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openEditPatientModal(selectedPatient)
                      }
                      className="w-fit rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                    >
                      編輯基本資料
                    </button>
                  </div>
                </div>

                <div className="grid gap-x-8 gap-y-5 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-4">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      出生日期
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {formatDate(
                        selectedPatient.birthday,
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      最新實際年齡
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {latestAge
                        ? latestAge.label
                        : "尚未量測"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      主要照顧者
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {selectedPatient.guardianName ||
                        "未填寫"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      聯絡電話
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {selectedPatient.guardianPhone ||
                        "未填寫"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      初診日期
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {formatDate(
                        selectedPatient.firstVisitDate,
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      是否早產
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {selectedPatient.premature
                        ? `是${
                            selectedPatient.gestationalWeeks
                              ? `，${selectedPatient.gestationalWeeks} 週`
                              : ""
                          }`
                        : "否"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      出生身高
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {selectedPatient.birthHeight
                        ? `${selectedPatient.birthHeight} cm`
                        : "未填寫"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      出生體重
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {selectedPatient.birthWeight
                        ? `${selectedPatient.birthWeight} kg`
                        : "未填寫"}
                    </p>
                  </div>
                </div>

                {selectedPatient.note && (
                  <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-6 text-slate-600 sm:px-6">
                    <span className="font-bold text-slate-800">
                      病例備註：
                    </span>
                    {selectedPatient.note}
                  </div>
                )}
              </section>

              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                  label="最新身高"
                  value={
                    latestMeasurement
                      ? latestMeasurement.height.toFixed(
                          1,
                        )
                      : "—"
                  }
                  unit="cm"
                  description={
                    heightChange !== null
                      ? `較前次 ${
                          heightChange >= 0 ? "增加" : "減少"
                        } ${Math.abs(
                          heightChange,
                        ).toFixed(1)} cm`
                      : "尚無前次紀錄可比較"
                  }
                />

                <SummaryCard
                  label="最新體重"
                  value={
                    latestMeasurement
                      ? latestMeasurement.weight.toFixed(
                          1,
                        )
                      : "—"
                  }
                  unit="kg"
                  description={
                    weightChange !== null
                      ? `較前次 ${
                          weightChange >= 0 ? "增加" : "減少"
                        } ${Math.abs(
                          weightChange,
                        ).toFixed(1)} kg`
                      : "尚無前次紀錄可比較"
                  }
                />

                <SummaryCard
                  label="最新 BMI"
                  value={
                    latestMeasurement
                      ? latestBmi.toFixed(2)
                      : "—"
                  }
                  description="之後可依國健署標準顯示 BMI 百分位區間。"
                />

                <SummaryCard
                  label="量測次數"
                  value={String(
                    selectedPatient.measurements
                      .length,
                  )}
                  unit="次"
                  description={
                    latestMeasurement
                      ? `最近量測：${formatDate(
                          latestMeasurement.measuredAt,
                        )}`
                      : "目前尚無量測紀錄"
                  }
                />
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      生長曲線
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      所有歷史量測紀錄會同時標示於曲線上。
                    </p>
                  </div>

                  <div className="flex rounded-xl bg-slate-100 p-1">
                    {[
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
                    ].map((tab) => (
                      <button
                        key={tab.value}
                        type="button"
                        onClick={() =>
                          setActiveChart(
                            tab.value as
                              | "height"
                              | "weight"
                              | "bmi",
                          )
                        }
                        className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                          activeChart === tab.value
                            ? "bg-white text-blue-700 shadow-sm"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {activeChart === "height" && (
                  <MeasurementChart
                    patient={selectedPatient}
                    metric="height"
                    title="身高－年齡生長曲線"
                    unit="cm"
                  />
                )}

                {activeChart === "weight" && (
                  <MeasurementChart
                    patient={selectedPatient}
                    metric="weight"
                    title="體重－年齡生長曲線"
                    unit="kg"
                  />
                )}

                {activeChart === "bmi" && (
                  <MeasurementChart
                    patient={selectedPatient}
                    metric="bmi"
                    title="BMI－年齡生長曲線"
                    unit="BMI"
                  />
                )}
              </section>

              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      歷次量測紀錄
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      最新紀錄顯示於最上方。
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setShowMeasurementModal(true)
                    }
                    className="w-fit rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    ＋ 新增紀錄
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1050px] text-left">
                    <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-6 py-4">
                          測量日期
                        </th>
                        <th className="px-6 py-4">
                          實際年齡
                        </th>
                        <th className="px-6 py-4">
                          身高
                        </th>
                        <th className="px-6 py-4">
                          體重
                        </th>
                        <th className="px-6 py-4">
                          BMI
                        </th>
                        <th className="px-6 py-4">
                          頭圍
                        </th>
                        <th className="px-6 py-4">
                          骨齡
                        </th>
                        <th className="px-6 py-4">
                          備註
                        </th>
                        <th className="px-6 py-4 text-right">
                          操作
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {sortedMeasurements.length >
                      0 ? (
                        sortedMeasurements.map(
                          (
                            measurement,
                            index,
                          ) => {
                            const age =
                              calculateAgeDetail(
                                selectedPatient.birthday,
                                measurement.measuredAt,
                              )

                            const bmi =
                              calculateBmi(
                                measurement.height,
                                measurement.weight,
                              )

                            return (
                              <tr
                                key={measurement.id}
                                className="hover:bg-slate-50"
                              >
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-900">
                                  {formatDate(
                                    measurement.measuredAt,
                                  )}

                                  {index === 0 && (
                                    <span className="ml-2 rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600">
                                      最新
                                    </span>
                                  )}
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                  {age.label}
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-800">
                                  {measurement.height.toFixed(
                                    1,
                                  )}{" "}
                                  cm
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-800">
                                  {measurement.weight.toFixed(
                                    1,
                                  )}{" "}
                                  kg
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                  {bmi.toFixed(2)}
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                  {measurement.headCircumference
                                    ? `${measurement.headCircumference.toFixed(
                                        1,
                                      )} cm`
                                    : "—"}
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                  {measurement.boneAge
                                    ? `${measurement.boneAge.toFixed(
                                        1,
                                      )} 歲`
                                    : "—"}
                                </td>

                                <td className="max-w-[240px] px-6 py-4 text-sm text-slate-600">
                                  {measurement.note ||
                                    "—"}
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 text-right">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDeleteMeasurement(
                                        measurement.id,
                                      )
                                    }
                                    className="text-sm font-bold text-red-600 hover:text-red-700"
                                  >
                                    刪除
                                  </button>
                                </td>
                              </tr>
                            )
                          },
                        )
                      ) : (
                        <tr>
                          <td
                            colSpan={9}
                            className="px-6 py-16 text-center text-sm text-slate-500"
                          >
                            尚無量測紀錄，請新增第一筆身高與體重資料。
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          ) : (
            <div className="flex min-h-[600px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
                ♡
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                請選擇或新增病例
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                從左側搜尋病例，或建立新的病童資料。
              </p>

              <button
                type="button"
                onClick={() =>
                  openCreatePatientModal()
                }
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
              >
                ＋ 新增病例
              </button>
            </div>
          )}
        </section>
      </div>

      {showNewPatientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingPatientId ? "編輯病例" : "新增病例"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingPatientId
                    ? "修改病童基本資料與出生資訊。"
                    : "建立病童基本資料與出生資訊。"}
                </p>
              </div>

              <button
                type="button"
                onClick={closePatientModal}
                className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-slate-500 hover:bg-slate-100"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSavePatient}
              className="p-5 sm:p-6"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel required>
                    病歷號碼／病例 ID
                  </FieldLabel>

                  <input
                    value={patientForm.chartNumber}
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        chartNumber:
                          event.target.value,
                      }))
                    }
                    placeholder="例如：C20260002"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel required>
                    病童姓名
                  </FieldLabel>

                  <input
                    value={patientForm.name}
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="輸入病童姓名"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel required>
                    生理性別
                  </FieldLabel>

                  <select
                    value={
                      patientForm.biologicalSex
                    }
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        biologicalSex:
                          event.target
                            .value as BiologicalSex,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="male">
                      男
                    </option>
                    <option value="female">
                      女
                    </option>
                  </select>
                </div>

                <div>
                  <FieldLabel required>
                    出生日期
                  </FieldLabel>

                  <input
                    type="date"
                    max={today}
                    value={patientForm.birthday}
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        birthday:
                          event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel>
                    主要照顧者姓名
                  </FieldLabel>

                  <input
                    value={
                      patientForm.guardianName
                    }
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        guardianName:
                          event.target.value,
                      }))
                    }
                    placeholder="例如：王先生"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel>
                    照顧者聯絡電話
                  </FieldLabel>

                  <input
                    type="tel"
                    value={
                      patientForm.guardianPhone
                    }
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        guardianPhone:
                          event.target.value,
                      }))
                    }
                    placeholder="例如：0912-345-678"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel>
                    初診日期
                  </FieldLabel>

                  <input
                    type="date"
                    value={
                      patientForm.firstVisitDate
                    }
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        firstVisitDate:
                          event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel>
                    是否早產
                  </FieldLabel>

                  <div className="flex h-[46px] items-center gap-4 rounded-xl border border-slate-300 px-4">
                    <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
                      <input
                        type="radio"
                        checked={
                          !patientForm.premature
                        }
                        onChange={() =>
                          setPatientForm(
                            (current) => ({
                              ...current,
                              premature: false,
                            }),
                          )
                        }
                      />
                      否
                    </label>

                    <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
                      <input
                        type="radio"
                        checked={
                          patientForm.premature
                        }
                        onChange={() =>
                          setPatientForm(
                            (current) => ({
                              ...current,
                              premature: true,
                            }),
                          )
                        }
                      />
                      是
                    </label>
                  </div>
                </div>

                {patientForm.premature && (
                  <div>
                    <FieldLabel>
                      出生週數
                    </FieldLabel>

                    <input
                      type="number"
                      min="20"
                      max="42"
                      step="0.1"
                      value={
                        patientForm.gestationalWeeks
                      }
                      onChange={(event) =>
                        setPatientForm(
                          (current) => ({
                            ...current,
                            gestationalWeeks:
                              event.target.value,
                          }),
                        )
                      }
                      placeholder="例如：35"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                )}

                <div>
                  <FieldLabel>
                    出生身高（cm）
                  </FieldLabel>

                  <input
                    type="number"
                    min="20"
                    max="80"
                    step="0.1"
                    value={
                      patientForm.birthHeight
                    }
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        birthHeight:
                          event.target.value,
                      }))
                    }
                    placeholder="例如：50"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel>
                    出生體重（kg）
                  </FieldLabel>

                  <input
                    type="number"
                    min="0.3"
                    max="10"
                    step="0.01"
                    value={
                      patientForm.birthWeight
                    }
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        birthWeight:
                          event.target.value,
                      }))
                    }
                    placeholder="例如：3.2"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FieldLabel>病例備註</FieldLabel>

                  <textarea
                    rows={4}
                    value={patientForm.note}
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        note: event.target.value,
                      }))
                    }
                    placeholder="可記錄轉診原因、主要追蹤項目或其他說明。"
                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="mt-7 flex justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={closePatientModal}
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  取消
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {saving
                    ? editingPatientId
                      ? "儲存中…"
                      : "建立中…"
                    : editingPatientId
                      ? "儲存修改"
                      : "建立病例"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showMeasurementModal && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  新增量測紀錄
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedPatient.name}・
                  {selectedPatient.chartNumber}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowMeasurementModal(false)
                }
                className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-slate-500 hover:bg-slate-100"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleAddMeasurement}
              className="p-5 sm:p-6"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel required>
                    測量日期
                  </FieldLabel>

                  <input
                    type="date"
                    max={today}
                    value={
                      measurementForm.measuredAt
                    }
                    onChange={(event) =>
                      setMeasurementForm(
                        (current) => ({
                          ...current,
                          measuredAt:
                            event.target.value,
                        }),
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel>實際年齡</FieldLabel>

                  <div className="flex min-h-[46px] items-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700">
                    {measurementForm.measuredAt
                      ? calculateAgeDetail(
                          selectedPatient.birthday,
                          measurementForm.measuredAt,
                        ).label
                      : "選擇測量日期後自動計算"}
                  </div>
                </div>

                <div>
                  <FieldLabel required>
                    身高（cm）
                  </FieldLabel>

                  <input
                    type="number"
                    min="20"
                    max="250"
                    step="0.1"
                    value={measurementForm.height}
                    onChange={(event) =>
                      setMeasurementForm(
                        (current) => ({
                          ...current,
                          height:
                            event.target.value,
                        }),
                      )
                    }
                    placeholder="例如：116.3"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel required>
                    體重（kg）
                  </FieldLabel>

                  <input
                    type="number"
                    min="0.5"
                    max="300"
                    step="0.1"
                    value={measurementForm.weight}
                    onChange={(event) =>
                      setMeasurementForm(
                        (current) => ({
                          ...current,
                          weight:
                            event.target.value,
                        }),
                      )
                    }
                    placeholder="例如：20.4"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel>
                    自動計算 BMI
                  </FieldLabel>

                  <div className="flex min-h-[46px] items-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-800">
                    {Number(
                      measurementForm.height,
                    ) > 0 &&
                    Number(
                      measurementForm.weight,
                    ) > 0
                      ? calculateBmi(
                          Number(
                            measurementForm.height,
                          ),
                          Number(
                            measurementForm.weight,
                          ),
                        ).toFixed(2)
                      : "輸入身高與體重後自動計算"}
                  </div>
                </div>

                <div>
                  <FieldLabel>
                    頭圍（cm）
                  </FieldLabel>

                  <input
                    type="number"
                    min="10"
                    max="100"
                    step="0.1"
                    value={
                      measurementForm.headCircumference
                    }
                    onChange={(event) =>
                      setMeasurementForm(
                        (current) => ({
                          ...current,
                          headCircumference:
                            event.target.value,
                        }),
                      )
                    }
                    placeholder="選填"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel>
                    骨齡（歲）
                  </FieldLabel>

                  <input
                    type="number"
                    min="0"
                    max="25"
                    step="0.1"
                    value={measurementForm.boneAge}
                    onChange={(event) =>
                      setMeasurementForm(
                        (current) => ({
                          ...current,
                          boneAge:
                            event.target.value,
                        }),
                      )
                    }
                    placeholder="例如：6.4"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FieldLabel>
                    本次量測備註
                  </FieldLabel>

                  <textarea
                    rows={4}
                    value={measurementForm.note}
                    onChange={(event) =>
                      setMeasurementForm(
                        (current) => ({
                          ...current,
                          note: event.target.value,
                        }),
                      )
                    }
                    placeholder="可記錄量測狀況、醫師觀察或其他說明。"
                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="mt-7 flex justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={() =>
                    setShowMeasurementModal(false)
                  }
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  取消
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {saving ? "儲存中…" : "儲存量測紀錄"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}