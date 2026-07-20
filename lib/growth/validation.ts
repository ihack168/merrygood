export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export function validatePatientForm(data: {
  chartNumber: string
  name: string
  birthday: string
  guardianName: string
}): ValidationResult {
  const errors: string[] = []

  if (!data.chartNumber.trim()) {
    errors.push("病歷號不可空白")
  }

  if (!data.name.trim()) {
    errors.push("姓名不可空白")
  }

  if (!data.birthday) {
    errors.push("生日不可空白")
  }

  if (!data.guardianName.trim()) {
    errors.push("監護人不可空白")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export function validateMeasurementForm(data: {
  measuredAt: string
  height: string
  weight: string
}): ValidationResult {
  const errors: string[] = []

  if (!data.measuredAt) {
    errors.push("測量日期不可空白")
  }

  const height = Number(data.height)
  if (!Number.isFinite(height) || height <= 0) {
    errors.push("身高必須大於 0")
  }

  const weight = Number(data.weight)
  if (!Number.isFinite(weight) || weight <= 0) {
    errors.push("體重必須大於 0")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}