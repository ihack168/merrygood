export interface BMIResult {
  bmi: number
  category: string
}

export function calculateBMI(
  heightCm: number,
  weightKg: number,
): BMIResult | null {
  if (
    !Number.isFinite(heightCm) ||
    !Number.isFinite(weightKg) ||
    heightCm <= 0 ||
    weightKg <= 0
  ) {
    return null
  }

  const heightM = heightCm / 100
  const bmi = weightKg / (heightM * heightM)

  let category = "Normal"

  if (bmi < 18.5) {
    category = "Underweight"
  } else if (bmi < 24) {
    category = "Normal"
  } else if (bmi < 27) {
    category = "Overweight"
  } else if (bmi < 30) {
    category = "Mild Obesity"
  } else if (bmi < 35) {
    category = "Moderate Obesity"
  } else {
    category = "Severe Obesity"
  }

  return {
    bmi: Number(bmi.toFixed(2)),
    category,
  }
}

export function bmiText(
  heightCm: number,
  weightKg: number,
): string {
  const result = calculateBMI(heightCm, weightKg)

  if (!result) {
    return "-"
  }

  return `${result.bmi} (${result.category})`
}