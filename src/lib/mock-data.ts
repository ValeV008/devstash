export type MockContentType = "TEXT" | "FILE" | "URL";

export type MockItemTypeId =
  | "snippet"
  | "prompt"
  | "command"
  | "note"
  | "file"
  | "image"
  | "link";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isPro: boolean;
}

export interface MockItemType {
  id: MockItemTypeId;
  name: string;
  label: string;
  icon: string;
  color: string;
  contentType: MockContentType;
  itemCount: number;
  isSystem: boolean;
  route: string;
}

export interface MockCollection {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
  itemCount: number;
  defaultTypeId: MockItemTypeId;
  itemTypeIds: MockItemTypeId[];
  itemIds: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface MockItem {
  id: string;
  title: string;
  description: string;
  contentType: MockContentType;
  content?: string;
  fileName?: string;
  fileSize?: number;
  fileUrl?: string;
  url?: string;
  isFavorite: boolean;
  isPinned: boolean;
  language?: string;
  tags: string[];
  collectionIds: string[];
  itemTypeId: MockItemTypeId;
  createdAt: string;
  updatedAt: string;
  lastUsedAt: string;
  userId: string;
}

export const mockCurrentUser: MockUser = {
  id: "user_john_doe",
  name: "John Doe",
  email: "john@example.com",
  image: null,
  isPro: true,
};

export const mockItemTypes: MockItemType[] = [
  {
    id: "snippet",
    name: "snippet",
    label: "Snippets",
    icon: "Code",
    color: "#3b82f6",
    contentType: "TEXT",
    itemCount: 24,
    isSystem: true,
    route: "/items/snippets",
  },
  {
    id: "prompt",
    name: "prompt",
    label: "Prompts",
    icon: "Sparkles",
    color: "#8b5cf6",
    contentType: "TEXT",
    itemCount: 18,
    isSystem: true,
    route: "/items/prompts",
  },
  {
    id: "command",
    name: "command",
    label: "Commands",
    icon: "Terminal",
    color: "#f97316",
    contentType: "TEXT",
    itemCount: 15,
    isSystem: true,
    route: "/items/commands",
  },
  {
    id: "note",
    name: "note",
    label: "Notes",
    icon: "StickyNote",
    color: "#fde047",
    contentType: "TEXT",
    itemCount: 12,
    isSystem: true,
    route: "/items/notes",
  },
  {
    id: "file",
    name: "file",
    label: "Files",
    icon: "File",
    color: "#6b7280",
    contentType: "FILE",
    itemCount: 5,
    isSystem: true,
    route: "/items/files",
  },
  {
    id: "image",
    name: "image",
    label: "Images",
    icon: "Image",
    color: "#ec4899",
    contentType: "FILE",
    itemCount: 3,
    isSystem: true,
    route: "/items/images",
  },
  {
    id: "link",
    name: "link",
    label: "Links",
    icon: "Link",
    color: "#10b981",
    contentType: "URL",
    itemCount: 8,
    isSystem: true,
    route: "/items/links",
  },
];

export const mockCollections: MockCollection[] = [
  {
    id: "collection_react_patterns",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    isFavorite: true,
    itemCount: 12,
    defaultTypeId: "snippet",
    itemTypeIds: ["snippet", "note", "link"],
    itemIds: [
      "item_use_auth_hook",
      "item_api_error_handling_pattern",
      "item_nextjs_route_handler_note",
      "item_tailwind_v4_reference",
    ],
    createdAt: "2026-01-02T09:00:00.000Z",
    updatedAt: "2026-01-15T10:30:00.000Z",
    userId: "user_john_doe",
  },
  {
    id: "collection_python_snippets",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    isFavorite: false,
    itemCount: 8,
    defaultTypeId: "snippet",
    itemTypeIds: ["snippet", "note"],
    itemIds: ["item_fastapi_dependency_snippet"],
    createdAt: "2026-01-03T11:15:00.000Z",
    updatedAt: "2026-01-11T08:40:00.000Z",
    userId: "user_john_doe",
  },
  {
    id: "collection_context_files",
    name: "Context Files",
    description: "AI context files for projects",
    isFavorite: true,
    itemCount: 5,
    defaultTypeId: "file",
    itemTypeIds: ["file", "note"],
    itemIds: ["item_project_context_template", "item_nextjs_route_handler_note"],
    createdAt: "2026-01-04T14:20:00.000Z",
    updatedAt: "2026-01-10T16:10:00.000Z",
    userId: "user_john_doe",
  },
  {
    id: "collection_interview_prep",
    name: "Interview Prep",
    description: "Technical interview preparation",
    isFavorite: false,
    itemCount: 24,
    defaultTypeId: "note",
    itemTypeIds: ["note", "snippet", "link", "prompt"],
    itemIds: [
      "item_use_auth_hook",
      "item_code_review_prompt",
      "item_system_design_notes",
    ],
    createdAt: "2026-01-05T13:25:00.000Z",
    updatedAt: "2026-01-13T15:55:00.000Z",
    userId: "user_john_doe",
  },
  {
    id: "collection_git_commands",
    name: "Git Commands",
    description: "Frequently used git commands",
    isFavorite: true,
    itemCount: 15,
    defaultTypeId: "command",
    itemTypeIds: ["command", "note"],
    itemIds: ["item_git_reset_soft_head", "item_pr_cleanup_command"],
    createdAt: "2026-01-06T10:45:00.000Z",
    updatedAt: "2026-01-12T18:20:00.000Z",
    userId: "user_john_doe",
  },
  {
    id: "collection_ai_prompts",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    isFavorite: false,
    itemCount: 18,
    defaultTypeId: "prompt",
    itemTypeIds: ["prompt", "snippet", "note"],
    itemIds: ["item_code_review_prompt", "item_refactor_plan_prompt"],
    createdAt: "2026-01-07T12:35:00.000Z",
    updatedAt: "2026-01-14T09:05:00.000Z",
    userId: "user_john_doe",
  },
];

export const mockItems: MockItem[] = [
  {
    id: "item_use_auth_hook",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    contentType: "TEXT",
    content: "export function useAuth() { return useContext(AuthContext); }",
    isFavorite: true,
    isPinned: true,
    language: "typescript",
    tags: ["react", "auth", "hooks"],
    collectionIds: ["collection_react_patterns", "collection_interview_prep"],
    itemTypeId: "snippet",
    createdAt: "2026-01-08T09:00:00.000Z",
    updatedAt: "2026-01-15T10:30:00.000Z",
    lastUsedAt: "2026-01-15T10:30:00.000Z",
    userId: "user_john_doe",
  },
  {
    id: "item_api_error_handling_pattern",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    contentType: "TEXT",
    content: "async function fetchWithRetry(input: RequestInfo, retries = 3) { /* retry request */ }",
    isFavorite: false,
    isPinned: true,
    language: "typescript",
    tags: ["api", "errors", "retry"],
    collectionIds: ["collection_react_patterns"],
    itemTypeId: "snippet",
    createdAt: "2026-01-08T12:10:00.000Z",
    updatedAt: "2026-01-12T16:45:00.000Z",
    lastUsedAt: "2026-01-12T16:45:00.000Z",
    userId: "user_john_doe",
  },
  {
    id: "item_code_review_prompt",
    title: "Code Review Prompt",
    description: "Review code for bugs, regressions, missing tests, and maintainability",
    contentType: "TEXT",
    content: "Act as a senior engineer. Review this change for correctness, risk, and missing tests.",
    isFavorite: true,
    isPinned: false,
    tags: ["ai", "review", "quality"],
    collectionIds: ["collection_ai_prompts", "collection_interview_prep"],
    itemTypeId: "prompt",
    createdAt: "2026-01-09T08:25:00.000Z",
    updatedAt: "2026-01-14T09:05:00.000Z",
    lastUsedAt: "2026-01-14T09:05:00.000Z",
    userId: "user_john_doe",
  },
  {
    id: "item_git_reset_soft_head",
    title: "Undo Last Commit",
    description: "Move the last commit back into staged changes",
    contentType: "TEXT",
    content: "git reset --soft HEAD~1",
    isFavorite: true,
    isPinned: false,
    tags: ["git", "undo", "commit"],
    collectionIds: ["collection_git_commands"],
    itemTypeId: "command",
    createdAt: "2026-01-09T13:10:00.000Z",
    updatedAt: "2026-01-12T18:20:00.000Z",
    lastUsedAt: "2026-01-12T18:20:00.000Z",
    userId: "user_john_doe",
  },
  {
    id: "item_nextjs_route_handler_note",
    title: "Next.js Route Handler Notes",
    description: "When to use route handlers instead of server actions",
    contentType: "TEXT",
    content: "Use route handlers for webhooks, uploads, and API endpoints needed by external clients.",
    isFavorite: false,
    isPinned: false,
    tags: ["nextjs", "routes", "server"],
    collectionIds: ["collection_react_patterns", "collection_context_files"],
    itemTypeId: "note",
    createdAt: "2026-01-10T10:35:00.000Z",
    updatedAt: "2026-01-13T11:15:00.000Z",
    lastUsedAt: "2026-01-13T11:15:00.000Z",
    userId: "user_john_doe",
  },
  {
    id: "item_project_context_template",
    title: "Project Context Template",
    description: "Reusable markdown context file for AI-assisted development",
    contentType: "FILE",
    fileName: "project-context-template.md",
    fileSize: 18432,
    fileUrl: "/mock-files/project-context-template.md",
    isFavorite: true,
    isPinned: false,
    tags: ["context", "markdown", "ai"],
    collectionIds: ["collection_context_files"],
    itemTypeId: "file",
    createdAt: "2026-01-10T15:45:00.000Z",
    updatedAt: "2026-01-10T16:10:00.000Z",
    lastUsedAt: "2026-01-10T16:10:00.000Z",
    userId: "user_john_doe",
  },
  {
    id: "item_tailwind_v4_reference",
    title: "Tailwind CSS v4 Reference",
    description: "Official docs for CSS-first theme configuration",
    contentType: "URL",
    url: "https://tailwindcss.com/docs",
    isFavorite: false,
    isPinned: false,
    tags: ["tailwind", "css", "docs"],
    collectionIds: ["collection_react_patterns"],
    itemTypeId: "link",
    createdAt: "2026-01-11T09:30:00.000Z",
    updatedAt: "2026-01-11T09:30:00.000Z",
    lastUsedAt: "2026-01-11T09:30:00.000Z",
    userId: "user_john_doe",
  },
  {
    id: "item_fastapi_dependency_snippet",
    title: "FastAPI Dependency Snippet",
    description: "Shared dependency pattern for authenticated FastAPI routes",
    contentType: "TEXT",
    content: "def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]): ...",
    isFavorite: false,
    isPinned: false,
    language: "python",
    tags: ["python", "fastapi", "auth"],
    collectionIds: ["collection_python_snippets"],
    itemTypeId: "snippet",
    createdAt: "2026-01-11T10:00:00.000Z",
    updatedAt: "2026-01-11T10:05:00.000Z",
    lastUsedAt: "2026-01-11T10:05:00.000Z",
    userId: "user_john_doe",
  },
  {
    id: "item_system_design_notes",
    title: "System Design Tradeoffs",
    description: "Notes for API scaling, caching, queues, and storage choices",
    contentType: "TEXT",
    content: "Clarify requirements first, then discuss data model, traffic shape, bottlenecks, and tradeoffs.",
    isFavorite: false,
    isPinned: false,
    tags: ["interview", "architecture", "notes"],
    collectionIds: ["collection_interview_prep"],
    itemTypeId: "note",
    createdAt: "2026-01-12T07:50:00.000Z",
    updatedAt: "2026-01-13T15:55:00.000Z",
    lastUsedAt: "2026-01-13T15:55:00.000Z",
    userId: "user_john_doe",
  },
  {
    id: "item_refactor_plan_prompt",
    title: "Refactor Plan Prompt",
    description: "Prompt for planning low-risk refactors before editing code",
    contentType: "TEXT",
    content: "Map the current behavior, identify risk, propose small steps, and list verification commands.",
    isFavorite: false,
    isPinned: false,
    tags: ["ai", "planning", "refactor"],
    collectionIds: ["collection_ai_prompts"],
    itemTypeId: "prompt",
    createdAt: "2026-01-13T12:05:00.000Z",
    updatedAt: "2026-01-14T08:15:00.000Z",
    lastUsedAt: "2026-01-14T08:15:00.000Z",
    userId: "user_john_doe",
  },
  {
    id: "item_pr_cleanup_command",
    title: "Prune Merged Branches",
    description: "Remove local branches that are already gone from origin",
    contentType: "TEXT",
    content: "git fetch --prune",
    isFavorite: false,
    isPinned: false,
    tags: ["git", "cleanup", "branches"],
    collectionIds: ["collection_git_commands"],
    itemTypeId: "command",
    createdAt: "2026-01-14T17:00:00.000Z",
    updatedAt: "2026-01-14T17:00:00.000Z",
    lastUsedAt: "2026-01-14T17:00:00.000Z",
    userId: "user_john_doe",
  },
  {
    id: "item_dashboard_empty_state_image",
    title: "Dashboard Empty State",
    description: "Reference image for the first-run dashboard state",
    contentType: "FILE",
    fileName: "dashboard-empty-state.png",
    fileSize: 246784,
    fileUrl: "/mock-images/dashboard-empty-state.png",
    isFavorite: false,
    isPinned: false,
    tags: ["dashboard", "ui", "reference"],
    collectionIds: [],
    itemTypeId: "image",
    createdAt: "2026-01-15T08:10:00.000Z",
    updatedAt: "2026-01-15T08:10:00.000Z",
    lastUsedAt: "2026-01-15T08:10:00.000Z",
    userId: "user_john_doe",
  },
];

export const mockDashboardData = {
  currentUser: mockCurrentUser,
  itemTypes: mockItemTypes,
  collections: mockCollections,
  items: mockItems,
};
