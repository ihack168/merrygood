import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "兒童生長門診",
  description: "兒童生長、身高評估與生長發育相關資訊。",
  alternates: {
    canonical: "/child-growth-clinic",
  },
}

export default function ChildGrowthClinicPage() {
  return (
    <main>
      <h1>兒童生長門診</h1>
    </main>
  )
}