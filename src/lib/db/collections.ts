import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export type DashboardItemTypeName =
  | "snippet"
  | "prompt"
  | "command"
  | "note"
  | "file"
  | "image"
  | "link";

export interface DashboardCollectionType {
  id: string;
  name: string;
  label: string;
  icon: string;
  color: string;
}

export interface DashboardCollection {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
  itemCount: number;
  dominantTypeName: DashboardItemTypeName;
  itemTypes: DashboardCollectionType[];
}

export interface DashboardCollectionStats {
  itemCount: number;
  collectionCount: number;
  favoriteItemCount: number;
  favoriteCollectionCount: number;
}

export interface DashboardCollectionsData {
  collections: DashboardCollection[];
  stats: DashboardCollectionStats;
}

export interface DashboardSidebarCollection {
  id: string;
  name: string;
  itemCount: number;
  dominantTypeName: DashboardItemTypeName;
}

export interface DashboardSidebarCollectionsData {
  favoriteCollections: DashboardSidebarCollection[];
  recentCollections: DashboardSidebarCollection[];
}

export interface DashboardSidebarUser {
  name: string;
  email: string;
  image: string | null;
}

interface DashboardSessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const itemTypeNames = [
  "snippet",
  "prompt",
  "command",
  "note",
  "file",
  "image",
  "link",
] as const satisfies readonly DashboardItemTypeName[];

const itemTypeNameSet = new Set<string>(itemTypeNames);
const DASHBOARD_COLLECTIONS_LIMIT = 6;
const DASHBOARD_FAVORITE_COLLECTIONS_LIMIT = 4;
const DASHBOARD_RECENT_COLLECTIONS_LIMIT = 5;

interface CollectionTypeCountRow {
  collectionId: string;
  itemTypeId: string;
  itemTypeName: string;
  itemTypeIcon: string;
  itemTypeColor: string;
  itemCount: number;
}

interface CollectionTypeSummary {
  dominantTypeName: DashboardItemTypeName;
  dominantTypeCount: number;
  itemTypes: DashboardCollectionType[];
}

export async function getDashboardCollectionsData(
  userId: string,
): Promise<DashboardCollectionsData> {
  const [
    collections,
    itemCount,
    collectionCount,
    favoriteItemCount,
    favoriteCollectionCount,
  ] = await Promise.all([
    prisma.collection.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: DASHBOARD_COLLECTIONS_LIMIT,
      select: {
        id: true,
        name: true,
        description: true,
        isFavorite: true,
        _count: {
          select: {
            items: { where: { item: { userId } } },
          },
        },
      },
    }),
    prisma.item.count({ where: { userId } }),
    prisma.collection.count({ where: { userId } }),
    prisma.item.count({ where: { userId, isFavorite: true } }),
    prisma.collection.count({ where: { userId, isFavorite: true } }),
  ]);
  const collectionTypeSummaries = await getCollectionTypeSummaries(
    collections.map((collection) => collection.id),
    userId,
  );

  return {
    collections: collections.map((collection) => {
      const typeSummary = collectionTypeSummaries.get(collection.id);

      return {
        id: collection.id,
        name: collection.name,
        description: collection.description ?? "",
        isFavorite: collection.isFavorite,
        itemCount: collection._count.items,
        dominantTypeName: typeSummary?.dominantTypeName ?? "snippet",
        itemTypes: typeSummary?.itemTypes ?? [],
      };
    }),
    stats: {
      itemCount,
      collectionCount,
      favoriteItemCount,
      favoriteCollectionCount,
    },
  };
}

export async function getDashboardSidebarCollectionsData(
  userId: string,
): Promise<DashboardSidebarCollectionsData> {
  const [favoriteCollections, recentCollections] = await Promise.all([
    prisma.collection.findMany({
      where: { userId, isFavorite: true },
      orderBy: { updatedAt: "desc" },
      take: DASHBOARD_FAVORITE_COLLECTIONS_LIMIT,
      select: dashboardSidebarCollectionSelect(userId),
    }),
    prisma.collection.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: DASHBOARD_RECENT_COLLECTIONS_LIMIT,
      select: dashboardSidebarCollectionSelect(userId),
    }),
  ]);
  const collectionTypeSummaries = await getCollectionTypeSummaries([
    ...new Set([
      ...favoriteCollections.map((collection) => collection.id),
      ...recentCollections.map((collection) => collection.id),
    ]),
  ], userId);

  return {
    favoriteCollections: favoriteCollections.map((collection) =>
      toDashboardSidebarCollection(
        collection,
        collectionTypeSummaries.get(collection.id),
      ),
    ),
    recentCollections: recentCollections.map((collection) =>
      toDashboardSidebarCollection(
        collection,
        collectionTypeSummaries.get(collection.id),
      ),
    ),
  };
}

export function getDashboardSidebarUser(
  user?: DashboardSessionUser,
): DashboardSidebarUser {
  return {
    name: user?.name ?? "DevStash User",
    email: user?.email ?? "user@devstash.local",
    image: user?.image ?? null,
  };
}

const dashboardSidebarCollectionSelect = (userId: string) => ({
  id: true,
  name: true,
  _count: {
    select: {
      items: { where: { item: { userId } } },
    },
  },
});

function toDashboardSidebarCollection(
  collection: {
    id: string;
    name: string;
    _count: {
      items: number;
    };
  },
  typeSummary: CollectionTypeSummary | undefined,
): DashboardSidebarCollection {
  return {
    id: collection.id,
    name: collection.name,
    itemCount: collection._count.items,
    dominantTypeName: typeSummary?.dominantTypeName ?? "snippet",
  };
}

async function getCollectionTypeSummaries(collectionIds: string[], userId: string) {
  if (collectionIds.length === 0) {
    return new Map<string, CollectionTypeSummary>();
  }

  const rows = await prisma.$queryRaw<CollectionTypeCountRow[]>(Prisma.sql`
    SELECT
      ic."collectionId" AS "collectionId",
      it."id" AS "itemTypeId",
      it."name" AS "itemTypeName",
      it."icon" AS "itemTypeIcon",
      it."color" AS "itemTypeColor",
      COUNT(*)::int AS "itemCount"
    FROM "item_collections" ic
    INNER JOIN "items" i ON i."id" = ic."itemId"
    INNER JOIN "item_types" it ON it."id" = i."itemTypeId"
    WHERE ic."collectionId" IN (${Prisma.join(collectionIds)})
      AND i."userId" = ${userId}
    GROUP BY ic."collectionId", it."id", it."name", it."icon", it."color"
    ORDER BY ic."collectionId" ASC, "itemCount" DESC, it."name" ASC
  `);

  return toCollectionTypeSummaries(rows);
}

function toCollectionTypeSummaries(rows: CollectionTypeCountRow[]) {
  const summaries = new Map<string, CollectionTypeSummary>();

  for (const row of rows) {
    const summary = summaries.get(row.collectionId) ?? {
      dominantTypeName: "snippet",
      dominantTypeCount: 0,
      itemTypes: [],
    };

    summary.itemTypes.push({
      id: row.itemTypeId,
      name: row.itemTypeName,
      label: toItemTypeLabel(row.itemTypeName),
      icon: row.itemTypeIcon,
      color: row.itemTypeColor,
    });

    if (
      row.itemCount > summary.dominantTypeCount &&
      isDashboardItemTypeName(row.itemTypeName)
    ) {
      summary.dominantTypeName = row.itemTypeName;
      summary.dominantTypeCount = row.itemCount;
    }

    summaries.set(row.collectionId, summary);
  }

  return summaries;
}

function isDashboardItemTypeName(value: string): value is DashboardItemTypeName {
  return itemTypeNameSet.has(value);
}

function toItemTypeLabel(name: string) {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}s`;
}
