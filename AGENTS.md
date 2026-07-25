<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules\next\dist\docs\` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# DevStash

A developer knowledge hub for snippets, commands, prompts, notes, files, images, links and custom types.

# Neon MCP Usage

When using the Neon MCP for this workspace, always target the DevStash project and its development database branch by default.

- Neon project name: `devstash`
- Neon project ID: `morning-mouse-29009644`
- Default Neon branch name: `development`
- Default Neon branch ID: `br-round-dream-as110w06`

Never use the Neon production branch unless the user explicitly asks for production in the current request.

Production branch details, for avoidance:

- Production branch name: `production`
- Production branch ID: `br-summer-sound-asfj7bdu`

For every Neon MCP SQL/query/schema/log operation:

- Pass `projectId: "morning-mouse-29009644"`.
- Pass `branchId: "br-round-dream-as110w06"` unless the user explicitly says to use production.
- Do not omit `branchId`, because the Neon default branch is production.
- If a request is ambiguous, assume `development`.
- Before running anything against production, stop and confirm that the user explicitly requested production.

# Context files

Read the following to get the full context of the project:

- context\project-overview.md
- context\coding-standards.md
- context\ai-interaction.md
- context\current-feature.md

<!-- context7 -->
Use Context7 MCP to fetch current documentation whenever the user asks about a library, framework, SDK, API, CLI tool, or cloud service — even well-known ones like React, Next.js, Prisma, Express, Tailwind, Django, or Spring Boot. This includes API syntax, configuration, version migration, library-specific debugging, setup instructions, and CLI tool usage. Use even when you think you know the answer — your training data may not reflect recent changes. Prefer this over web search for library docs.

Do not use for: refactoring, writing scripts from scratch, debugging business logic, code review, or general programming concepts.

## Steps

1. Always start with `resolve-library-id` using the library name and what to look up in the library's documentation, unless the user provides an exact library ID in `/org/project` format
2. Pick the best match (ID format: `/org/project`) by: exact name match, description relevance, code snippet count, source reputation (High/Medium preferred), and benchmark score (higher is better). If results don't look right, try alternate names or queries (e.g., "next.js" not "nextjs", or rephrase the question). Use version-specific IDs when the user mentions a version
3. `query-docs` with the selected library ID and what to look up in the library's documentation (not single words), scoped to a single concept. If the question spans multiple distinct concepts (e.g. routing and auth and caching), make a separate `query-docs` call per concept with the same library ID, unless the question is about how the concepts interact — combined queries dilute ranking and return shallow results for each topic
4. Answer using the fetched docs
<!-- context7 -->
