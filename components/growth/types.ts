export type Sex = "male" | "female"

export type GrowthMetric =
  | "height"
  | "weight"
  | "bmi"
  | "headCircumference"

export type Measurement = {
  id: string
  measuredAt: string
  ageMonths: number
  height: number | null
  weight: number | null
  bmi: number | null
  headCircumference: number | null
  boneAge: number | null
  note: string
}

export type Patient = {
  id: string
  medicalRecordNumber: string
  name: string
  sex: Sex
  birthDate: string
  firstVisitDate: string
  parentName: string
  parentPhone: string
  premature: boolean
  birthWeeks: number | null
  birthHeight: number | null
  birthWeight: number | null
  note: string
  measurements: Measurement[]
}

export type GrowthReferencePoint = {
  month: number
  p3: number
  p15: number
  p50: number
  p85: number
  p97: number
}