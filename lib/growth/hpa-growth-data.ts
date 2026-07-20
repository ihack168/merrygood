export type BiologicalSex = "male" | "female"

export type GrowthMetric =
  | "height"
  | "weight"
  | "bmi"

export type GrowthPercentile =
  | "p3"
  | "p15"
  | "p50"
  | "p85"
  | "p97"

export type GrowthCurvePoint = {
  /**
   * 實足月齡：
   * 出生為 0，滿一歲為 12，滿七歲為 84。
   */
  month: number

  /**
   * 身高：cm
   * 體重：kg
   * BMI：kg/m²
   */
  value: number
}

export type GrowthCurveSet = Record<
  GrowthPercentile,
  GrowthCurvePoint[]
>

export type SexGrowthData = Record<
  GrowthMetric,
  GrowthCurveSet
>

export type HpaGrowthData = Record<
  BiologicalSex,
  SexGrowthData
>

/**
 * 國民健康署 0～7 歲兒童生長曲線資料。
 *
 * 注意：
 * 這裡的數值必須由國健署官方 ODS 原始資料轉入，
 * 不可以自行估算或使用假資料。
 */
export const hpaGrowthData: HpaGrowthData = {
  male: {
    height: {
      p3: [],
      p15: [],
      p50: [],
      p85: [],
      p97: [],
    },

    weight: {
      p3: [],
      p15: [],
      p50: [],
      p85: [],
      p97: [],
    },

    bmi: {
      p3: [],
      p15: [],
      p50: [],
      p85: [],
      p97: [],
    },
  },

  female: {
    height: {
      p3: [],
      p15: [],
      p50: [],
      p85: [],
      p97: [],
    },

    weight: {
      p3: [],
      p15: [],
      p50: [],
      p85: [],
      p97: [],
    },

    bmi: {
      p3: [],
      p15: [],
      p50: [],
      p85: [],
      p97: [],
    },
  },
}

/**
 * 取得指定性別與指標的五條百分位曲線。
 */
export function getHpaGrowthCurves(
  biologicalSex: BiologicalSex,
  metric: GrowthMetric,
): GrowthCurveSet {
  return hpaGrowthData[biologicalSex][metric]
}

/**
 * 將曲線限制在指定月齡範圍內。
 */
export function filterGrowthCurveByAge(
  curve: GrowthCurvePoint[],
  minimumMonth = 0,
  maximumMonth = 84,
): GrowthCurvePoint[] {
  return curve.filter(
    (point) =>
      point.month >= minimumMonth &&
      point.month <= maximumMonth,
  )
}

/**
 * 取得兩個月齡資料點之間的線性插值。
 *
 * 例如官方資料只有 12 個月與 15 個月，
 * 病童為 13.5 個月時，可計算曲線在該月齡的顯示位置。
 */
export function interpolateGrowthValue(
  curve: GrowthCurvePoint[],
  targetMonth: number,
): number | null {
  if (curve.length === 0) {
    return null
  }

  const sortedCurve = [...curve].sort(
    (a, b) => a.month - b.month,
  )

  const exactPoint = sortedCurve.find(
    (point) => point.month === targetMonth,
  )

  if (exactPoint) {
    return exactPoint.value
  }

  const firstPoint = sortedCurve[0]
  const lastPoint =
    sortedCurve[sortedCurve.length - 1]

  if (
    targetMonth < firstPoint.month ||
    targetMonth > lastPoint.month
  ) {
    return null
  }

  for (
    let index = 0;
    index < sortedCurve.length - 1;
    index += 1
  ) {
    const startPoint = sortedCurve[index]
    const endPoint = sortedCurve[index + 1]

    if (
      targetMonth > startPoint.month &&
      targetMonth < endPoint.month
    ) {
      const monthRange =
        endPoint.month - startPoint.month

      if (monthRange === 0) {
        return startPoint.value
      }

      const ratio =
        (targetMonth - startPoint.month) /
        monthRange

      return (
        startPoint.value +
        ratio *
          (endPoint.value - startPoint.value)
      )
    }
  }

  return null
}

/**
 * 取得所有曲線中的最小值與最大值，
 * 供 SVG 計算固定的 Y 軸範圍。
 */
export function getGrowthCurveValueRange(
  curves: GrowthCurveSet,
): {
  minimum: number
  maximum: number
} | null {
  const values = Object.values(curves).flatMap(
    (curve) => curve.map((point) => point.value),
  )

  if (values.length === 0) {
    return null
  }

  return {
    minimum: Math.min(...values),
    maximum: Math.max(...values),
  }
}

/**
 * 檢查指定資料是否已經匯入。
 */
export function hasHpaGrowthData(
  biologicalSex: BiologicalSex,
  metric: GrowthMetric,
): boolean {
  const curves =
    hpaGrowthData[biologicalSex][metric]

  return Object.values(curves).every(
    (curve) => curve.length > 0,
  )
}