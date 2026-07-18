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

export async function getDashboardCollectionsData(): Promise<DashboardCollectionsData> {
  const [
    collections,
    itemCount,
    collectionCount,
    favoriteItemCount,
    favoriteCollectionCount,
  ] = await Promise.all([
    prisma.collection.findMany({
      orderBy: { updatedAt: "desc" },
      take: 6,
      select: {
        id: true,
        name: true,
        description: true,
        isFavorite: true,
        items: {
          select: {
            item: {
              select: {
                itemType: {
                  select: {
                    id: true,
                    name: true,
                    icon: true,
                    color: true,
                  },
                },
              },
            },
          },
        },
      },
    }),
    prisma.item.count(),
    prisma.collection.count(),
    prisma.item.count({ where: { isFavorite: true } }),
    prisma.collection.count({ where: { isFavorite: true } }),
  ]);

  return {
    collections: collections.map((collection) => {
      const itemTypes = getCollectionItemTypes(collection.items);

      return {
        id: collection.id,
        name: collection.name,
        description: collection.description ?? "",
        isFavorite: collection.isFavorite,
        itemCount: collection.items.length,
        dominantTypeName: getDominantTypeName(collection.items),
        itemTypes,
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

function getCollectionItemTypes(
  items: Array<{
    item: {
      itemType: {
        id: string;
        name: string;
        icon: string;
        color: string;
      };
    };
  }>,
) {
  const itemTypes = new Map<string, DashboardCollectionType>();

  for (const { item } of items) {
    itemTypes.set(item.itemType.id, {
      id: item.itemType.id,
      name: item.itemType.name,
      label: toItemTypeLabel(item.itemType.name),
      icon: item.itemType.icon,
      color: item.itemType.color,
    });
  }

  return [...itemTypes.values()];
}

function getDominantTypeName(
  items: Array<{
    item: {
      itemType: {
        name: string;
      };
    };
  }>,
): DashboardItemTypeName {
  const counts = new Map<string, number>();

  for (const { item } of items) {
    counts.set(item.itemType.name, (counts.get(item.itemType.name) ?? 0) + 1);
  }

  let dominantName: DashboardItemTypeName = "snippet";
  let dominantCount = 0;

  for (const [name, count] of counts) {
    if (count > dominantCount && isDashboardItemTypeName(name)) {
      dominantName = name;
      dominantCount = count;
    }
  }

  return dominantName;
}

function isDashboardItemTypeName(value: string): value is DashboardItemTypeName {
  return itemTypeNameSet.has(value);
}

function toItemTypeLabel(name: string) {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}s`;
}
