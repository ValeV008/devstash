import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { ContentType, PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const demoUser = {
  email: "demo@devstash.io",
  name: "Demo User",
  password: "12345678",
  isPro: false,
} as const;

const systemItemTypes = [
  {
    id: "system-snippet",
    name: "snippet",
    icon: "Code",
    color: "#3b82f6",
    isSystem: true,
  },
  {
    id: "system-prompt",
    name: "prompt",
    icon: "Sparkles",
    color: "#8b5cf6",
    isSystem: true,
  },
  {
    id: "system-command",
    name: "command",
    icon: "Terminal",
    color: "#f97316",
    isSystem: true,
  },
  {
    id: "system-note",
    name: "note",
    icon: "StickyNote",
    color: "#fde047",
    isSystem: true,
  },
  { id: "system-file", name: "file", icon: "File", color: "#6b7280", isSystem: true },
  {
    id: "system-image",
    name: "image",
    icon: "Image",
    color: "#ec4899",
    isSystem: true,
  },
  { id: "system-link", name: "link", icon: "Link", color: "#10b981", isSystem: true },
] as const;

const seedCollections = [
  {
    id: "seed-collection-react-patterns",
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    isFavorite: true,
    defaultTypeName: "snippet",
    items: [
      {
        id: "seed-item-react-hooks",
        title: "Reusable Custom Hooks",
        description: "Debounce and localStorage hooks for client-side React features.",
        typeName: "snippet",
        isPinned: true,
        language: "typescript",
        content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) as T : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`,
      },
      {
        id: "seed-item-react-compound-components",
        title: "Compound Component Pattern",
        description:
          "Context-backed compound components for shared state and flexible markup.",
        typeName: "snippet",
        language: "typescript",
        content: `import { createContext, useContext, useState } from "react";

type TabsContextValue = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

export function Tabs({ defaultValue, children }: { defaultValue: string; children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabs() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("useTabs must be used inside Tabs");
  }

  return context;
}`,
      },
      {
        id: "seed-item-react-utilities",
        title: "Typed Utility Helpers",
        description:
          "Small utility helpers for exhaustive checks, class names, and async state.",
        typeName: "snippet",
        language: "typescript",
        content: `export function assertNever(value: never): never {
  throw new Error(\`Unexpected value: \${String(value)}\`);
}

export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export async function settleWithFallback<T>(promise: Promise<T>, fallback: T) {
  try {
    return await promise;
  } catch {
    return fallback;
  }
}`,
      },
    ],
  },
  {
    id: "seed-collection-ai-workflows",
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    isFavorite: true,
    defaultTypeName: "prompt",
    items: [
      {
        id: "seed-item-ai-code-review",
        title: "Code Review Prompt",
        description:
          "Review changes for bugs, regressions, and missing tests before merge.",
        typeName: "prompt",
        isPinned: true,
        content:
          "Review this diff as a senior engineer. Prioritize correctness bugs, data loss risks, security concerns, accessibility regressions, and missing focused tests. Return findings first with file references, then open questions, then a concise summary.",
      },
      {
        id: "seed-item-ai-doc-generation",
        title: "Documentation Generation Prompt",
        description: "Generate clear docs from existing implementation details.",
        typeName: "prompt",
        content:
          "Create developer documentation for this feature from the code. Explain the purpose, public API, important constraints, setup requirements, and one realistic usage example. Keep the prose concise and call out any assumptions.",
      },
      {
        id: "seed-item-ai-refactoring",
        title: "Refactoring Assistance Prompt",
        description:
          "Plan a small refactor that preserves behavior and improves maintainability.",
        typeName: "prompt",
        content:
          "Inspect this module and propose the smallest refactor that reduces duplication or clarifies ownership without changing behavior. Identify the validation command that should be run after each step.",
      },
    ],
  },
  {
    id: "seed-collection-devops",
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    defaultTypeName: "snippet",
    items: [
      {
        id: "seed-item-devops-dockerfile",
        title: "Node Dockerfile",
        description: "Multi-stage Dockerfile for a production Node.js service.",
        typeName: "snippet",
        language: "dockerfile",
        content: `FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
CMD ["npm", "start"]`,
      },
      {
        id: "seed-item-devops-deploy-command",
        title: "Deploy Migration Command",
        description: "Run Prisma migrations before starting a production deployment.",
        typeName: "command",
        language: "sh",
        content: "npm run prisma:deploy && npm run start",
      },
      {
        id: "seed-item-devops-docker-docs",
        title: "Docker Build Documentation",
        description: "Official Docker guide for building container images.",
        typeName: "link",
        url: "https://docs.docker.com/build/",
      },
      {
        id: "seed-item-devops-github-actions-docs",
        title: "GitHub Actions Documentation",
        description: "Official reference for GitHub Actions workflows and automation.",
        typeName: "link",
        url: "https://docs.github.com/actions",
      },
    ],
  },
  {
    id: "seed-collection-terminal-commands",
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    defaultTypeName: "command",
    items: [
      {
        id: "seed-item-command-git-branch-cleanup",
        title: "Delete Merged Git Branches",
        description:
          "Remove local branches that have already been merged into the current branch.",
        typeName: "command",
        language: "sh",
        content: "git branch --merged | grep -v '\\*' | xargs -r git branch -d",
      },
      {
        id: "seed-item-command-docker-prune",
        title: "Prune Docker Resources",
        description:
          "Clean unused Docker containers, networks, images, and build cache.",
        typeName: "command",
        language: "sh",
        content: "docker system prune --all --volumes",
      },
      {
        id: "seed-item-command-process-port",
        title: "Find Process Using Port 3000",
        description:
          "Locate the process that is listening on a local development port.",
        typeName: "command",
        language: "sh",
        content: "lsof -i :3000",
      },
      {
        id: "seed-item-command-npm-outdated",
        title: "Check Outdated Packages",
        description: "List installed npm packages that have newer versions available.",
        typeName: "command",
        language: "sh",
        content: "npm outdated",
      },
    ],
  },
  {
    id: "seed-collection-design-resources",
    name: "Design Resources",
    description: "UI/UX resources and references",
    defaultTypeName: "link",
    items: [
      {
        id: "seed-item-design-tailwind-docs",
        title: "Tailwind CSS Documentation",
        description: "Utility-first CSS framework documentation and examples.",
        typeName: "link",
        url: "https://tailwindcss.com/docs",
      },
      {
        id: "seed-item-design-shadcn",
        title: "shadcn/ui Components",
        description:
          "Composable component patterns built with Radix UI and Tailwind CSS.",
        typeName: "link",
        url: "https://ui.shadcn.com/",
      },
      {
        id: "seed-item-design-material",
        title: "Material Design",
        description:
          "Google's design system for product principles, components, and patterns.",
        typeName: "link",
        url: "https://m3.material.io/",
      },
      {
        id: "seed-item-design-lucide",
        title: "Lucide Icons",
        description: "Icon library used by DevStash item types.",
        typeName: "link",
        url: "https://lucide.dev/icons/",
      },
    ],
  },
] as const;

async function main() {
  const password = await bcrypt.hash(demoUser.password, 12);

  const user = await prisma.user.upsert({
    where: { email: demoUser.email },
    update: {
      name: demoUser.name,
      password,
      isPro: demoUser.isPro,
      emailVerified: new Date(),
    },
    create: {
      email: demoUser.email,
      name: demoUser.name,
      password,
      isPro: demoUser.isPro,
      emailVerified: new Date(),
    },
  });

  const itemTypes = new Map<string, string>();

  for (const itemType of systemItemTypes) {
    const savedItemType = await prisma.itemType.upsert({
      where: { id: itemType.id },
      update: {
        name: itemType.name,
        icon: itemType.icon,
        color: itemType.color,
        isSystem: itemType.isSystem,
        userId: null,
      },
      create: {
        ...itemType,
        userId: null,
      },
    });

    itemTypes.set(savedItemType.name, savedItemType.id);
  }

  await prisma.item.deleteMany({ where: { userId: user.id } });
  await prisma.collection.deleteMany({ where: { userId: user.id } });

  for (const collection of seedCollections) {
    const defaultTypeId = itemTypes.get(collection.defaultTypeName);

    if (!defaultTypeId) {
      throw new Error(`Missing default item type: ${collection.defaultTypeName}`);
    }

    const savedCollection = await prisma.collection.create({
      data: {
        id: collection.id,
        name: collection.name,
        description: collection.description,
        isFavorite: "isFavorite" in collection ? collection.isFavorite : false,
        userId: user.id,
        defaultTypeId,
      },
    });

    for (const item of collection.items) {
      const itemTypeId = itemTypes.get(item.typeName);

      if (!itemTypeId) {
        throw new Error(`Missing item type: ${item.typeName}`);
      }

      const contentType = item.typeName === "link" ? ContentType.URL : ContentType.TEXT;

      await prisma.item.create({
        data: {
          id: item.id,
          title: item.title,
          description: item.description,
          contentType,
          content: "content" in item ? item.content : undefined,
          url: "url" in item ? item.url : undefined,
          isPinned: "isPinned" in item ? item.isPinned : false,
          language: "language" in item ? item.language : undefined,
          userId: user.id,
          itemTypeId,
          collections: {
            create: {
              collectionId: savedCollection.id,
            },
          },
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
