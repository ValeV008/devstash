# Load Action

Prepare `context/current-feature.md` from a feature spec or inline description.

## Steps

1. Check `$ARGUMENTS` after `load`.
2. If the value is empty, stop with: `load requires a spec filename or feature description`.
3. If it is a single word with no spaces, look for `context/features/{name}.md`, then `context/fixes/{name}.md`.
4. If it contains multiple words, use it as an inline feature description and derive concrete goals.
5. Update `context/current-feature.md`:
   - Set the H1 to `# Current Feature: {feature name}`.
   - Set `## Status` to `Not Started`.
   - Write success criteria as bullets under `## Goals`.
   - Write feature spec links, constraints, affected files, and useful context under `## Notes`.
   - Preserve `## History` exactly except for normal line movement caused by the edit.
6. Confirm the feature was loaded and show the feature summary.

## Quality Bar

- Goals are specific enough to implement and review independently.
- Notes preserve the source spec and any known constraints.
- History remains append-only and unchanged by loading.
