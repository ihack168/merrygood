import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { legacyBlogDestination } from "@/lib/blog-list-url"

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Blog migration runs before auth: public blog requests never call Supabase.
  if (pathname === "/blog" || pathname === "/blog/") {
    try {
      const destination = legacyBlogDestination(new URL(request.url))
      if (destination) return NextResponse.redirect(destination, 308)
      return NextResponse.next()
    } catch {
      return new NextResponse("Not Found", {
        status: 404,
        headers: { "X-Robots-Tag": "noindex", "Cache-Control": "no-store" },
      })
    }
  }

  // Preserve the original /growth authentication and cookie-refresh behavior.
  let response = NextResponse.next({ request })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  const isLoginPage = pathname === "/growth/login"
  if (!user && !isLoginPage) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/growth/login"
    loginUrl.search = ""
    return NextResponse.redirect(loginUrl)
  }
  if (user && isLoginPage) {
    const growthUrl = request.nextUrl.clone()
    growthUrl.pathname = "/growth"
    growthUrl.search = ""
    return NextResponse.redirect(growthUrl)
  }
  return response
}

export const config = {
  matcher: [
    "/growth/:path*",
    { source: "/blog", has: [{ type: "query", key: "tag" }] },
    { source: "/blog", has: [{ type: "query", key: "page" }] },
  ],
}
