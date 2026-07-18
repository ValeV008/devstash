import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to test the database connection.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

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

  const systemItemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
    orderBy: { name: "asc" },
    select: {
      name: true,
      icon: true,
      color: true,
    },
  });

  console.log("Database connection OK");
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
