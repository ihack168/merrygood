import { BlogListing, getBlogMetadata, parseBlogPage } from "@/components/blog-listing"
import { blogListPath } from "@/lib/blog-list-url"
import { permanentRedirect } from "next/navigation"

export const revalidate = 3600
export const dynamicParams = true
export const runtime = "nodejs"

// Valid paths are generated and cached on first visit, then revalidated hourly.
export async function generateStaticParams() {
  return []
}

type Props = { params: Promise<{ tag: string; page: string }> }

export async function generateMetadata({ params }: Props) {
  const values = await params
  const page = parseBlogPage(values.page)
  const selectedTag = values.tag
  if (page === 1 || selectedTag === "全部") permanentRedirect(blogListPath(selectedTag, page))
  return getBlogMetadata(selectedTag, page)
}

export default async function Page({ params }: Props) {
  const values = await params
  const page = parseBlogPage(values.page)
  const selectedTag = values.tag
  if (page === 1 || selectedTag === "全部") permanentRedirect(blogListPath(selectedTag, page))
  return <BlogListing selectedTag={selectedTag} page={page} />
}
