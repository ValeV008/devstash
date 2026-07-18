import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

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

async function main() {
  for (const itemType of systemItemTypes) {
    await prisma.itemType.upsert({
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
