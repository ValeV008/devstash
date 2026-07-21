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
