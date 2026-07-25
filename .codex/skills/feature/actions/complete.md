# Complete Action

Finish the active feature by reviewing, committing, merging, resetting feature tracking, and pushing `main` once.

## Steps

1. Run a final review using [review](./review.md).
2. If the final review verdict is `Needs changes`, stop and fix the required items first.
3. Stage feature changes.
4. Commit with a descriptive message based on the feature.
5. Switch to `main`.
6. Start a non-fast-forward merge without committing yet, so the feature changes are staged on `main` but the merge commit is still open.
7. Reset `context/current-feature.md` before finalizing the merge:
   - Change the H1 back to `# Current Feature`.
   - Clear `## Goals` and `## Notes`, preserving placeholder comments when present.
   - Set status back to `Not Started` unless the project convention says otherwise.
   - Append a dated feature summary to the end of `## History`.
8. Stage the reset `context/current-feature.md`.
9. Complete the merge with one commit that includes both the feature changes and the `context/current-feature.md` reset.
10. Delete the local feature branch.
11. Push `main` to origin once, after the combined merge/reset commit is present.
12. If the feature branch was previously pushed, delete it from origin.

## Quality Bar

- The final review passes before merge steps begin.
- `context/current-feature.md` history is append-only.
- `main` receives one final push containing the feature branch commit and one combined merge/reset commit.
- The `context/current-feature.md` reset is included in the merge commit, not committed separately.
- No remote feature branch is left behind when one existed.
