# Start Action

Begin implementation for the feature currently loaded in `context/current-feature.md`.

## Steps

1. Read `context/current-feature.md` and verify `## Goals` contains actionable bullets.
2. If goals are empty, stop with: `Run /feature load first`.
3. Set `## Status` to `In Progress`.
4. Derive a short kebab-case branch name from the H1 feature name.
5. Create and check out the feature branch.
6. List the goals back to the user.
7. Implement the goals one by one, keeping edits scoped to the feature.
8. Run the cheapest focused validation that can disconfirm the implementation.
9. Report what changed and what validation ran.

## Quality Bar

- Each goal is either implemented, explicitly deferred by the user, or called out as blocked.
- Changes follow the existing project patterns and instructions.
- Validation is feature-scoped where possible.
