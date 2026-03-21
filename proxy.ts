import createMiddleware from "next-intl/middleware";
import { NextResponse, NextRequest } from "next/server";
import { routing } from "@/lib/i18n/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import {
  resolveStaticSlug,
  resolveDynamicSlug,
  frenchStaticSlugs,
  marketingStaticSlugs,
} from "@/lib/i18n/slugs";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

function isMarketingPath(firstSegment: string, locale: Locale): boolean {
  if (locale === "en") {
    return marketingStaticSlugs.has(firstSegment);
  }
  // For French, check both English and French slugs (in case someone visits /fr/product)
  return marketingStaticSlugs.has(firstSegment) || frenchStaticSlugs.has(firstSegment);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static assets, API routes, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files like .ico, .png, etc.
  ) {
    return NextResponse.next();
  }

  // Extract locale from path
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  const hasLocalePrefix = locales.includes(firstSegment as Locale);

  // If there's a locale prefix, check for translated slug rewriting
  if (hasLocalePrefix) {
    const locale = firstSegment as Locale;
    const pathWithoutLocale = segments.slice(1);

    if (locale !== "en" && pathWithoutLocale.length > 0) {
      const firstPathSegment = pathWithoutLocale[0];

      // Check if this is a marketing path with potentially translated slugs
      if (isMarketingPath(firstPathSegment, locale)) {
        const resolvedStaticSlug = resolveStaticSlug(firstPathSegment, locale);
        let needsRewrite = resolvedStaticSlug !== firstPathSegment;

        const resolvedSegments = [resolvedStaticSlug];

        // If there's a dynamic slug (e.g., /fr/solutions/logiciel-feedback-anonyme)
        if (pathWithoutLocale.length > 1) {
          const dynamicSlug = pathWithoutLocale[1];
          const resolvedDynamicSlug = resolveDynamicSlug(dynamicSlug, locale);
          if (resolvedDynamicSlug !== dynamicSlug) {
            needsRewrite = true;
          }
          resolvedSegments.push(resolvedDynamicSlug);
        }

        if (needsRewrite) {
          const rewrittenPath = `/${locale}/${resolvedSegments.join("/")}`;
          const rewrittenUrl = request.nextUrl.clone();
          rewrittenUrl.pathname = rewrittenPath;

          // Run intlMiddleware on a request with the rewritten (English) path
          // so next-intl correctly detects the locale and sets its headers/cookies.
          const rewrittenRequest = new NextRequest(rewrittenUrl, request);
          const intlResponse = intlMiddleware(rewrittenRequest);

          // Create the rewrite response (browser URL stays as the French slug)
          const response = NextResponse.rewrite(rewrittenUrl, {
            headers: intlResponse.headers,
          });

          // Copy cookies set by intlMiddleware (locale cookie, etc.)
          for (const cookie of intlResponse.cookies.getAll()) {
            response.cookies.set(cookie);
          }

          return response;
        }
      }
    }
  }

  // Run next-intl middleware (handles locale detection, redirects from /)
  const intlResponse = intlMiddleware(request);

  // After intl middleware, run Supabase session update
  // We need to check if the path (after locale) is a private route
  const effectiveSegments = intlResponse.headers.get("x-middleware-rewrite")
    ? new URL(intlResponse.headers.get("x-middleware-rewrite")!, request.url).pathname.split("/").filter(Boolean)
    : pathname.split("/").filter(Boolean);

  // Determine the path without locale for auth checks
  const localeForAuth = effectiveSegments[0] as Locale;
  const pathAfterLocale = effectiveSegments.slice(1).join("/");

  const privateRoutePrefixes = ["w", "onboarding", "app", "dashboard"];
  const isPrivateRoute = privateRoutePrefixes.some(
    (route) => pathAfterLocale === route || pathAfterLocale.startsWith(`${route}/`)
  );
  const isAuthRoute = pathAfterLocale === "auth";

  if (isPrivateRoute || isAuthRoute) {
    // Run Supabase session middleware for auth-related routes
    const supabaseResponse = await updateSession(request, localeForAuth);
    if (supabaseResponse) {
      return supabaseResponse;
    }
  }

  return intlResponse;
}

export const config = {
  matcher: [
    // Match all paths except static assets
    "/((?!_next|api|.*\\..*).*)",
  ],
};
