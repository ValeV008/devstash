# Current Feature

Seed Data: expand `prisma/seed.ts` with demo data for development and demos.

## Status

Completed

## Goals

- Create or replace the seed script at `prisma/seed.ts` using the data in `context/features/seed-spec.md`.
- Seed the demo user `demo@devstash.io` with the name `Demo User`, password `12345678` hashed with bcryptjs using 12 rounds, `isPro: false`, and `emailVerified` set to the current date.
- Seed all system item types with their Lucide icon names, colors, and `isSystem: true`.
- Seed the development collections: React Patterns, AI Workflows, DevOps, Terminal Commands, and Design Resources.
- Seed the requested sample items for each collection with realistic content and real URLs where links are required.
- Make the script repeatable so development databases can be reseeded without creating duplicates.

## Notes

- Feature spec: `context/features/seed-spec.md`
- Current seed script: `prisma/seed.ts`
- Existing seed content may be overwritten to satisfy this feature.
- Use the existing Prisma 7 adapter/client setup already present in the seed script.
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
- 2026-07-18: Set current feature to Seed Data and marked it In Progress.
- 2026-07-18: Completed Seed Data with a repeatable Prisma seed script for the demo user, system item types, sample collections, and sample items from the seed specification.
