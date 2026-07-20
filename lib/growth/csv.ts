export function escapeCsv(value: unknown): string {
  if (value === null || value === undefined) {
    return ""
  }

  const text = String(value).replace(/"/g, '""')
  return `"${text}"`
}

export function arrayToCsv(
  headers: string[],
  rows: (string | number | null | undefined)[][],
): string {
  const lines: string[] = []

  lines.push(headers.map(escapeCsv).join(","))

  for (const row of rows) {
    lines.push(row.map(escapeCsv).join(","))
  }

  return lines.join("\r\n")
}

export function downloadCsv(
  filename: string,
  csv: string,
): void {
  const blob = new Blob(
    ["\ufeff" + csv],
    { type: "text/csv;charset=utf-8;" },
  )

  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = filename

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}