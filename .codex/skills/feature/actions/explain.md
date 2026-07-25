# Explain Action

Explain what changed for the active feature and how the changed files fit together.

## Steps

1. Read `context/current-feature.md` to understand what was implemented.
2. Run `git diff main --name-only` to list files changed relative to `main`.
3. For each created or modified file:
   - Show the file path.
   - State whether it is new or modified.
   - Give a one- or two-sentence explanation of what changed and why.
   - Highlight important functions, components, data access patterns, or conventions.
4. End with a brief summary of how the pieces connect.

## Output Format

```markdown
## Files Changed

**path/to/file.ts** (new)
Brief explanation of what this file does and why it was added.

**path/to/other.ts** (modified)
What changed and why.

## How It All Connects

Brief summary of the data or control flow between these files.
```

## Quality Bar

- Explanations are written for a developer who knows the project but has not read the diff.
- The connection summary names the main flow through data, UI, or control boundaries.
