"use client";
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
  Settings,
  Sparkles,
  Star,
  StickyNote,
  Terminal,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { type ReactNode, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/ui/user-avatar";
import {
  type DashboardItemTypeName,
  type DashboardSidebarCollection,
  type DashboardSidebarUser,
} from "@/lib/db/collections";
import { type DashboardSidebarItemType } from "@/lib/db/items";
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

const itemTypeAccentClasses: Record<DashboardItemTypeName, string> = {
  snippet: "bg-blue-500",
  prompt: "bg-violet-500",
  command: "bg-orange-500",
  note: "bg-yellow-400",
  file: "bg-zinc-500",
  image: "bg-pink-500",
  link: "bg-emerald-500",
};

export interface DashboardSidebarData {
  itemTypes: DashboardSidebarItemType[];
  favoriteCollections: DashboardSidebarCollection[];
  recentCollections: DashboardSidebarCollection[];
  user: DashboardSidebarUser;
}

export function DashboardFrame({
  children,
  sidebarData,
}: {
  children: ReactNode;
  sidebarData: DashboardSidebarData;
}) {
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
          <h1 className="shrink-0 text-lg font-semibold tracking-normal">DevStash</h1>
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
        sidebarData={sidebarData}
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
          <SidebarContent collapsed={isSidebarCollapsed} sidebarData={sidebarData} />
        </aside>

        {children}
      </div>
    </main>
  );
}

function MobileSidebar({
  isOpen,
  sidebarData,
  onClose,
}: {
  isOpen: boolean;
  sidebarData: DashboardSidebarData;
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
          <SidebarContent collapsed={false} sidebarData={sidebarData} />
        </div>
      </aside>
    </div>
  );
}

function SidebarContent({
  collapsed,
  sidebarData,
}: {
  collapsed: boolean;
  sidebarData: DashboardSidebarData;
}) {
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
        {sidebarData.itemTypes.map((itemType) => (
          <ItemTypeLink key={itemType.id} itemType={itemType} collapsed={collapsed} />
        ))}
      </SidebarSection>

      <SidebarSection title="Favorites" icon={Star} collapsed={collapsed}>
        {sidebarData.favoriteCollections.map((collection) => (
          <CollectionLink
            key={collection.id}
            collection={collection}
            marker="favorite"
            collapsed={collapsed}
          />
        ))}
      </SidebarSection>

      <SidebarSection title="Recent" icon={Clock} collapsed={collapsed}>
        {sidebarData.recentCollections.map((collection) => (
          <CollectionLink
            key={collection.id}
            collection={collection}
            marker="dominantType"
            collapsed={collapsed}
          />
        ))}
      </SidebarSection>

      <UserArea collapsed={collapsed} user={sidebarData.user} />
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
}: {
  itemType: DashboardSidebarItemType;
  collapsed: boolean;
}) {
  const Icon = itemTypeIcons[itemType.icon] ?? File;
  const isProType = itemType.name === "file" || itemType.name === "image";

  return (
    <div
      title={collapsed ? itemType.label : undefined}
      className={cn(
        "flex h-10 items-center gap-3 rounded-md border border-transparent px-2 text-sm text-muted-foreground",
        collapsed && "justify-center px-0",
      )}
    >
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-md text-white",
          itemTypeAccentClasses[itemType.name],
        )}
      >
        <Icon className="size-4" />
      </span>
      {!collapsed && (
        <>
          <span className="flex min-w-0 flex-1 items-center gap-2">
            <span className="min-w-0 truncate">{itemType.label}</span>
            {isProType && (
              <Badge
                variant="outline"
                className="border-border/70 bg-background/40 px-1.5 py-0 text-[0.625rem] leading-4 font-semibold tracking-normal text-muted-foreground"
              >
                PRO
              </Badge>
            )}
          </span>
          <span className="text-xs text-muted-foreground">{itemType.itemCount}</span>
        </>
      )}
    </div>
  );
}

function CollectionLink({
  collection,
  marker,
  collapsed,
}: {
  collection: DashboardSidebarCollection;
  marker: "favorite" | "dominantType";
  collapsed: boolean;
}) {
  return (
    <div
      title={collapsed ? collection.name : undefined}
      className={cn(
        "flex h-9 items-center gap-3 rounded-md px-2 text-sm text-muted-foreground",
        collapsed && "justify-center px-0",
      )}
    >
      {marker === "favorite" ? (
        <Star className="size-4 shrink-0 fill-yellow-400 text-yellow-400" />
      ) : (
        <span
          className={cn(
            "size-2.5 shrink-0 rounded-full",
            itemTypeAccentClasses[collection.dominantTypeName],
            collapsed && "size-3",
          )}
        />
      )}
      {!collapsed && (
        <>
          <span className="min-w-0 flex-1 truncate">{collection.name}</span>
          <span className="text-xs text-muted-foreground">{collection.itemCount}</span>
        </>
      )}
    </div>
  );
}

function UserArea({
  collapsed,
  user,
}: {
  collapsed: boolean;
  user: DashboardSidebarUser;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative mt-auto border-t pt-3">
      {isMenuOpen && (
        <div
          className={cn(
            "absolute bottom-full z-10 mb-2 min-w-48 rounded-lg border bg-popover p-1 shadow-xl shadow-black/30",
            collapsed ? "left-1/2 -translate-x-1/2" : "left-0 right-0",
          )}
        >
          <Button
            asChild
            variant="ghost"
            className="h-9 w-full justify-start px-2 text-sm"
          >
            <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
              <Settings />
              Profile
            </Link>
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-9 w-full justify-start px-2 text-sm text-muted-foreground"
            onClick={() => void signOut({ callbackUrl: "/sign-in" })}
          >
            <X />
            Sign out
          </Button>
        </div>
      )}
      <div
        className={cn(
          "flex items-center gap-3 rounded-md px-2 py-2",
          collapsed && "justify-center px-0",
        )}
      >
        <button
          type="button"
          className="rounded-md outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          aria-label="Open user menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <UserAvatar name={user.name} image={user.image} />
        </button>
        <Link
          href="/profile"
          className="flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-secondary hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          aria-label="View profile"
        >
          <UserRound className="size-4" />
        </Link>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
