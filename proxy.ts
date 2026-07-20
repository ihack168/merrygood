import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
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

          supabaseResponse = NextResponse.next({
            request,
          })

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data } = await supabase.auth.getClaims()
  const isLoggedIn = Boolean(data?.claims)

  const pathname = request.nextUrl.pathname
  const isGrowthRoute =
    pathname === "/growth" || pathname.startsWith("/growth/")

  const isLoginRoute = pathname === "/growth/login"

  // 沒登入卻進入生長系統，自動送到登入頁
  if (isGrowthRoute && !isLoginRoute && !isLoggedIn) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/growth/login"
    loginUrl.search = ""

    const redirectResponse = NextResponse.redirect(loginUrl)

    supabaseResponse.cookies.getAll().forEach(
      ({ name, value, ...options }) => {
        redirectResponse.cookies.set(name, value, options)
      }
    )

    return redirectResponse
  }

  // 已登入又打開登入頁，自動送回生長系統
  if (isLoginRoute && isLoggedIn) {
    const growthUrl = request.nextUrl.clone()
    growthUrl.pathname = "/growth"
    growthUrl.search = ""

    const redirectResponse = NextResponse.redirect(growthUrl)

    supabaseResponse.cookies.getAll().forEach(
      ({ name, value, ...options }) => {
        redirectResponse.cookies.set(name, value, options)
      }
    )

    return redirectResponse
  }

  return supabaseResponse
}