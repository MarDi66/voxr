# Voxr SEO + GEO Implementation

## Audit Summary

### Initial issues found
- The public site had one thin homepage and no supporting public content architecture.
- Root metadata was minimal and duplicated across the whole app.
- There was no `robots.txt` implementation, no sitemap generation, and no canonical helper.
- Private product routes such as `/auth`, `/onboarding`, and `/w/[slug]` were not explicitly marked `noindex`.
- There was no structured data for organization, website, product, articles, FAQs, or breadcrumbs.
- Internal linking across public pages did not exist because most public pages did not exist.

### Main opportunities addressed
- Build indexable public pages around high-intent anonymous employee feedback topics.
- Make public content easier for search engines and answer engines to understand, summarize, and cite.
- Keep authenticated/private routes out of search while preserving the current app architecture.

## What Changed

### Technical SEO and GEO foundation
- Added reusable site config in [lib/site-config.ts](/Users/yohannmartzolff/Documents/github/voxr/lib/site-config.ts).
- Added reusable metadata and JSON-LD helpers in [lib/seo.ts](/Users/yohannmartzolff/Documents/github/voxr/lib/seo.ts).
- Updated root metadata in [app/layout.tsx](/Users/yohannmartzolff/Documents/github/voxr/app/layout.tsx) with:
  - environment-aware `metadataBase`
  - canonical root
  - Open Graph and Twitter defaults
  - search engine verification hooks via env vars
  - stronger robots defaults
- Added [app/robots.ts](/Users/yohannmartzolff/Documents/github/voxr/app/robots.ts).
- Added [app/sitemap.ts](/Users/yohannmartzolff/Documents/github/voxr/app/sitemap.ts).
- Added social preview routes in [app/opengraph-image.tsx](/Users/yohannmartzolff/Documents/github/voxr/app/opengraph-image.tsx) and [app/twitter-image.tsx](/Users/yohannmartzolff/Documents/github/voxr/app/twitter-image.tsx).
- Added `noindex, nofollow` metadata to:
  - [app/auth/page.tsx](/Users/yohannmartzolff/Documents/github/voxr/app/auth/page.tsx)
  - [app/onboarding/page.tsx](/Users/yohannmartzolff/Documents/github/voxr/app/onboarding/page.tsx)
  - [app/w/[slug]/layout.tsx](/Users/yohannmartzolff/Documents/github/voxr/app/w/[slug]/layout.tsx)

### Public page architecture
- Added a dedicated marketing route group in [app/(marketing)/layout.tsx](/Users/yohannmartzolff/Documents/github/voxr/app/(marketing)/layout.tsx).
- Replaced the old homepage with a full marketing homepage in [app/(marketing)/page.tsx](/Users/yohannmartzolff/Documents/github/voxr/app/(marketing)/page.tsx).
- Added core commercial pages:
  - [app/(marketing)/product/page.tsx](/Users/yohannmartzolff/Documents/github/voxr/app/(marketing)/product/page.tsx)
  - [app/(marketing)/features/page.tsx](/Users/yohannmartzolff/Documents/github/voxr/app/(marketing)/features/page.tsx)
  - [app/(marketing)/security/page.tsx](/Users/yohannmartzolff/Documents/github/voxr/app/(marketing)/security/page.tsx)
- Added content hubs:
  - [app/(marketing)/solutions/page.tsx](/Users/yohannmartzolff/Documents/github/voxr/app/(marketing)/solutions/page.tsx)
  - [app/(marketing)/guides/page.tsx](/Users/yohannmartzolff/Documents/github/voxr/app/(marketing)/guides/page.tsx)
  - [app/(marketing)/resources/page.tsx](/Users/yohannmartzolff/Documents/github/voxr/app/(marketing)/resources/page.tsx)
  - [app/(marketing)/glossary/page.tsx](/Users/yohannmartzolff/Documents/github/voxr/app/(marketing)/glossary/page.tsx)
- Added dynamic solution, guide, resource, and glossary routes backed by shared content data.

### Shared public-site components
- Added shared public layout and navigation components in:
  - [components/marketing/public-layout.tsx](/Users/yohannmartzolff/Documents/github/voxr/components/marketing/public-layout.tsx)
  - [components/marketing/site-header.tsx](/Users/yohannmartzolff/Documents/github/voxr/components/marketing/site-header.tsx)
  - [components/marketing/site-footer.tsx](/Users/yohannmartzolff/Documents/github/voxr/components/marketing/site-footer.tsx)
- Added reusable breadcrumb, hub, FAQ, content-page, and JSON-LD components.
- Centralized public content and sitemap inputs in [lib/site-content.ts](/Users/yohannmartzolff/Documents/github/voxr/lib/site-content.ts).

## Pages Added or Rebuilt

### Core commercial pages
- `/`
- `/product`
- `/features`
- `/security`

### Hub pages
- `/solutions`
- `/guides`
- `/resources`
- `/glossary`

### Solution pages
- `/solutions/anonymous-feedback-software`
- `/solutions/employee-feedback-platform`
- `/solutions/internal-feedback-tool`
- `/solutions/employee-suggestion-box-software`

### Educational guides
- `/guides/what-is-anonymous-employee-feedback`
- `/guides/how-to-collect-anonymous-employee-feedback`
- `/guides/internal-feedback-best-practices`
- `/guides/workplace-trust-feedback-guide`

### Resource and template pages
- `/resources/employee-feedback-template`
- `/resources/anonymous-feedback-policy-template`
- `/resources/manager-response-template-anonymous-feedback`

### Glossary pages
- `/glossary/anonymous-feedback`
- `/glossary/employee-voice`
- `/glossary/employee-suggestion-box`
- `/glossary/workplace-trust`

## Metadata and Structured Data

### Metadata generation
- Public pages use `buildMetadata(...)` from [lib/seo.ts](/Users/yohannmartzolff/Documents/github/voxr/lib/seo.ts).
- Each public page now has:
  - a unique title
  - a unique description
  - a canonical URL
  - explicit robots directives
  - Open Graph metadata
  - Twitter metadata

### Structured data now in use
- `Organization` on the homepage.
- `WebSite` on the homepage.
- `WebApplication` on the homepage and product page.
- `BreadcrumbList` on public detail pages and hubs.
- `Article` on guide, resource, and glossary pages.
- `FAQPage` on pages with visible FAQs.
- `DefinedTerm` on glossary pages.

## Sitemap and Robots Behavior

### Sitemap
- Generated by [app/sitemap.ts](/Users/yohannmartzolff/Documents/github/voxr/app/sitemap.ts).
- Includes all important public marketing, solution, guide, resource, glossary, and hub URLs.
- Excludes private, auth-only, workspace, and callback flows.

### Robots
- Generated by [app/robots.ts](/Users/yohannmartzolff/Documents/github/voxr/app/robots.ts).
- Public pages are crawlable.
- Private paths are disallowed, including:
  - `/auth`
  - `/onboarding`
  - `/w`
  - `/app`
  - `/dashboard`
- Explicit bot handling is included for `GPTBot` and `OAI-SearchBot` in addition to the default rule.

## Indexable vs Noindex

### Indexable
- All pages in the marketing route group under `app/(marketing)`.
- The generated sitemap and robots configuration are aligned with these pages.

### Noindex
- Auth entry page.
- Onboarding page.
- All workspace pages under `/w/[slug]` via the workspace layout metadata.

## Verification and Environment Hooks

The root metadata now supports:
- `NEXT_PUBLIC_SITE_URL`
- `GOOGLE_SITE_VERIFICATION`
- `BING_SITE_VERIFICATION`

Use those env vars to set the production canonical base URL and add Search Console / Bing Webmaster verification values without changing code.

## Validation

- `pnpm lint` passes.
  - There are two existing warnings outside this SEO work:
    - React Compiler warning in `components/workspace/create-workspace-form.tsx`
    - unused `url` variable warning in `lib/supabase/middleware.ts`
- `pnpm build` passes.

## Recommended Next Steps

- Set `NEXT_PUBLIC_SITE_URL` to the production domain before launch so canonicals and sitemap URLs are correct.
- Add the real Google Search Console and Bing verification tokens in env vars.
- Submit the sitemap after launch.
- Review the public copy with product/leadership stakeholders for final positioning approval.
- If Voxr later publishes case studies, docs, or changelogs, extend the same metadata/content patterns rather than creating isolated page implementations.
