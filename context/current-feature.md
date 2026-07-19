# Current Feature

Dashboard Items: replace dashboard pinned and recent item mock data with database-backed item data.

## Status

Completed

## Goals

- Replace the dummy pinned and recent item data in the dashboard main area with data from the Neon database using Prisma.
- Create `src/lib/db/items.ts` with item data fetching functions.
- Fetch items directly in the dashboard server component.
- Keep the existing dashboard item card layout and design.
- Derive each item card icon and border color from the item type.
- Display item type tags and the existing item card metadata using database data.
- Hide the pinned items section when there are no pinned items.
- Update the collection stats display using database data.

## Notes

- Feature spec: `context/features/dashboard-items-spec.md`
- Dashboard page: `src/app/dashboard/page.tsx`
- Current mock data source: `src/lib/mock-data.ts`
- New database data layer: `src/lib/db/items.ts`
- Reference screenshot: `context/screenshots/dashboard-ui-main.png`

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
