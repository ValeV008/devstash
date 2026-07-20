# Complete Action

Finish the active feature by reviewing, committing, merging, resetting feature tracking, and pushing `main` once.

## Steps

1. Run a final review using [review](./review.md).
2. If the final review verdict is `Needs changes`, stop and fix the required items first.
3. Stage feature changes.
4. Commit with a descriptive message based on the feature.
5. Switch to `main`.
6. Merge the feature branch into `main`.
7. Delete the local feature branch.
8. Reset `context/current-feature.md`:
   - Change the H1 back to `# Current Feature`.
   - Clear `## Goals` and `## Notes`, preserving placeholder comments when present.
   - Set status back to `Not Started` unless the project convention says otherwise.
   - Append a dated feature summary to the end of `## History`.
9. Commit the reset with: `chore: reset current-feature.md after completing {feature}`.
10. Push `main` to origin once, after both commits are present.
11. If the feature branch was previously pushed, delete it from origin.

## Quality Bar

- The final review passes before merge steps begin.
- `context/current-feature.md` history is append-only.
- `main` receives one final push containing both the feature commit and reset commit.
- No remote feature branch is left behind when one existed.
