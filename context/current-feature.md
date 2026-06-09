# Current Feature

Mock dashboard data source for the pre-database dashboard UI.

## Status

Completed

## Goals

- Add a single importable mock data source for the dashboard.
- Include the current user, item types, collections, and representative items.
- Keep the data simple and avoid helper methods.

## Notes

- Item type and collection records include dashboard counts for sidebar and card display.
- Items use ids that line up with their collection and item type relationships.

## History

<!-- Keep this updated. Earliest to latest-->

- 2026-05-24: Initialized the Next.js application scaffold for DevStash with Next.js 16.2.6, React 19.2.4, TypeScript, Tailwind CSS v4, ESLint, App Router files under `src/app`, and standard npm scripts for development, build, start, and lint.
- 2026-06-09: Added `src/lib/mock-data.ts` with simple typed mock data for dashboard item types, collections, items, and the current user.
