export type BiologicalSex = "male" | "female"

export interface Measurement {
  id: string
  measuredAt: string
  height: number
  weight: number
  headCircumference?: number
  boneAge?: number
  note?: string
}

export interface Patient {
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

export interface PatientFormState {
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

export interface MeasurementFormState {
  measuredAt: string
  height: string
  weight: string
  headCircumference: string
  boneAge: string
  note: string
}