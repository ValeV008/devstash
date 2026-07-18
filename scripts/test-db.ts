import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to test the database connection.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const demoUserEmail = "demo@devstash.io";
const demoUserPassword = "12345678";

const expectedSystemItemTypes = [
  { name: "command", icon: "Terminal", color: "#f97316" },
  { name: "file", icon: "File", color: "#6b7280" },
  { name: "image", icon: "Image", color: "#ec4899" },
  { name: "link", icon: "Link", color: "#10b981" },
  { name: "note", icon: "StickyNote", color: "#fde047" },
  { name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
  { name: "snippet", icon: "Code", color: "#3b82f6" },
] as const;

const expectedCollectionItemCounts = new Map([
  ["AI Workflows", 3],
  ["Design Resources", 4],
  ["DevOps", 4],
  ["React Patterns", 3],
  ["Terminal Commands", 4],
]);

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

async function main() {
  const [
    userCount,
    itemTypeCount,
    systemItemTypeCount,
    collectionCount,
    itemCount,
    tagCount,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.itemType.count(),
    prisma.itemType.count({ where: { isSystem: true } }),
    prisma.collection.count(),
    prisma.item.count(),
    prisma.tag.count(),
  ]);

  const [systemItemTypes, demoUser] = await Promise.all([
    prisma.itemType.findMany({
      where: { isSystem: true },
      orderBy: { name: "asc" },
      select: {
        name: true,
        icon: true,
        color: true,
      },
    }),
    prisma.user.findUnique({
      where: { email: demoUserEmail },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        isPro: true,
        emailVerified: true,
        collections: {
          orderBy: { name: "asc" },
          select: {
            name: true,
            description: true,
            defaultType: {
              select: {
                name: true,
              },
            },
            items: {
              select: {
                item: {
                  select: {
                    title: true,
                    description: true,
                    contentType: true,
                    language: true,
                    url: true,
                    itemType: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }),
  ]);

  assert(demoUser !== null, `Seeded demo user ${demoUserEmail} was not found.`);
  assert(demoUser.name === "Demo User", "Demo user name does not match seed spec.");
  assert(demoUser.isPro === false, "Demo user should not be marked as pro.");
  assert(demoUser.emailVerified !== null, "Demo user email should be verified.");
  assert(demoUser.password !== null, "Demo user should have a password hash.");
  assert(
    await bcrypt.compare(demoUserPassword, demoUser.password),
    "Demo user password hash does not match the seed password.",
  );

  assert(
    systemItemTypes.length === expectedSystemItemTypes.length,
    `Expected ${expectedSystemItemTypes.length} system item types, found ${systemItemTypes.length}.`,
  );

  for (const expectedType of expectedSystemItemTypes) {
    const itemType = systemItemTypes.find(({ name }) => name === expectedType.name);

    assert(itemType !== undefined, `Missing system item type: ${expectedType.name}.`);
    assert(
      itemType.icon === expectedType.icon,
      `${expectedType.name} icon is incorrect.`,
    );
    assert(
      itemType.color === expectedType.color,
      `${expectedType.name} color is incorrect.`,
    );
  }

  assert(
    demoUser.collections.length === expectedCollectionItemCounts.size,
    `Expected ${expectedCollectionItemCounts.size} demo collections, found ${demoUser.collections.length}.`,
  );

  for (const collection of demoUser.collections) {
    const expectedItemCount = expectedCollectionItemCounts.get(collection.name);

    assert(
      expectedItemCount !== undefined,
      `Unexpected demo collection: ${collection.name}.`,
    );
    assert(
      collection.items.length === expectedItemCount,
      `${collection.name} should have ${expectedItemCount} items, found ${collection.items.length}.`,
    );
  }

  const demoCollections = demoUser.collections.map((collection) => ({
    name: collection.name,
    description: collection.description,
    defaultType: collection.defaultType?.name ?? null,
    itemCount: collection.items.length,
    items: collection.items
      .map(({ item }) => ({
        title: item.title,
        type: item.itemType.name,
        contentType: item.contentType,
        language: item.language,
        url: item.url,
        description: item.description,
      }))
      .sort((firstItem, secondItem) => firstItem.title.localeCompare(secondItem.title)),
  }));

  const itemTypeSummary = await prisma.item.groupBy({
    by: ["itemTypeId"],
    where: { userId: demoUser.id },
    _count: true,
  });

  const itemTypesById = await prisma.itemType.findMany({
    where: { id: { in: itemTypeSummary.map(({ itemTypeId }) => itemTypeId) } },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
    },
  });

  const typeNamesById = new Map(
    itemTypesById.map((itemType) => [itemType.id, itemType.name]),
  );
  const demoItemsByType = itemTypeSummary
    .map((summary) => ({
      type: typeNamesById.get(summary.itemTypeId) ?? summary.itemTypeId,
      count: summary._count,
    }))
    .sort((firstItemType, secondItemType) =>
      firstItemType.type.localeCompare(secondItemType.type),
    );

  console.log("Database connection OK");
  console.log("Demo seed data OK");
  console.log(
    JSON.stringify(
      {
        counts: {
          users: userCount,
          itemTypes: itemTypeCount,
          systemItemTypes: systemItemTypeCount,
          collections: collectionCount,
          items: itemCount,
          tags: tagCount,
        },
        systemItemTypes,
        demoUser: {
          email: demoUser.email,
          name: demoUser.name,
          isPro: demoUser.isPro,
          emailVerified: demoUser.emailVerified,
          collections: demoCollections,
          itemsByType: demoItemsByType,
        },
      },
      null,
      2,
    ),
  );
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
