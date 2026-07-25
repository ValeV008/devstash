# Test Action

Add focused tests for meaningful testable logic introduced or changed by the current feature.

## Steps

1. Read `context/current-feature.md` to understand the active feature goals.
2. Identify server actions, data-layer functions, utilities, and other non-component logic changed for the feature.
3. Check whether tests already exist for those functions.
4. For changed functions without adequate tests, add Vitest unit tests when the logic is worth testing.
5. Cover happy paths and important error cases.
6. Do not add tests only for display-only components or trivial pass-through code unless the feature risk justifies it.
7. Run `npm test`.
8. Report the tests added, test result, and any remaining coverage gaps.

## Quality Bar

- Tests focus on behavior, not implementation details.
- New tests are scoped to the feature code.
- Failures are fixed or clearly reported with the next needed action.
