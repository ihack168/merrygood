/**
 * 國民健康署兒童生長標準原始資料。
 *
 * 資料來源：
 * 「兒童生長曲線摺頁之圖表原始數據.ods」
 *
 * 注意：
 * 1. 身高與體重提供 P3、P15、P50、P85、P97。
 * 2. BMI 官方資料不是五條百分位曲線，而是過輕、過重、肥胖界線。
 * 3. month 使用實足月齡；出生為 0，1 歲為 12，7 歲為 84。
 */

export type BiologicalSex = "male" | "female"

export type GrowthMetric = "height" | "weight"

export type GrowthPercentile =
  | "p3"
  | "p15"
  | "p50"
  | "p85"
  | "p97"

export type GrowthCurvePoint = {
  month: number
  value: number
}

export type GrowthCurveSet = Record<
  GrowthPercentile,
  GrowthCurvePoint[]
>

export type BmiStandardPoint = {
  month: number
  underweightBelow: number
  overweightAtOrAbove: number
  obeseAtOrAbove: number
}

export const HPA_MIN_MONTH = 0
export const HPA_MAX_MONTH = 204
export const HPA_CHILD_CHART_MAX_MONTH = 84

export const hpaGrowthData: Record<
  BiologicalSex,
  Record<GrowthMetric, GrowthCurveSet>
> = {
  male: {
    height: {
      p3: [
        { month: 0, value: 46.3 },
        { month: 6, value: 63.6 },
        { month: 12, value: 71.3 },
        { month: 18, value: 77.2 },
        { month: 24, value: 82.1 },
        { month: 30, value: 85.5 },
        { month: 36, value: 89.1 },
        { month: 42, value: 92.4 },
        { month: 48, value: 95.4 },
        { month: 54, value: 98.4 },
        { month: 60, value: 101.2 },
        { month: 66, value: 103.9 },
        { month: 72, value: 106.5 },
        { month: 78, value: 109.2 },
        { month: 84, value: 111.8 },
        { month: 96, value: 117 },
        { month: 108, value: 121.8 },
        { month: 120, value: 126 },
        { month: 132, value: 130.5 },
        { month: 144, value: 135.6 },
        { month: 156, value: 141.9 },
        { month: 168, value: 149.3 },
        { month: 180, value: 155.5 },
        { month: 192, value: 159.3 },
        { month: 204, value: 160.9 },
      ],
      p15: [
        { month: 0, value: 47.9 },
        { month: 6, value: 65.4 },
        { month: 12, value: 73.3 },
        { month: 18, value: 79.5 },
        { month: 24, value: 84.6 },
        { month: 30, value: 88.4 },
        { month: 36, value: 92.2 },
        { month: 42, value: 95.7 },
        { month: 48, value: 99 },
        { month: 54, value: 102.1 },
        { month: 60, value: 105.2 },
        { month: 66, value: 107.9 },
        { month: 72, value: 110.5 },
        { month: 78, value: 113.2 },
        { month: 84, value: 115.8 },
        { month: 96, value: 121.3 },
        { month: 108, value: 126 },
        { month: 120, value: 130.5 },
        { month: 132, value: 135.6 },
        { month: 144, value: 141.1 },
        { month: 156, value: 148.5 },
        { month: 168, value: 156.3 },
        { month: 180, value: 161.3 },
        { month: 192, value: 164 },
        { month: 204, value: 165.5 },
      ],
      p50: [
        { month: 0, value: 49.9 },
        { month: 6, value: 67.6 },
        { month: 12, value: 75.7 },
        { month: 18, value: 82.3 },
        { month: 24, value: 87.8 },
        { month: 30, value: 91.9 },
        { month: 36, value: 96.1 },
        { month: 42, value: 99.9 },
        { month: 48, value: 103.5 },
        { month: 54, value: 106.7 },
        { month: 60, value: 110 },
        { month: 66, value: 112.8 },
        { month: 72, value: 115.6 },
        { month: 78, value: 118.4 },
        { month: 84, value: 121.2 },
        { month: 96, value: 126.8 },
        { month: 108, value: 131.8 },
        { month: 120, value: 136.5 },
        { month: 132, value: 142 },
        { month: 144, value: 148.8 },
        { month: 156, value: 156.9 },
        { month: 168, value: 163.7 },
        { month: 180, value: 167.6 },
        { month: 192, value: 170 },
        { month: 204, value: 171.5 },
      ],
      p85: [
        { month: 0, value: 51.8 },
        { month: 6, value: 69.8 },
        { month: 12, value: 78.2 },
        { month: 18, value: 85.1 },
        { month: 24, value: 91 },
        { month: 30, value: 95.5 },
        { month: 36, value: 99.9 },
        { month: 42, value: 104 },
        { month: 48, value: 107.7 },
        { month: 54, value: 111.2 },
        { month: 60, value: 114.8 },
        { month: 66, value: 117.7 },
        { month: 72, value: 120.6 },
        { month: 78, value: 123.6 },
        { month: 84, value: 126.5 },
        { month: 96, value: 132.2 },
        { month: 108, value: 137.5 },
        { month: 120, value: 142.8 },
        { month: 132, value: 149.4 },
        { month: 144, value: 157.1 },
        { month: 156, value: 164.9 },
        { month: 168, value: 170.8 },
        { month: 180, value: 173.9 },
        { month: 192, value: 175.8 },
        { month: 204, value: 176.8 },
      ],
      p97: [
        { month: 0, value: 53.4 },
        { month: 6, value: 71.6 },
        { month: 12, value: 80.2 },
        { month: 18, value: 87.3 },
        { month: 24, value: 93.6 },
        { month: 30, value: 98.3 },
        { month: 36, value: 103.1 },
        { month: 42, value: 107.3 },
        { month: 48, value: 111.2 },
        { month: 54, value: 115 },
        { month: 60, value: 118.7 },
        { month: 66, value: 121.8 },
        { month: 72, value: 124.9 },
        { month: 78, value: 128.1 },
        { month: 84, value: 131.2 },
        { month: 96, value: 137.2 },
        { month: 108, value: 142.5 },
        { month: 120, value: 148.3 },
        { month: 132, value: 156.1 },
        { month: 144, value: 164.4 },
        { month: 156, value: 171 },
        { month: 168, value: 176 },
        { month: 180, value: 179 },
        { month: 192, value: 180.5 },
        { month: 204, value: 181.5 },
      ],
    },
    weight: {
      p3: [
        { month: 0, value: 2.5 },
        { month: 6, value: 6.4 },
        { month: 12, value: 7.8 },
        { month: 18, value: 8.9 },
        { month: 24, value: 9.8 },
        { month: 30, value: 10.7 },
        { month: 36, value: 11.4 },
        { month: 42, value: 12.2 },
        { month: 48, value: 12.9 },
        { month: 54, value: 13.6 },
        { month: 60, value: 14.3 },
        { month: 66, value: 15.3 },
        { month: 72, value: 16.3 },
        { month: 78, value: 17.4 },
        { month: 84, value: 18.4 },
        { month: 96, value: 20.3 },
        { month: 108, value: 22.1 },
        { month: 120, value: 24 },
        { month: 132, value: 26.3 },
        { month: 144, value: 29.3 },
        { month: 156, value: 32.8 },
        { month: 168, value: 38 },
        { month: 180, value: 43 },
        { month: 192, value: 46.8 },
        { month: 204, value: 49.3 },
      ],
      p15: [
        { month: 0, value: 2.9 },
        { month: 6, value: 7.1 },
        { month: 12, value: 8.6 },
        { month: 18, value: 9.7 },
        { month: 24, value: 10.8 },
        { month: 30, value: 11.8 },
        { month: 36, value: 12.7 },
        { month: 42, value: 13.5 },
        { month: 48, value: 14.3 },
        { month: 54, value: 15.2 },
        { month: 60, value: 16 },
        { month: 66, value: 17.1 },
        { month: 72, value: 18.2 },
        { month: 78, value: 19.3 },
        { month: 84, value: 20.4 },
        { month: 96, value: 22.7 },
        { month: 108, value: 24.8 },
        { month: 120, value: 26.9 },
        { month: 132, value: 29.6 },
        { month: 144, value: 33.1 },
        { month: 156, value: 38 },
        { month: 168, value: 44 },
        { month: 180, value: 49 },
        { month: 192, value: 52 },
        { month: 204, value: 54 },
      ],
      p50: [
        { month: 0, value: 3.3 },
        { month: 6, value: 7.9 },
        { month: 12, value: 9.6 },
        { month: 18, value: 10.9 },
        { month: 24, value: 12.2 },
        { month: 30, value: 13.3 },
        { month: 36, value: 14.3 },
        { month: 42, value: 15.3 },
        { month: 48, value: 16.3 },
        { month: 54, value: 17.3 },
        { month: 60, value: 18.3 },
        { month: 66, value: 19.6 },
        { month: 72, value: 20.9 },
        { month: 78, value: 22.3 },
        { month: 84, value: 23.6 },
        { month: 96, value: 26.3 },
        { month: 108, value: 28.8 },
        { month: 120, value: 31.5 },
        { month: 132, value: 35.3 },
        { month: 144, value: 40.3 },
        { month: 156, value: 46.5 },
        { month: 168, value: 52.5 },
        { month: 180, value: 56.5 },
        { month: 192, value: 59 },
        { month: 204, value: 61 },
      ],
      p85: [
        { month: 0, value: 3.9 },
        { month: 6, value: 8.9 },
        { month: 12, value: 10.8 },
        { month: 18, value: 12.3 },
        { month: 24, value: 13.7 },
        { month: 30, value: 15 },
        { month: 36, value: 16.3 },
        { month: 42, value: 17.5 },
        { month: 48, value: 18.7 },
        { month: 54, value: 19.9 },
        { month: 60, value: 21.1 },
        { month: 66, value: 22.9 },
        { month: 72, value: 24.7 },
        { month: 78, value: 26.4 },
        { month: 84, value: 28.2 },
        { month: 96, value: 32.2 },
        { month: 108, value: 35.7 },
        { month: 120, value: 39.4 },
        { month: 132, value: 44.7 },
        { month: 144, value: 50.4 },
        { month: 156, value: 56.8 },
        { month: 168, value: 62.7 },
        { month: 180, value: 66.5 },
        { month: 192, value: 69 },
        { month: 204, value: 70 },
      ],
      p97: [
        { month: 0, value: 4.3 },
        { month: 6, value: 9.7 },
        { month: 12, value: 11.8 },
        { month: 18, value: 13.5 },
        { month: 24, value: 15.1 },
        { month: 30, value: 16.6 },
        { month: 36, value: 18 },
        { month: 42, value: 19.4 },
        { month: 48, value: 20.9 },
        { month: 54, value: 22.3 },
        { month: 60, value: 23.8 },
        { month: 66, value: 26.5 },
        { month: 72, value: 29.2 },
        { month: 78, value: 32 },
        { month: 84, value: 34.7 },
        { month: 96, value: 40.2 },
        { month: 108, value: 44.3 },
        { month: 120, value: 48.6 },
        { month: 132, value: 54.8 },
        { month: 144, value: 61.5 },
        { month: 156, value: 68.5 },
        { month: 168, value: 74.3 },
        { month: 180, value: 77.6 },
        { month: 192, value: 79.3 },
        { month: 204, value: 80 },
      ],
    },
  },

  female: {
    height: {
      p3: [
        { month: 0, value: 45.6 },
        { month: 6, value: 61.5 },
        { month: 12, value: 69.2 },
        { month: 18, value: 75.2 },
        { month: 24, value: 80.3 },
        { month: 30, value: 84 },
        { month: 36, value: 87.9 },
        { month: 42, value: 91.4 },
        { month: 48, value: 94.6 },
        { month: 54, value: 97.6 },
        { month: 60, value: 100.5 },
        { month: 66, value: 103 },
        { month: 72, value: 105.5 },
        { month: 78, value: 108.1 },
        { month: 84, value: 110.6 },
        { month: 96, value: 115.7 },
        { month: 108, value: 120.7 },
        { month: 120, value: 125.8 },
        { month: 132, value: 131.8 },
        { month: 144, value: 137.9 },
        { month: 156, value: 143.2 },
        { month: 168, value: 146.8 },
        { month: 180, value: 148.5 },
        { month: 192, value: 149.5 },
        { month: 204, value: 150 },
      ],
      p15: [
        { month: 0, value: 47.2 },
        { month: 6, value: 63.4 },
        { month: 12, value: 71.3 },
        { month: 18, value: 77.7 },
        { month: 24, value: 83.1 },
        { month: 30, value: 87 },
        { month: 36, value: 91.1 },
        { month: 42, value: 94.8 },
        { month: 48, value: 98.3 },
        { month: 54, value: 101.5 },
        { month: 60, value: 104.5 },
        { month: 66, value: 107.1 },
        { month: 72, value: 109.7 },
        { month: 78, value: 112.3 },
        { month: 84, value: 114.9 },
        { month: 96, value: 120.3 },
        { month: 108, value: 125.5 },
        { month: 120, value: 131 },
        { month: 132, value: 137.5 },
        { month: 144, value: 143.8 },
        { month: 156, value: 148.5 },
        { month: 168, value: 151.3 },
        { month: 180, value: 152.5 },
        { month: 192, value: 153.5 },
        { month: 204, value: 154 },
      ],
      p50: [
        { month: 0, value: 49.1 },
        { month: 6, value: 65.7 },
        { month: 12, value: 74 },
        { month: 18, value: 80.7 },
        { month: 24, value: 86.4 },
        { month: 30, value: 90.7 },
        { month: 36, value: 95.1 },
        { month: 42, value: 99 },
        { month: 48, value: 102.7 },
        { month: 54, value: 106.2 },
        { month: 60, value: 109.4 },
        { month: 66, value: 112.1 },
        { month: 72, value: 114.8 },
        { month: 78, value: 117.6 },
        { month: 84, value: 120.3 },
        { month: 96, value: 125.8 },
        { month: 108, value: 131.3 },
        { month: 120, value: 137.5 },
        { month: 132, value: 144.5 },
        { month: 144, value: 150.5 },
        { month: 156, value: 154.5 },
        { month: 168, value: 156.8 },
        { month: 180, value: 157.9 },
        { month: 192, value: 158.7 },
        { month: 204, value: 159.3 },
      ],
      p85: [
        { month: 0, value: 51.1 },
        { month: 6, value: 68.1 },
        { month: 12, value: 76.7 },
        { month: 18, value: 83.7 },
        { month: 24, value: 89.8 },
        { month: 30, value: 94.3 },
        { month: 36, value: 99 },
        { month: 42, value: 103.3 },
        { month: 48, value: 107.2 },
        { month: 54, value: 110.9 },
        { month: 60, value: 114.4 },
        { month: 66, value: 117.1 },
        { month: 72, value: 119.9 },
        { month: 78, value: 122.6 },
        { month: 84, value: 125.4 },
        { month: 96, value: 131.3 },
        { month: 108, value: 137.8 },
        { month: 120, value: 144.8 },
        { month: 132, value: 151.8 },
        { month: 144, value: 157 },
        { month: 156, value: 160.3 },
        { month: 168, value: 162.3 },
        { month: 180, value: 163.5 },
        { month: 192, value: 164.2 },
        { month: 204, value: 164.7 },
      ],
      p97: [
        { month: 0, value: 52.7 },
        { month: 6, value: 70 },
        { month: 12, value: 78.9 },
        { month: 18, value: 86.2 },
        { month: 24, value: 92.5 },
        { month: 30, value: 97.3 },
        { month: 36, value: 102.2 },
        { month: 42, value: 106.7 },
        { month: 48, value: 110.8 },
        { month: 54, value: 114.7 },
        { month: 60, value: 118.4 },
        { month: 66, value: 121.3 },
        { month: 72, value: 124.2 },
        { month: 78, value: 127.2 },
        { month: 84, value: 130.1 },
        { month: 96, value: 136.5 },
        { month: 108, value: 143.5 },
        { month: 120, value: 150.8 },
        { month: 132, value: 157.3 },
        { month: 144, value: 161.8 },
        { month: 156, value: 164.8 },
        { month: 168, value: 167 },
        { month: 180, value: 168.2 },
        { month: 192, value: 168.8 },
        { month: 204, value: 169 },
      ],
    },
    weight: {
      p3: [
        { month: 0, value: 2.4 },
        { month: 6, value: 5.8 },
        { month: 12, value: 7.1 },
        { month: 18, value: 8.2 },
        { month: 24, value: 9.2 },
        { month: 30, value: 10.1 },
        { month: 36, value: 11 },
        { month: 42, value: 11.8 },
        { month: 48, value: 12.5 },
        { month: 54, value: 13.2 },
        { month: 60, value: 14 },
        { month: 66, value: 14.9 },
        { month: 72, value: 15.9 },
        { month: 78, value: 16.8 },
        { month: 84, value: 17.8 },
        { month: 96, value: 19.6 },
        { month: 108, value: 21.5 },
        { month: 120, value: 23.8 },
        { month: 132, value: 26.5 },
        { month: 144, value: 29.8 },
        { month: 156, value: 33.5 },
        { month: 168, value: 37.1 },
        { month: 180, value: 39.3 },
        { month: 192, value: 40.5 },
        { month: 204, value: 41.5 },
      ],
      p15: [
        { month: 0, value: 2.8 },
        { month: 6, value: 6.4 },
        { month: 12, value: 7.9 },
        { month: 18, value: 9 },
        { month: 24, value: 10.1 },
        { month: 30, value: 11.2 },
        { month: 36, value: 12.1 },
        { month: 42, value: 13.1 },
        { month: 48, value: 14 },
        { month: 54, value: 14.8 },
        { month: 60, value: 15.7 },
        { month: 66, value: 16.7 },
        { month: 72, value: 17.7 },
        { month: 78, value: 18.6 },
        { month: 84, value: 19.6 },
        { month: 96, value: 21.8 },
        { month: 108, value: 24 },
        { month: 120, value: 26.6 },
        { month: 132, value: 30.3 },
        { month: 144, value: 34.8 },
        { month: 156, value: 38.7 },
        { month: 168, value: 41.7 },
        { month: 180, value: 43.8 },
        { month: 192, value: 44.8 },
        { month: 204, value: 45.2 },
      ],
      p50: [
        { month: 0, value: 3.2 },
        { month: 6, value: 7.3 },
        { month: 12, value: 8.9 },
        { month: 18, value: 10.2 },
        { month: 24, value: 11.5 },
        { month: 30, value: 12.7 },
        { month: 36, value: 13.9 },
        { month: 42, value: 15 },
        { month: 48, value: 16.1 },
        { month: 54, value: 17.2 },
        { month: 60, value: 18.2 },
        { month: 66, value: 19.4 },
        { month: 72, value: 20.5 },
        { month: 78, value: 21.7 },
        { month: 84, value: 22.8 },
        { month: 96, value: 25.4 },
        { month: 108, value: 28.2 },
        { month: 120, value: 31.8 },
        { month: 132, value: 36.9 },
        { month: 144, value: 41.7 },
        { month: 156, value: 45.4 },
        { month: 168, value: 48.1 },
        { month: 180, value: 49.6 },
        { month: 192, value: 50.5 },
        { month: 204, value: 51 },
      ],
      p85: [
        { month: 0, value: 3.7 },
        { month: 6, value: 8.3 },
        { month: 12, value: 10.2 },
        { month: 18, value: 11.6 },
        { month: 24, value: 13.1 },
        { month: 30, value: 14.5 },
        { month: 36, value: 15.9 },
        { month: 42, value: 17.3 },
        { month: 48, value: 18.6 },
        { month: 54, value: 20 },
        { month: 60, value: 21.3 },
        { month: 66, value: 22.7 },
        { month: 72, value: 24.2 },
        { month: 78, value: 25.6 },
        { month: 84, value: 27.1 },
        { month: 96, value: 30.8 },
        { month: 108, value: 35 },
        { month: 120, value: 39.8 },
        { month: 132, value: 45.5 },
        { month: 144, value: 50.1 },
        { month: 156, value: 53.5 },
        { month: 168, value: 56 },
        { month: 180, value: 57.5 },
        { month: 192, value: 58 },
        { month: 204, value: 58 },
      ],
      p97: [
        { month: 0, value: 4.2 },
        { month: 6, value: 9.2 },
        { month: 12, value: 11.3 },
        { month: 18, value: 13 },
        { month: 24, value: 14.6 },
        { month: 30, value: 16.2 },
        { month: 36, value: 17.8 },
        { month: 42, value: 19.5 },
        { month: 48, value: 21.1 },
        { month: 54, value: 22.8 },
        { month: 60, value: 24.4 },
        { month: 66, value: 26.5 },
        { month: 72, value: 28.6 },
        { month: 78, value: 30.8 },
        { month: 84, value: 32.9 },
        { month: 96, value: 37.8 },
        { month: 108, value: 42.8 },
        { month: 120, value: 47.3 },
        { month: 132, value: 52.7 },
        { month: 144, value: 57.8 },
        { month: 156, value: 61.2 },
        { month: 168, value: 63.9 },
        { month: 180, value: 65.5 },
        { month: 192, value: 66.2 },
        { month: 204, value: 66.74 },
      ],
    },
  },
}

export const hpaBmiStandards: Record<
  BiologicalSex,
  BmiStandardPoint[]
> = {
  male: [
      { month: 24, underweightBelow: 14.2, overweightAtOrAbove: 17.4, obeseAtOrAbove: 18.3 },
      { month: 30, underweightBelow: 13.9, overweightAtOrAbove: 17.2, obeseAtOrAbove: 18 },
      { month: 36, underweightBelow: 13.7, overweightAtOrAbove: 17, obeseAtOrAbove: 17.8 },
      { month: 42, underweightBelow: 13.6, overweightAtOrAbove: 16.8, obeseAtOrAbove: 17.7 },
      { month: 48, underweightBelow: 13.4, overweightAtOrAbove: 16.7, obeseAtOrAbove: 17.6 },
      { month: 54, underweightBelow: 13.3, overweightAtOrAbove: 16.7, obeseAtOrAbove: 17.6 },
      { month: 60, underweightBelow: 13.3, overweightAtOrAbove: 16.7, obeseAtOrAbove: 17.7 },
      { month: 66, underweightBelow: 13.4, overweightAtOrAbove: 16.7, obeseAtOrAbove: 18 },
      { month: 72, underweightBelow: 13.5, overweightAtOrAbove: 16.9, obeseAtOrAbove: 18.5 },
      { month: 78, underweightBelow: 13.6, overweightAtOrAbove: 17.3, obeseAtOrAbove: 19.2 },
      { month: 84, underweightBelow: 13.8, overweightAtOrAbove: 17.9, obeseAtOrAbove: 20.3 },
      { month: 96, underweightBelow: 14.1, overweightAtOrAbove: 19, obeseAtOrAbove: 21.6 },
      { month: 108, underweightBelow: 14.3, overweightAtOrAbove: 19.5, obeseAtOrAbove: 22.3 },
      { month: 120, underweightBelow: 14.5, overweightAtOrAbove: 20, obeseAtOrAbove: 22.7 },
      { month: 132, underweightBelow: 14.8, overweightAtOrAbove: 20.7, obeseAtOrAbove: 23.2 },
      { month: 144, underweightBelow: 15.2, overweightAtOrAbove: 21.3, obeseAtOrAbove: 23.9 },
      { month: 156, underweightBelow: 15.7, overweightAtOrAbove: 21.9, obeseAtOrAbove: 24.5 },
      { month: 168, underweightBelow: 16.3, overweightAtOrAbove: 22.5, obeseAtOrAbove: 25 },
      { month: 180, underweightBelow: 16.9, overweightAtOrAbove: 22.9, obeseAtOrAbove: 25.4 },
      { month: 192, underweightBelow: 17.4, overweightAtOrAbove: 23.3, obeseAtOrAbove: 25.6 },
      { month: 204, underweightBelow: 17.8, overweightAtOrAbove: 23.5, obeseAtOrAbove: 25.6 },
    ],

  female: [
      { month: 24, underweightBelow: 13.7, overweightAtOrAbove: 17.2, obeseAtOrAbove: 18.1 },
      { month: 30, underweightBelow: 13.6, overweightAtOrAbove: 17, obeseAtOrAbove: 17.9 },
      { month: 36, underweightBelow: 13.5, overweightAtOrAbove: 16.9, obeseAtOrAbove: 17.8 },
      { month: 42, underweightBelow: 13.3, overweightAtOrAbove: 16.8, obeseAtOrAbove: 17.8 },
      { month: 48, underweightBelow: 13.2, overweightAtOrAbove: 16.8, obeseAtOrAbove: 17.9 },
      { month: 54, underweightBelow: 13.1, overweightAtOrAbove: 16.9, obeseAtOrAbove: 18 },
      { month: 60, underweightBelow: 13.1, overweightAtOrAbove: 17, obeseAtOrAbove: 18.1 },
      { month: 66, underweightBelow: 13.1, overweightAtOrAbove: 17, obeseAtOrAbove: 18.3 },
      { month: 72, underweightBelow: 13.1, overweightAtOrAbove: 17.2, obeseAtOrAbove: 18.8 },
      { month: 78, underweightBelow: 13.2, overweightAtOrAbove: 17.5, obeseAtOrAbove: 19.2 },
      { month: 84, underweightBelow: 13.4, overweightAtOrAbove: 17.7, obeseAtOrAbove: 19.6 },
      { month: 96, underweightBelow: 13.8, overweightAtOrAbove: 18.4, obeseAtOrAbove: 20.7 },
      { month: 108, underweightBelow: 14, overweightAtOrAbove: 19.1, obeseAtOrAbove: 21.3 },
      { month: 120, underweightBelow: 14.3, overweightAtOrAbove: 19.7, obeseAtOrAbove: 22 },
      { month: 132, underweightBelow: 14.7, overweightAtOrAbove: 20.5, obeseAtOrAbove: 22.7 },
      { month: 144, underweightBelow: 15.2, overweightAtOrAbove: 21.3, obeseAtOrAbove: 23.5 },
      { month: 156, underweightBelow: 15.7, overweightAtOrAbove: 21.9, obeseAtOrAbove: 24.3 },
      { month: 168, underweightBelow: 16.3, overweightAtOrAbove: 22.5, obeseAtOrAbove: 24.9 },
      { month: 180, underweightBelow: 16.7, overweightAtOrAbove: 22.7, obeseAtOrAbove: 25.2 },
      { month: 192, underweightBelow: 17.1, overweightAtOrAbove: 22.7, obeseAtOrAbove: 25.3 },
      { month: 204, underweightBelow: 17.3, overweightAtOrAbove: 22.7, obeseAtOrAbove: 25.3 },
    ],
}

export function getHpaGrowthCurves(
  biologicalSex: BiologicalSex,
  metric: GrowthMetric,
): GrowthCurveSet {
  return hpaGrowthData[biologicalSex][metric]
}

export function getHpaBmiStandards(
  biologicalSex: BiologicalSex,
): BmiStandardPoint[] {
  return hpaBmiStandards[biologicalSex]
}

export function filterGrowthCurveByAge(
  curve: GrowthCurvePoint[],
  minimumMonth = HPA_MIN_MONTH,
  maximumMonth = HPA_CHILD_CHART_MAX_MONTH,
): GrowthCurvePoint[] {
  return curve.filter(
    (point) =>
      point.month >= minimumMonth &&
      point.month <= maximumMonth,
  )
}

export function filterBmiStandardsByAge(
  standards: BmiStandardPoint[],
  minimumMonth = 24,
  maximumMonth = HPA_CHILD_CHART_MAX_MONTH,
): BmiStandardPoint[] {
  return standards.filter(
    (point) =>
      point.month >= minimumMonth &&
      point.month <= maximumMonth,
  )
}

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

export function getGrowthCurveValueRange(
  curves: GrowthCurveSet,
  minimumMonth = HPA_MIN_MONTH,
  maximumMonth = HPA_CHILD_CHART_MAX_MONTH,
): {
  minimum: number
  maximum: number
} | null {
  const values = Object.values(curves).flatMap(
    (curve) =>
      filterGrowthCurveByAge(
        curve,
        minimumMonth,
        maximumMonth,
      ).map((point) => point.value),
  )

  if (values.length === 0) {
    return null
  }

  return {
    minimum: Math.min(...values),
    maximum: Math.max(...values),
  }
}