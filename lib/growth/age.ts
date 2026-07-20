export interface AgeResult {
  years: number
  months: number
  days: number
  totalMonths: number
}

export function calculateAge(
  birthday: string,
  measuredAt: string = new Date().toISOString().slice(0, 10),
): AgeResult {
  const birth = new Date(birthday)
  const measure = new Date(measuredAt)

  let years = measure.getFullYear() - birth.getFullYear()
  let months = measure.getMonth() - birth.getMonth()
  let days = measure.getDate() - birth.getDate()

  if (days < 0) {
    const prevMonth = new Date(measure.getFullYear(), measure.getMonth(), 0)
    days += prevMonth.getDate()
    months--
  }

  if (months < 0) {
    months += 12
    years--
  }

  return {
    years,
    months,
    days,
    totalMonths: years * 12 + months,
  }
}

export function ageLabel(age: AgeResult): string {
  return `${age.years}歲 ${age.months}個月 ${age.days}天`
}