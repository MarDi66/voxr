import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Public routes that don't require auth
  const publicRoutes = ["/", "/auth", "/auth/callback"];
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith("/auth/")
  );

  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    const returnTo = request.nextUrl.pathname + request.nextUrl.search;
    url.pathname = "/auth";
    url.searchParams.set("next", returnTo);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth page
  if (user && pathname === "/auth") {
    const url = request.nextUrl.clone();
    const next = request.nextUrl.searchParams.get("next") || "/onboarding";
    // Prevent open redirect — only allow relative paths
    const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/onboarding";
    const target = new URL(safeNext, request.nextUrl.origin);
    return NextResponse.redirect(target);
  }

  return supabaseResponse;
}
