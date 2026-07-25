---
name: feature
description: "Use when: managing the DevStash current feature workflow with /feature load, start, test, review, explain, or complete. Tracks goals in context/current-feature.md, implements feature specs, reviews changed code, writes focused tests, explains changes, and completes branch/merge cleanup."
---

# Feature Workflow

Manage the lifecycle of one DevStash feature from spec intake through implementation, validation, review, explanation, and completion.

## Working File

Use `context/current-feature.md` as the source of truth for the active feature.

Expected sections:

- `# Current Feature` - H1 heading with the active feature name when loaded.
- `## Status` - `Not Started`, `In Progress`, or `Complete`.
- `## Goals` - Bullet list of success criteria.
- `## Notes` - Feature spec links, constraints, affected files, or implementation notes.
- `## History` - Append-only list of completed features.

## Actions

Execute the requested action from `$ARGUMENTS`:

| Action     | Use when                                                                       | Detailed instructions             |
| ---------- | ------------------------------------------------------------------------------ | --------------------------------- |
| `load`     | Start from a feature spec filename or inline feature description.              | [load](./actions/load.md)         |
| `start`    | Begin implementation from populated goals.                                     | [start](./actions/start.md)       |
| `test`     | Add and run focused tests for new server actions or utility logic.             | [test](./actions/test.md)         |
| `review`   | Check whether the implementation satisfies the goals and is ready to complete. | [review](./actions/review.md)     |
| `explain`  | Summarize changed files and how the implementation fits together.              | [explain](./actions/explain.md)   |
| `complete` | Commit, merge, reset feature tracking, and push main once.                     | [complete](./actions/complete.md) |

If no action is provided, explain the available actions and ask the user which one to run.

## Procedure

1. Read `context/current-feature.md` before every action except `load`.
2. For `load`, parse the provided spec name or inline description, populate the working file, and stop after confirming the feature summary.
3. For `start`, verify goals are populated, mark the feature in progress, create a branch, and implement goals one by one.
4. For implementation work, follow project instructions in `AGENTS.md`; for Next.js changes, read the relevant guide in `node_modules/next/dist/docs/` before writing code.
5. For `test`, write tests only for meaningful testable logic and run the repository test command.
6. For `review`, compare the changed code against goals, tests, quality, and scope.
7. For `explain`, report each changed file and finish with a concise data/control-flow summary.
8. For `complete`, perform a final review first, then commit, merge, reset `context/current-feature.md`, and push `main` once.

## Decision Points

- If `load` receives one word with no spaces, treat it as a spec name and look for `context/features/{name}.md`, then `context/fixes/{name}.md`.
- If `load` receives multiple words, treat them as an inline feature description and derive concrete goals.
- If `start`, `test`, `review`, `explain`, or `complete` is requested with empty goals, stop and tell the user to run `/feature load` first.
- If validation fails during `start` or `test`, fix the touched feature slice and rerun the same focused validation before broadening scope.
- If `review` finds missing goals, quality issues, scope creep, or inadequate tests, return a `needs changes` verdict and list the required fixes.
- If `complete` discovers the feature branch has already been pushed, delete the remote feature branch after `main` is pushed.

## Completion Criteria

- The active feature has clear goals and status in `context/current-feature.md`.
- Implementation changes are limited to the active goals unless the user approves broader scope.
- Focused validation has run, or the final response explains why it could not run.
- Reviews state whether goals are met, tests are adequate, and scope is contained.
- Completion leaves `main` updated, the feature branch cleaned up, and `context/current-feature.md` reset with history appended.
