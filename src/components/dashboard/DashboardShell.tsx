import {
  Code,
  Database,
  File,
  FolderOpen,
  Heart,
  Image as ImageIcon,
  Link as LinkIcon,
  MoreHorizontal,
  Pin,
  Sparkles,
  Star,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { type ReactNode } from "react";

import {
  DashboardFrame,
  type DashboardSidebarData,
} from "@/components/dashboard/DashboardFrame";
import {
  type DashboardCollection,
  type DashboardCollectionsData,
  type DashboardItemTypeName,
} from "@/lib/db/collections";
import { type DashboardItem, type DashboardItemsData } from "@/lib/db/items";
import { cn } from "@/lib/utils";

const itemTypeIcons: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image: ImageIcon,
  Link: LinkIcon,
};

const itemTypeTextClasses: Record<DashboardItemTypeName, string> = {
  snippet: "text-blue-400",
  prompt: "text-violet-400",
  command: "text-orange-400",
  note: "text-yellow-300",
  file: "text-zinc-400",
  image: "text-pink-400",
  link: "text-emerald-400",
};

const itemTypeBorderClasses: Record<DashboardItemTypeName, string> = {
  snippet: "border-l-blue-500",
  prompt: "border-l-violet-500",
  command: "border-l-orange-500",
  note: "border-l-yellow-400",
  file: "border-l-zinc-500",
  image: "border-l-pink-500",
  link: "border-l-emerald-500",
};

export function DashboardShell({
  collectionsData,
  itemsData,
  sidebarData,
}: {
  collectionsData: DashboardCollectionsData;
  itemsData: DashboardItemsData;
  sidebarData: DashboardSidebarData;
}) {
  return (
    <DashboardFrame sidebarData={sidebarData}>
      <DashboardMain collectionsData={collectionsData} itemsData={itemsData} />
    </DashboardFrame>
  );
}

function DashboardMain({
  collectionsData,
  itemsData,
}: {
  collectionsData: DashboardCollectionsData;
  itemsData: DashboardItemsData;
}) {
  const { collections, stats: collectionStats } = collectionsData;
  const { pinnedItems, recentItems } = itemsData;
  const stats = [
    {
      label: "Items",
      value: collectionStats.itemCount,
      icon: Database,
      tone: "text-blue-400",
    },
    {
      label: "Collections",
      value: collectionStats.collectionCount,
      icon: FolderOpen,
      tone: "text-emerald-400",
    },
    {
      label: "Favorite items",
      value: collectionStats.favoriteItemCount,
      icon: Heart,
      tone: "text-pink-400",
    },
    {
      label: "Favorite collections",
      value: collectionStats.favoriteCollectionCount,
      icon: Star,
      tone: "text-yellow-300",
    },
  ];

  return (
    <section className="min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-normal">Dashboard</h2>
          <p className="text-base text-muted-foreground">
            Your developer knowledge hub
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <DashboardSection title="Recent collections">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </DashboardSection>

        {pinnedItems.length > 0 && (
          <DashboardSection title="Pinned items" icon={Pin}>
            <div className="grid gap-3">
              {pinnedItems.map((item) => (
                <ItemRow key={item.id} item={item} featured />
              ))}
            </div>
          </DashboardSection>
        )}

        <DashboardSection title="Recent items">
          <div className="grid gap-3">
            {recentItems.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </div>
        </DashboardSection>
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  tone: string;
}) {
  return (
    <div className="rounded-lg border bg-card/70 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-normal">{value}</p>
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary">
          <Icon className={cn("size-5", tone)} />
        </div>
      </div>
    </div>
  );
}

function DashboardSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex min-h-9 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2">
          {Icon && <Icon className="size-5 shrink-0 text-muted-foreground" />}
          <h3 className="truncate text-xl font-semibold tracking-normal">{title}</h3>
        </div>
      </div>
      {children}
    </section>
  );
}

function CollectionCard({ collection }: { collection: DashboardCollection }) {
  return (
    <article
      className={cn(
        "flex min-h-44 flex-col rounded-lg border border-l-4 bg-card/70 p-5",
        itemTypeBorderClasses[collection.dominantTypeName],
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="truncate text-base font-semibold">{collection.name}</h4>
            {collection.isFavorite && (
              <Star className="size-4 shrink-0 fill-yellow-400 text-yellow-400" />
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {collection.itemCount} items
          </p>
        </div>
        <MoreHorizontal className="size-5 shrink-0 text-muted-foreground" />
      </div>
      <p className="mt-5 line-clamp-2 text-sm text-muted-foreground">
        {collection.description}
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {collection.itemTypes.map((itemType) => {
          const Icon = itemTypeIcons[itemType.icon] ?? File;
          const textClass = getItemTypeTextClass(itemType.name);

          return (
            <Icon
              key={itemType.id}
              className={cn("size-4", textClass)}
              aria-label={itemType.label}
            />
          );
        })}
      </div>
    </article>
  );
}

function ItemRow({
  item,
  featured = false,
}: {
  item: DashboardItem;
  featured?: boolean;
}) {
  const itemType = item.itemType;
  const Icon = itemTypeIcons[itemType.icon] ?? File;

  return (
    <article
      className={cn(
        "grid gap-4 rounded-lg border border-l-4 bg-card/70 p-4 sm:grid-cols-[1fr_auto]",
        itemTypeBorderClasses[item.typeName],
        featured && "min-h-28",
      )}
    >
      <div className="flex min-w-0 gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-secondary">
          <Icon className={cn("size-5", itemTypeTextClasses[item.typeName])} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="truncate text-base font-semibold">{item.title}</h4>
            {item.isPinned && (
              <Pin className="size-4 shrink-0 fill-muted-foreground text-muted-foreground" />
            )}
            {item.isFavorite && (
              <Star className="size-4 shrink-0 fill-yellow-400 text-yellow-400" />
            )}
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {item.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <time className="text-sm whitespace-nowrap text-muted-foreground sm:pt-4">
        {formatShortDate(item.updatedAt)}
      </time>
    </article>
  );
}

function getItemTypeTextClass(name: string) {
  return isDashboardItemTypeName(name) ? itemTypeTextClasses[name] : "text-zinc-400";
}

function isDashboardItemTypeName(value: string): value is DashboardItemTypeName {
  return value in itemTypeTextClasses;
}

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}
