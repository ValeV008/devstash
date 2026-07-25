---
name: list-components
description: "Use when: listing, finding, inventorying, or summarizing React component files in the project's components folder. Lists .tsx, .ts, .jsx, and .js files under src/components, optionally scoped to a subdirectory."
---

# List Components

## Task

List all React component files in the project's components folder.

Component files include:

- `.tsx`
- `.ts`
- `.jsx`
- `.js`

Use `src/components` as the default components folder.

If a subdirectory is provided via `$ARGUMENTS`, list only files inside `src/components/$ARGUMENTS`.

## Procedure

1. Resolve the search directory:
   - No argument: `src/components`
   - With argument: `src/components/$ARGUMENTS`
2. Check whether the directory exists.
3. Search recursively for files ending in `.tsx`, `.ts`, `.jsx`, or `.js`.
4. Exclude non-component generated artifacts only if they are clearly outside the components folder or are not source files.
5. Sort results by relative path.
6. For each file, infer a brief one-line description from the filename:
   - Convert PascalCase, camelCase, kebab-case, and snake_case into readable words.
   - Mention the likely UI role, such as component, shell, frame, input, button, card, dialog, list, or toolbar when the filename makes it clear.
   - Keep the description concise and avoid claiming behavior that is not evident from the filename.
7. Output the result in the required format.

## Output Format

If component files are found, respond with:

```markdown
1. `src/components/path/File.tsx` - Brief one-line description.
2. `src/components/path/Other.tsx` - Brief one-line description.

Summary: N component file(s) found.
```

If no component files are found, respond exactly:

```text
No components found.
```

## Quality Checks

Before answering, verify:

- Paths are relative to the workspace root.
- Only `.tsx`, `.ts`, `.jsx`, and `.js` files are included.
- The optional subdirectory scope is respected.
- The numbering is sequential.
- The summary count matches the number of listed files.
