const FALLBACK_REDIRECT = "/onboarding";

export function sanitizeInternalRedirectPath(
  value?: string | null,
  fallback = FALLBACK_REDIRECT
) {
  if (!value) {
    return fallback;
  }

  if (!value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }

  try {
    const url = new URL(value, "https://voxr.local");
    if (url.origin !== "https://voxr.local") {
      return fallback;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

export function buildAuthRedirectHref(nextPath: string) {
  const safeNextPath = sanitizeInternalRedirectPath(nextPath);
  return `/auth?next=${encodeURIComponent(safeNextPath)}`;
}
