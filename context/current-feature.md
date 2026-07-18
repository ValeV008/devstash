# Current Feature

Prisma + Neon PostgreSQL Setup: implement Prisma 7 with Neon PostgreSQL as the application database layer.

## Status

Completed

## Goals

- Install and configure Prisma 7 for the Next.js application.
- Configure Neon PostgreSQL as the Prisma datasource using `DATABASE_URL`.
- Create the initial Prisma schema from the DevStash data models in `context/project-overview.md`.
- Include NextAuth v5 models: `Account`, `Session`, and `VerificationToken`.
- Add appropriate indexes and cascade deletes for user-owned data and join tables.
- Create migrations with `prisma migrate dev`; do not use `prisma db push` unless explicitly requested.
- Add seed data for system item types if it fits the implementation scope.

## Notes

- Feature spec: `context/features/database-spec.md`
- Initial data models: `context/project-overview.md`
- Database standards: `context/coding-standards.md`
- Use Prisma 7 and read the current Prisma 7 upgrade/setup guidance before implementation because the project notes call out breaking changes.
- Development uses the Neon branch from `DATABASE_URL`; production uses a separate Neon branch.

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
