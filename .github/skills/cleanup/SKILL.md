---
name: cleanup
description: "Use when: reviewing DevStash project housekeeping, cleanup, stale TODOs, console.log statements, unused imports, orphaned files, context drift, env variable parity, current-feature history order, or stale @ts-ignore comments. Supports check-only mode and selective run/fix cleanup."
argument-hint: "run|check"
---

# Cleanup

Review project housekeeping issues and optionally fix selected findings.

## Modes

Use `$ARGUMENTS` to choose the mode:

- No argument or `check`: report findings only. Do not modify files.
- `run` or `fix`: first report all findings as numbered items, then ask exactly: `Which items would you like me to fix? (enter numbers like 1,3,5 or 'all' or 'none')`. Wait for the user's response before editing. Only fix the selected numbered items.

If `$ARGUMENTS` contains anything else, explain the valid modes and ask whether to run `check` or `run`.

## Required Checks

Perform every check before reporting results.

1. Verify `context/current-feature.md` history order.
   - Read `context/current-feature.md`.
   - Inspect the `## History` entries.
   - Confirm entries are ordered oldest to newest by date.
   - Report out-of-order entries and what the corrected order would be.
2. Find unnecessary `console.log` statements in `src/`.
   - Search only under `src/`.
   - Report `console.log` occurrences that look like debugging leftovers.
   - Do not report intentional logging outside `console.log` unless it clearly matters to the cleanup request.
3. Find unused imports.
   - Prefer `npm run lint` and use the ESLint output as the source of truth.
   - If lint cannot run, fall back to local TypeScript/ESLint diagnostics when available and say the check was limited.
4. Check for stale TODO comments.
   - Search for `TODO`, `FIXME`, `HACK`, and `XXX` in source and context files.
   - Report comments that are obsolete, vague, completed, or no longer tied to current work.
   - Leave active, specific TODOs alone unless they are clearly stale.
5. Find orphaned or unused files.
   - Search for files that appear to have no imports, route usage, config references, or documented purpose.
   - Treat `src/app/**/page.tsx`, generated Prisma client files, migrations, public assets, config files, and documented context/spec files as used unless there is strong evidence otherwise.
   - Report only high-confidence unused files, and include the evidence.
6. Check that context files match actual project state.
   - Read `AGENTS.md` for required context files.
   - Compare `context/project-overview.md`, `context/coding-standards.md`, `context/ai-interaction.md`, `context/current-feature.md`, and relevant `context/features/*.md` claims against the actual project files, scripts, dependencies, routes, Prisma schema, and implemented UI/data behavior.
   - Report stale or contradictory context with the actual current state.
7. Compare `.env.production` variables to `.env` variables.
   - Compare variable names only, not values.
   - Ignore blank lines and comments.
   - If either file is missing, report that the comparison could not be completed and name the missing file.
   - If `.env.production` is missing variables present in `.env`, list the missing variable names.
8. Find stale `@ts-ignore` comments.
   - Search for `@ts-ignore` in the repo.
   - Prefer replacing stale suppressions by fixing the type issue or using `@ts-expect-error` only when the error is still intentional and documented.
   - In `check` mode, report each suppression and whether it appears stale or requires validation.

## Suggested Commands

Use fast, targeted checks where possible:

```powershell
rg "console\.log" src
rg "TODO|FIXME|HACK|XXX" src context
rg "@ts-ignore"
npm run lint
```

For environment comparison, use a structured parse of dotenv-style files or a PowerShell command that extracts keys without printing values. Never print secrets or full env values.

## Reporting Format

For `check` mode, respond with findings grouped by check:

```markdown
## Cleanup Findings

1. Finding title
   Evidence: path and brief detail.
   Would clean up: exact action that would be taken.

No changes made. Run `/cleanup run` to choose fixes.
```

If no issues are found for a check, state `No findings` for that check.

For `run` or `fix` mode:

1. Report all findings as numbered items.
2. Ask exactly: `Which items would you like me to fix? (enter numbers like 1,3,5 or 'all' or 'none')`.
3. Wait for the user's answer.
4. Fix only the selected items.
5. Report what changed and what validation ran.

## Fixing Rules

- Do not modify anything in `check` mode.
- In `run` or `fix` mode, do not edit before the user selects findings.
- Preserve unrelated user changes.
- Keep fixes minimal and focused on the selected cleanup items.
- Do not delete files unless the user selected that item and the orphaned-file evidence is strong.
- Do not print env values, secrets, tokens, or connection strings.
- After edits, run the narrowest relevant validation, usually `npm run lint` for source cleanup or a targeted read/diff for context-only cleanup.

## Completion Criteria

- All eight required checks were performed or a clear blocker was reported.
- Findings distinguish confirmed issues from uncertain candidates.
- `check` mode made no file changes.
- `run` or `fix` mode changed only user-selected items.
- Final response lists changed files, validation, and any remaining cleanup items.
