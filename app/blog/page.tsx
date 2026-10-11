import { BlogListing, getBlogMetadata } from "@/components/blog-listing"

export const revalidate = 3600
export const runtime = "nodejs"

export async function generateMetadata() {
  return getBlogMetadata()
}

export default function BlogPage() {
  return <BlogListing />
}
