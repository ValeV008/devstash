"use client";

import Link from "next/link";
import {
  Clock,
  Code,
  File,
  Folder,
  Image as ImageIcon,
  Link as LinkIcon,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Sparkles,
  Star,
  StickyNote,
  Terminal,
  X,
  type LucideIcon,
} from "lucide-react";
import { type ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  mockDashboardData,
  type MockCollection,
  type MockItemType,
  type MockItemTypeId,
} from "@/lib/mock-data";
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

const itemTypeAccentClasses: Record<MockItemTypeId, string> = {
  snippet: "bg-blue-500",
  prompt: "bg-violet-500",
  command: "bg-orange-500",
  note: "bg-yellow-400",
  file: "bg-zinc-500",
  image: "bg-pink-500",
  link: "bg-emerald-500",
};

const itemTypeHoverClasses: Record<MockItemTypeId, string> = {
  snippet: "hover:border-blue-500/50 hover:bg-blue-500/10",
  prompt: "hover:border-violet-500/50 hover:bg-violet-500/10",
  command: "hover:border-orange-500/50 hover:bg-orange-500/10",
  note: "hover:border-yellow-400/50 hover:bg-yellow-400/10",
  file: "hover:border-zinc-500/50 hover:bg-zinc-500/10",
  image: "hover:border-pink-500/50 hover:bg-pink-500/10",
  link: "hover:border-emerald-500/50 hover:bg-emerald-500/10",
};

export function DashboardShell() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="flex h-16 items-center gap-3 border-b bg-card px-4 sm:px-6">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open sidebar"
          aria-controls="dashboard-mobile-sidebar"
          aria-expanded={isMobileSidebarOpen}
          onClick={() => setIsMobileSidebarOpen(true)}
        >
          <Menu />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="hidden lg:inline-flex"
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-controls="dashboard-desktop-sidebar"
          aria-expanded={!isSidebarCollapsed}
          onClick={() => setIsSidebarCollapsed((current) => !current)}
        >
          {isSidebarCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        </Button>

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <h1 className="shrink-0 text-lg font-semibold tracking-normal">
            DevStash
          </h1>
          <div className="relative hidden w-full max-w-xl sm:block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label="Search"
              placeholder="Search snippets, commands, prompts..."
              className="pl-9"
              readOnly
            />
          </div>
        </div>

        <Button type="button" aria-label="New item">
          <Plus />
          <span className="hidden sm:inline">New Item</span>
        </Button>
      </header>

      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      <div
        className={cn(
          "grid min-h-[calc(100vh-4rem)] grid-cols-1 transition-[grid-template-columns] duration-200 lg:grid-cols-[17rem_1fr]",
          isSidebarCollapsed && "lg:grid-cols-[4.75rem_1fr]",
        )}
      >
        <aside
          id="dashboard-desktop-sidebar"
          className="hidden min-h-0 border-r bg-card/60 lg:flex"
        >
          <SidebarContent collapsed={isSidebarCollapsed} />
        </aside>

        <section className="min-w-0 p-4 sm:p-6">
          <h2 className="text-xl font-semibold">Main</h2>
        </section>
      </div>
    </main>
  );
}

function MobileSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-background/80"
        aria-label="Close sidebar"
        onClick={onClose}
      />
      <aside
        id="dashboard-mobile-sidebar"
        className="absolute inset-y-0 left-0 flex w-[min(20rem,calc(100vw-2rem))] border-r bg-card shadow-2xl"
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex h-16 items-center justify-between border-b px-4">
            <span className="text-sm font-semibold">DevStash</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Close sidebar"
              onClick={onClose}
            >
              <X />
            </Button>
          </div>
          <SidebarContent collapsed={false} onLinkClick={onClose} />
        </div>
      </aside>
    </div>
  );
}

function SidebarContent({
  collapsed,
  onLinkClick,
}: {
  collapsed: boolean;
  onLinkClick?: () => void;
}) {
  const favoriteCollections = mockDashboardData.collections
    .filter((collection) => collection.isFavorite)
    .slice(0, 4);
  const recentCollections = [...mockDashboardData.collections]
    .sort(
      (first, second) =>
        new Date(second.updatedAt).getTime() -
        new Date(first.updatedAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-3",
        !collapsed && "p-4",
      )}
    >
      <SidebarSection
        title="Types"
        icon={Folder}
        collapsed={collapsed}
        className="gap-1.5"
      >
        {mockDashboardData.itemTypes.map((itemType) => (
          <ItemTypeLink
            key={itemType.id}
            itemType={itemType}
            collapsed={collapsed}
            onClick={onLinkClick}
          />
        ))}
      </SidebarSection>

      <SidebarSection title="Favorites" icon={Star} collapsed={collapsed}>
        {favoriteCollections.map((collection) => (
          <CollectionLink
            key={collection.id}
            collection={collection}
            collapsed={collapsed}
            onClick={onLinkClick}
          />
        ))}
      </SidebarSection>

      <SidebarSection title="Recent" icon={Clock} collapsed={collapsed}>
        {recentCollections.map((collection) => (
          <CollectionLink
            key={collection.id}
            collection={collection}
            collapsed={collapsed}
            onClick={onLinkClick}
          />
        ))}
      </SidebarSection>

      <UserArea collapsed={collapsed} />
    </div>
  );
}

function SidebarSection({
  title,
  icon: Icon,
  collapsed,
  className,
  children,
}: {
  title: string;
  icon: LucideIcon;
  collapsed: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-2">
      <div
        className={cn(
          "flex h-5 items-center gap-2 px-2 text-xs font-semibold tracking-normal text-muted-foreground uppercase",
          collapsed && "justify-center px-0",
        )}
      >
        {collapsed ? (
          <Icon className="size-4" aria-label={title} />
        ) : (
          <span>{title}</span>
        )}
      </div>
      <div className={cn("flex flex-col gap-1", className)}>{children}</div>
    </section>
  );
}

function ItemTypeLink({
  itemType,
  collapsed,
  onClick,
}: {
  itemType: MockItemType;
  collapsed: boolean;
  onClick?: () => void;
}) {
  const Icon = itemTypeIcons[itemType.icon] ?? File;

  return (
    <Link
      href={itemType.route}
      title={collapsed ? itemType.label : undefined}
      onClick={onClick}
      className={cn(
        "flex h-10 items-center gap-3 rounded-md border border-transparent px-2 text-sm text-muted-foreground transition-colors",
        "hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
        itemTypeHoverClasses[itemType.id],
        collapsed && "justify-center px-0",
      )}
    >
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-md text-white",
          itemTypeAccentClasses[itemType.id],
        )}
      >
        <Icon className="size-4" />
      </span>
      {!collapsed && (
        <>
          <span className="min-w-0 flex-1 truncate">{itemType.label}</span>
          <span className="text-xs text-muted-foreground">
            {itemType.itemCount}
          </span>
        </>
      )}
    </Link>
  );
}

function CollectionLink({
  collection,
  collapsed,
  onClick,
}: {
  collection: MockCollection;
  collapsed: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={`/collections/${collection.id}`}
      title={collapsed ? collection.name : undefined}
      onClick={onClick}
      className={cn(
        "flex h-9 items-center gap-3 rounded-md px-2 text-sm text-muted-foreground transition-colors",
        "hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
        collapsed && "justify-center px-0",
      )}
    >
      <span
        className={cn(
          "size-2.5 shrink-0 rounded-full",
          itemTypeAccentClasses[collection.defaultTypeId],
          collapsed && "size-3",
        )}
      />
      {!collapsed && (
        <>
          <span className="min-w-0 flex-1 truncate">{collection.name}</span>
          <span className="text-xs text-muted-foreground">
            {collection.itemCount}
          </span>
        </>
      )}
    </Link>
  );
}

function UserArea({ collapsed }: { collapsed: boolean }) {
  const user = mockDashboardData.currentUser;
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mt-auto border-t pt-3">
      <div
        className={cn(
          "flex items-center gap-3 rounded-md px-2 py-2",
          collapsed && "justify-center px-0",
        )}
      >
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-sm font-semibold text-secondary-foreground">
          {initials}
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
