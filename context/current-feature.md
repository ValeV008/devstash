# Current Feature

Dashboard UI Phase 1.

## Status

Completed

## Goals

- Initialize ShadCN UI and install the required components.
- Add a dashboard route at `/dashboard`.
- Build the main dashboard layout and any required global styles.
- Keep dark mode as the default experience.
- Add a display-only top bar with search and a new item button.
- Add placeholders for the sidebar and main content area with `h2` labels: "Sidebar" and "Main".

## Notes

- This is phase 1 of 3 for the dashboard UI layout.
- Use `@context/screenshots/dashboard-ui-main.png` as the visual reference.
- Related follow-up specs are `@context/features/dashboard-phase-2-spec.md` and `@context/features/dashboard-phase-3-spec.md`.
- Mock data is available in `@src/lib/mock-data.ts`, but phase 1 only requires layout placeholders.

## History

<!-- Keep this updated. Earliest to latest-->

- 2026-05-24: Initialized the Next.js application scaffold for DevStash with Next.js 16.2.6, React 19.2.4, TypeScript, Tailwind CSS v4, ESLint, App Router files under `src/app`, and standard npm scripts for development, build, start, and lint.
- 2026-06-09: Added `src/lib/mock-data.ts` with simple typed mock data for dashboard item types, collections, items, and the current user.
- 2026-06-09: Implemented Dashboard UI Phase 1 with shadcn-compatible setup, `/dashboard` route, dark theme globals, display-only top bar, and sidebar/main placeholders.
