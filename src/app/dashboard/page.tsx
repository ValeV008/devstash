import { connection } from "next/server";

import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  getDashboardCollectionsData,
  getDashboardSidebarCollectionsData,
  getDashboardSidebarUser,
} from "@/lib/db/collections";
import { getDashboardItemsData, getDashboardSidebarItemTypes } from "@/lib/db/items";

export default async function DashboardPage() {
  await connection();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const [collectionsData, itemsData, sidebarCollectionsData, sidebarItemTypes] =
    await Promise.all([
      getDashboardCollectionsData(userId),
      getDashboardItemsData(userId),
      getDashboardSidebarCollectionsData(userId),
      getDashboardSidebarItemTypes(userId),
    ]);
  const user = getDashboardSidebarUser(session?.user);

  return (
    <DashboardShell
      collectionsData={collectionsData}
      itemsData={itemsData}
      sidebarData={{
        itemTypes: sidebarItemTypes,
        favoriteCollections: sidebarCollectionsData.favoriteCollections,
        recentCollections: sidebarCollectionsData.recentCollections,
        user,
      }}
    />
  );
}
