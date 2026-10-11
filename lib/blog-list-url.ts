// Shared by server-rendered links and legacy query-string redirects.
export function blogListPath(tag: string, page: number): string {
  const base = tag === "全部" ? "/blog" : `/blog/tag/${encodeURIComponent(tag)}`
  return page === 1 ? base : `${base}/page/${page}`
}

export function legacyBlogDestination(url: URL): URL | null {
  if (url.pathname !== "/blog" && url.pathname !== "/blog/") return null
  const params = url.searchParams
  if (!params.has("tag") && !params.has("page")) return null
  if (params.getAll("tag").length > 1 || params.getAll("page").length > 1) {
    throw new Error("Invalid blog parameters")
  }
  const tag = params.get("tag") || "全部"
  const pageText = params.get("page") || "1"
  if (!/^[0-9]+$/.test(pageText)) throw new Error("Invalid page")
  const page = Number(pageText)
  if (!Number.isSafeInteger(page) || page < 1) throw new Error("Invalid page")
  const destination = new URL(url.toString())
  destination.pathname = blogListPath(tag, page)
  destination.searchParams.delete("tag")
  destination.searchParams.delete("page")
  return destination
}
