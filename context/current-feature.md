# Current Feature: Auth Setup - NextAuth + GitHub Provider

## Status

In Progress

## Goals

- Install NextAuth v5 beta and `@auth/prisma-adapter` for Auth.js integration.
- Add the split auth config pattern with an edge-compatible provider config and a full Prisma-backed auth setup using JWT sessions.
- Configure GitHub OAuth with the required `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, and `AUTH_SECRET` environment variables.
- Add the NextAuth route handler under `src/app/api/auth/[...nextauth]/route.ts`.
- Protect `/dashboard/*` routes with Next.js 16 proxy behavior and redirect unauthenticated users to the default sign-in page.
- Extend the NextAuth session type so `session.user.id` is available.
- Validate that visiting `/dashboard` redirects to sign-in and GitHub sign-in returns to `/dashboard`.

## Notes

- Source spec: `context/features/auth-phase-1-spec.md`.
- Use Context7 to verify current Auth.js and Next.js proxy conventions before implementation.
- Do not set a custom `pages.signIn`; use NextAuth's default sign-in page.
- Proxy file must be `src/proxy.ts`, with named export `export const proxy = auth(...)`.
- Expected files to create: `src/auth.config.ts`, `src/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`, `src/proxy.ts`, `src/types/next-auth.d.ts`.
- References: Auth.js edge compatibility and Prisma adapter docs from the spec.

## History

<!-- Keep this updated. Earliest to latest-->

- 2026-05-24: Initialized the Next.js application scaffold for DevStash with Next.js 16.2.6, React 19.2.4, TypeScript, Tailwind CSS v4, ESLint, App Router files under `src/app`, and standard npm scripts for development, build, start, and lint.
- 2026-06-09: Added `src/lib/mock-data.ts` with simple typed mock data for dashboard item types, collections, items, and the current user.
- 2026-06-09: Implemented Dashboard UI Phase 1 with shadcn-compatible setup, `/dashboard` route, dark theme globals, display-only top bar, and sidebar/main placeholders.
- 2026-06-09: Implemented Dashboard UI Phase 2 with a collapsible desktop sidebar, mobile drawer sidebar, item type navigation links, favorite and recent collection sections, user avatar area, and mock item/collection destination pages for sidebar links.
- 2026-06-10: Set current feature to Dashboard UI Phase 3 and marked it In Progress.
- 2026-06-10: Completed Dashboard UI Phase 3 with server-rendered dashboard content, a focused client frame for sidebar interactions, stats cards, recent collections, pinned items, 10 recent items, and ignored local Playwright CLI artifacts.
- 2026-07-18: Set current feature to Prisma + Neon PostgreSQL Setup and marked it In Progress.
- 2026-07-18: Completed Prisma + Neon PostgreSQL Setup with Prisma 7 config, Neon PostgreSQL schema, initial migration, seed data, adapter-based Prisma Client helper, and database scripts.
- 2026-07-18: Set current feature to Seed Data and marked it In Progress.
- 2026-07-18: Completed Seed Data with a repeatable Prisma seed script for the demo user, system item types, sample collections, and sample items from the seed specification.
- 2026-07-18: Set current feature to Dashboard Collections and marked it In Progress.
- 2026-07-18: Completed Dashboard Collections with Prisma-backed recent collection cards, database-driven collection stats, dominant type border colors, and item type icons.
- 2026-07-19: Set current feature to Dashboard Items and marked it In Progress.
- 2026-07-19: Completed Dashboard Items with Prisma-backed pinned and recent dashboard items, item type styling, tag display, and empty pinned section handling.
- 2026-07-19: Set current feature to Stats & Sidebar and marked it In Progress.
- 2026-07-19: Completed Stats & Sidebar with database-backed dashboard stats, system item type sidebar links, favorite/recent sidebar collections, dominant type indicators, and a view-all collections link.
- 2026-07-20: Completed Add Pro Badge to Sidebar with a reusable ShadCN-style badge component and subtle uppercase PRO badges for Files and Images sidebar item types.
- 2026-07-20: Completed Remove Stale Dashboard Subpages by deleting mock-backed collection and item type pages and removing dashboard links to unimplemented routes.
- 2026-07-20: Completed Tighten Dashboard Query Performance with bounded dashboard item lists, `_count`-based collection counts, grouped collection type summaries, and focused Prisma indexes for dashboard sort/filter reads.
