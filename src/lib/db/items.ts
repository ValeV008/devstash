import { prisma } from "@/lib/prisma";
import { type DashboardItemTypeName } from "@/lib/db/collections";

export interface DashboardItemType {
  id: string;
  name: string;
  label: string;
  icon: string;
  color: string;
  route: string;
}

export interface DashboardItem {
  id: string;
  title: string;
  description: string;
  isFavorite: boolean;
  isPinned: boolean;
  updatedAt: string;
  itemType: DashboardItemType;
  typeName: DashboardItemTypeName;
  tags: string[];
}

export interface DashboardItemsData {
  pinnedItems: DashboardItem[];
  recentItems: DashboardItem[];
}

export interface DashboardSidebarItemType {
  id: string;
  name: DashboardItemTypeName;
  label: string;
  icon: string;
  color: string;
  itemCount: number;
  route: string;
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

export async function getDashboardItemsData(): Promise<DashboardItemsData> {
  const [pinnedItems, recentItems] = await Promise.all([
    prisma.item.findMany({
      where: { isPinned: true },
      orderBy: { updatedAt: "desc" },
      select: dashboardItemSelect,
    }),
    prisma.item.findMany({
      orderBy: { updatedAt: "desc" },
      take: 10,
      select: dashboardItemSelect,
    }),
  ]);

  return {
    pinnedItems: pinnedItems.map(toDashboardItem),
    recentItems: recentItems.map(toDashboardItem),
  };
}

export async function getDashboardSidebarItemTypes(): Promise<
  DashboardSidebarItemType[]
> {
  const itemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
    select: {
      id: true,
      name: true,
      icon: true,
      color: true,
      _count: {
        select: {
          items: true,
        },
      },
    },
  });

  return itemTypes
    .map((itemType) => {
      const name = getDashboardItemTypeName(itemType.name);

      return {
        id: itemType.id,
        name,
        label: toItemTypeLabel(itemType.name),
        icon: itemType.icon,
        color: itemType.color,
        itemCount: itemType._count.items,
        route: `/items/${toItemTypeLabel(itemType.name).toLowerCase()}`,
      };
    })
    .sort(
      (first, second) =>
        itemTypeNames.indexOf(first.name) - itemTypeNames.indexOf(second.name),
    );
}

const dashboardItemSelect = {
  id: true,
  title: true,
  description: true,
  isFavorite: true,
  isPinned: true,
  updatedAt: true,
  itemType: {
    select: {
      id: true,
      name: true,
      icon: true,
      color: true,
    },
  },
  tags: {
    select: {
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  },
} as const;

function toDashboardItem(item: {
  id: string;
  title: string;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  updatedAt: Date;
  itemType: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
  tags: Array<{ name: string }>;
}): DashboardItem {
  const typeName = getDashboardItemTypeName(item.itemType.name);

  return {
    id: item.id,
    title: item.title,
    description: item.description ?? "",
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    updatedAt: item.updatedAt.toISOString(),
    itemType: {
      id: item.itemType.id,
      name: item.itemType.name,
      label: toItemTypeLabel(item.itemType.name),
      icon: item.itemType.icon,
      color: item.itemType.color,
      route: `/items/${toItemTypeLabel(item.itemType.name).toLowerCase()}`,
    },
    typeName,
    tags: item.tags.map((tag) => tag.name),
  };
}

function getDashboardItemTypeName(name: string): DashboardItemTypeName {
  return itemTypeNameSet.has(name) ? (name as DashboardItemTypeName) : "snippet";
}

function toItemTypeLabel(name: string) {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}s`;
}
