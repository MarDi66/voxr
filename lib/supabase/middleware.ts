import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Locale } from "@/lib/i18n/config";

export async function updateSession(request: NextRequest, locale: Locale) {
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

  // Strip locale prefix to check route
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

  const privateRoutePrefixes = ["/w", "/onboarding", "/app", "/dashboard"];
  const isPrivateRoute = privateRoutePrefixes.some(
    (route) => pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`)
  );

  if (!user && isPrivateRoute) {
    const url = request.nextUrl.clone();
    const returnTo = request.nextUrl.pathname + request.nextUrl.search;
    url.pathname = `/${locale}/auth`;
    url.searchParams.set("next", returnTo);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth page
  if (user && pathWithoutLocale === "/auth") {
    const url = request.nextUrl.clone();
    const next = request.nextUrl.searchParams.get("next") || `/${locale}/onboarding`;
    // Prevent open redirect — only allow relative paths
    const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : `/${locale}/onboarding`;
    const target = new URL(safeNext, request.nextUrl.origin);
    return NextResponse.redirect(target);
  }

  return null; // No redirect needed, let the caller continue
}
