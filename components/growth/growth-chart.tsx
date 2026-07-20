"use client"

import { useMemo } from "react"

import type {
  GrowthMetric,
  GrowthReferencePoint,
  Measurement,
} from "@/components/growth/types"

type GrowthChartProps = {
  metric: GrowthMetric
  measurements: Measurement[]
  referenceData: GrowthReferencePoint[]
}

type ChartPoint = {
  month: number
  value: number
}

const chartWidth = 900
const chartHeight = 440

const padding = {
  top: 28,
  right: 34,
  bottom: 54,
  left: 68,
}

const percentileKeys = ["p3", "p15", "p50", "p85", "p97"] as const

const percentileLabels: Record<(typeof percentileKeys)[number], string> = {
  p3: "P3",
  p15: "P15",
  p50: "P50",
  p85: "P85",
  p97: "P97",
}

const percentileStyles: Record<
  (typeof percentileKeys)[number],
  {
    stroke: string
    strokeWidth: number
    dash?: string
  }
> = {
  p3: {
    stroke: "#94a3b8",
    strokeWidth: 1.5,
    dash: "5 5",
  },
  p15: {
    stroke: "#64748b",
    strokeWidth: 1.5,
    dash: "5 5",
  },
  p50: {
    stroke: "#0ea5e9",
    strokeWidth: 2.5,
  },
  p85: {
    stroke: "#64748b",
    strokeWidth: 1.5,
    dash: "5 5",
  },
  p97: {
    stroke: "#94a3b8",
    strokeWidth: 1.5,
    dash: "5 5",
  },
}

function getMetricInformation(metric: GrowthMetric) {
  switch (metric) {
    case "height":
      return {
        title: "身高生長曲線",
        unit: "cm",
        value: (measurement: Measurement) => measurement.height,
      }

    case "weight":
      return {
        title: "體重生長曲線",
        unit: "kg",
        value: (measurement: Measurement) => measurement.weight,
      }

    case "bmi":
      return {
        title: "BMI 生長曲線",
        unit: "kg/m²",
        value: (measurement: Measurement) => measurement.bmi,
      }

    case "headCircumference":
      return {
        title: "頭圍生長曲線",
        unit: "cm",
        value: (measurement: Measurement) =>
          measurement.headCircumference,
      }
  }
}

function createPath(
  points: ChartPoint[],
  scaleX: (month: number) => number,
  scaleY: (value: number) => number,
) {
  if (points.length === 0) {
    return ""
  }

  return points
    .map((point, index) => {
      const command = index === 0 ? "M" : "L"
      return `${command} ${scaleX(point.month)} ${scaleY(point.value)}`
    })
    .join(" ")
}

function formatMonth(month: number) {
  if (month < 12) {
    return `${month}月`
  }

  const years = Math.floor(month / 12)
  const remainingMonths = month % 12

  if (remainingMonths === 0) {
    return `${years}歲`
  }

  return `${years}歲${remainingMonths}月`
}

export function GrowthChart({
  metric,
  measurements,
  referenceData,
}: GrowthChartProps) {
  const metricInformation = getMetricInformation(metric)

  const patientPoints = useMemo(() => {
    return measurements
      .map((measurement) => {
        const value = metricInformation.value(measurement)

        if (value === null || !Number.isFinite(value)) {
          return null
        }

        return {
          month: measurement.ageMonths,
          value,
        }
      })
      .filter((point): point is ChartPoint => point !== null)
      .sort((a, b) => a.month - b.month)
  }, [measurements, metricInformation])

  const allMonths = [
    ...referenceData.map((item) => item.month),
    ...patientPoints.map((item) => item.month),
  ]

  const allValues = [
    ...referenceData.flatMap((item) => [
      item.p3,
      item.p15,
      item.p50,
      item.p85,
      item.p97,
    ]),
    ...patientPoints.map((item) => item.value),
  ].filter(Number.isFinite)

  const maximumMonth = Math.max(84, ...allMonths, 1)
  const minimumMonth = Math.min(0, ...allMonths, 0)

  const rawMinimumValue = allValues.length > 0 ? Math.min(...allValues) : 0
  const rawMaximumValue = allValues.length > 0 ? Math.max(...allValues) : 100

  const valuePadding = Math.max(
    (rawMaximumValue - rawMinimumValue) * 0.08,
    1,
  )

  const minimumValue = Math.max(0, rawMinimumValue - valuePadding)
  const maximumValue = rawMaximumValue + valuePadding

  const plotWidth = chartWidth - padding.left - padding.right
  const plotHeight = chartHeight - padding.top - padding.bottom

  const scaleX = (month: number) => {
    const range = maximumMonth - minimumMonth || 1

    return (
      padding.left + ((month - minimumMonth) / range) * plotWidth
    )
  }

  const scaleY = (value: number) => {
    const range = maximumValue - minimumValue || 1

    return (
      padding.top +
      plotHeight -
      ((value - minimumValue) / range) * plotHeight
    )
  }

  const patientPath = createPath(patientPoints, scaleX, scaleY)

  const xTicks = Array.from({ length: 8 }, (_, index) => {
    return Math.round((maximumMonth / 7) * index)
  })

  const yTicks = Array.from({ length: 6 }, (_, index) => {
    return minimumValue + ((maximumValue - minimumValue) / 5) * index
  })

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-5">
        <div>
          <p className="text-sm font-medium text-sky-700">生長趨勢</p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            {metricInformation.title}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-2">
            <span className="h-0.5 w-6 bg-sky-500" />
            P50
          </span>

          <span className="flex items-center gap-2">
            <span className="h-0.5 w-6 bg-slate-500" />
            其他百分位
          </span>

          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500" />
            病童量測
          </span>
        </div>
      </div>

      {referenceData.length === 0 ? (
        <div className="border-b border-amber-200 bg-amber-50 px-6 py-3 text-sm text-amber-800">
          國健署正式曲線資料尚未匯入。目前只顯示病童自己的歷史量測趨勢。
        </div>
      ) : null}

      <div className="overflow-x-auto p-4 sm:p-6">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          role="img"
          aria-label={metricInformation.title}
          className="min-w-[760px]"
        >
          <rect
            x={padding.left}
            y={padding.top}
            width={plotWidth}
            height={plotHeight}
            fill="#ffffff"
            stroke="#e2e8f0"
          />

          {yTicks.map((tick) => {
            const y = scaleY(tick)

            return (
              <g key={`y-${tick}`}>
                <line
                  x1={padding.left}
                  x2={chartWidth - padding.right}
                  y1={y}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />

                <text
                  x={padding.left - 12}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="12"
                  fill="#64748b"
                >
                  {tick.toFixed(metric === "weight" || metric === "bmi" ? 1 : 0)}
                </text>
              </g>
            )
          })}

          {xTicks.map((tick) => {
            const x = scaleX(tick)

            return (
              <g key={`x-${tick}`}>
                <line
                  x1={x}
                  x2={x}
                  y1={padding.top}
                  y2={chartHeight - padding.bottom}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />

                <text
                  x={x}
                  y={chartHeight - padding.bottom + 24}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#64748b"
                >
                  {formatMonth(tick)}
                </text>
              </g>
            )
          })}

          <text
            x={18}
            y={chartHeight / 2}
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="#475569"
            transform={`rotate(-90 18 ${chartHeight / 2})`}
          >
            {metricInformation.unit}
          </text>

          <text
            x={padding.left + plotWidth / 2}
            y={chartHeight - 10}
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="#475569"
          >
            實際年齡
          </text>

          {percentileKeys.map((percentileKey) => {
            const points = referenceData.map((item) => ({
              month: item.month,
              value: item[percentileKey],
            }))

            const path = createPath(points, scaleX, scaleY)
            const style = percentileStyles[percentileKey]
            const lastPoint = points.at(-1)

            if (!path || !lastPoint) {
              return null
            }

            return (
              <g key={percentileKey}>
                <path
                  d={path}
                  fill="none"
                  stroke={style.stroke}
                  strokeWidth={style.strokeWidth}
                  strokeDasharray={style.dash}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <text
                  x={scaleX(lastPoint.month) - 4}
                  y={scaleY(lastPoint.value) - 6}
                  textAnchor="end"
                  fontSize="11"
                  fontWeight="700"
                  fill={style.stroke}
                >
                  {percentileLabels[percentileKey]}
                </text>
              </g>
            )
          })}

          {patientPath ? (
            <path
              d={patientPath}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}

          {patientPoints.map((point, index) => (
            <g key={`${point.month}-${point.value}-${index}`}>
              <circle
                cx={scaleX(point.month)}
                cy={scaleY(point.value)}
                r={index === patientPoints.length - 1 ? 6 : 4}
                fill="#f43f5e"
                stroke="#ffffff"
                strokeWidth="2"
              />

              <title>
                {formatMonth(point.month)}：{point.value}
                {metricInformation.unit}
              </title>
            </g>
          ))}
        </svg>
      </div>
    </section>
  )
}