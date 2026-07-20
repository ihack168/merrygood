import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })

          response = NextResponse.next({
            request,
          })

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const isLoginPage = pathname === "/growth/login"

  // 未登入：只能進登入頁
  if (!user && !isLoginPage) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/growth/login"
    loginUrl.search = ""

    return NextResponse.redirect(loginUrl)
  }

  // 已登入：不可再次進登入頁
  if (user && isLoginPage) {
    const growthUrl = request.nextUrl.clone()
    growthUrl.pathname = "/growth"
    growthUrl.search = ""

    return NextResponse.redirect(growthUrl)
  }

  return response
}

export const config = {
  matcher: ["/growth/:path*"],
}