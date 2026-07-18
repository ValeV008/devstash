import Link from "next/link";
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

import { DashboardFrame } from "@/components/dashboard/DashboardFrame";
import { Button } from "@/components/ui/button";
import {
  type DashboardCollection,
  type DashboardCollectionsData,
  type DashboardItemTypeName,
} from "@/lib/db/collections";
import { mockDashboardData, type MockItem, type MockItemTypeId } from "@/lib/mock-data";
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

const mockItemTypeTextClasses: Record<MockItemTypeId, string> = itemTypeTextClasses;
const mockItemTypeBorderClasses: Record<MockItemTypeId, string> = itemTypeBorderClasses;

export function DashboardShell({
  collectionsData,
}: {
  collectionsData: DashboardCollectionsData;
}) {
  return (
    <DashboardFrame>
      <DashboardMain collectionsData={collectionsData} />
    </DashboardFrame>
  );
}

function DashboardMain({
  collectionsData,
}: {
  collectionsData: DashboardCollectionsData;
}) {
  const { collections, stats: collectionStats } = collectionsData;
  const pinnedItems = mockDashboardData.items
    .filter((item) => item.isPinned)
    .sort(
      (first, second) =>
        new Date(second.lastUsedAt).getTime() - new Date(first.lastUsedAt).getTime(),
    );
  const recentItems = [...mockDashboardData.items]
    .sort(
      (first, second) =>
        new Date(second.lastUsedAt).getTime() - new Date(first.lastUsedAt).getTime(),
    )
    .slice(0, 10);
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

        <DashboardSection title="Recent collections" actionLabel="View all">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </DashboardSection>

        <DashboardSection title="Pinned items" icon={Pin}>
          <div className="grid gap-3">
            {pinnedItems.map((item) => (
              <ItemRow key={item.id} item={item} featured />
            ))}
          </div>
        </DashboardSection>

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
  actionLabel,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  actionLabel?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex min-h-9 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2">
          {Icon && <Icon className="size-5 shrink-0 text-muted-foreground" />}
          <h3 className="truncate text-xl font-semibold tracking-normal">{title}</h3>
        </div>
        {actionLabel && (
          <Button type="button" variant="ghost" size="sm">
            {actionLabel}
          </Button>
        )}
      </div>
      {children}
    </section>
  );
}

function CollectionCard({ collection }: { collection: DashboardCollection }) {
  return (
    <Link
      href={`/collections/${collection.id}`}
      className={cn(
        "group flex min-h-44 flex-col rounded-lg border border-l-4 bg-card/70 p-5 transition-colors",
        "hover:border-r-border hover:border-y-border hover:bg-accent/40 focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
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
        <MoreHorizontal className="size-5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
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
    </Link>
  );
}

function ItemRow({ item, featured = false }: { item: MockItem; featured?: boolean }) {
  const itemType = getItemType(item.itemTypeId);
  const Icon = itemTypeIcons[itemType.icon] ?? File;

  return (
    <Link
      href={itemType.route}
      className={cn(
        "grid gap-4 rounded-lg border border-l-4 bg-card/70 p-4 transition-colors sm:grid-cols-[1fr_auto]",
        "hover:border-r-border hover:border-y-border hover:bg-accent/40 focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
        mockItemTypeBorderClasses[item.itemTypeId],
        featured && "min-h-28",
      )}
    >
      <div className="flex min-w-0 gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-secondary">
          <Icon className={cn("size-5", mockItemTypeTextClasses[item.itemTypeId])} />
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
        {formatShortDate(item.lastUsedAt)}
      </time>
    </Link>
  );
}

function getItemType(itemTypeId: MockItemTypeId) {
  return (
    mockDashboardData.itemTypes.find((itemType) => itemType.id === itemTypeId) ??
    mockDashboardData.itemTypes[0]
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
