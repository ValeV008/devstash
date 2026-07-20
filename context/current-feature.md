# Current Feature: Add Pro Badge to Sidebar

## Status

In Progress

## Goals

- Add a subtle uppercase `PRO` badge next to the Files item type in the sidebar.
- Add a subtle uppercase `PRO` badge next to the Images item type in the sidebar.
- Use the ShadCN UI badge component for the sidebar badges.
- Keep the badge styling clean, subtle, and consistent with the existing sidebar design.

## Notes

- Feature spec: `context/features/add-pro-badge-sidebar.md`
- Likely affected file: `src/components/dashboard/DashboardShell.tsx`
- Constraint: Badge text must be `PRO` in all uppercase.
- Constraint: Use ShadCN UI badge component.

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
