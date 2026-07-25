# Review Action

Review the feature implementation against the active goals and changed code.

## Steps

1. Read `context/current-feature.md` to understand goals and notes.
2. Inspect changed files for the current branch or working tree.
3. Check whether each goal is met.
4. Check for missing or incomplete behavior.
5. Check for code quality issues, bugs, risky assumptions, or broken project conventions.
6. Check for scope creep beyond the active goals.
7. Check whether tests or validation are adequate for the changed logic.
8. Give a final verdict: `Ready to complete` or `Needs changes`.

## Output Format

Lead with findings ordered by severity. For each finding, include the affected file path and the reason it matters.

Then provide:

- Goal coverage summary.
- Test or validation status.
- Final verdict.

## Quality Bar

- Findings are concrete and actionable.
- Missing tests are called out when they create real risk.
- Scope creep is identified separately from implementation defects.
