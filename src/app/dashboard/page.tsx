import { connection } from "next/server";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  getDashboardCollectionsData,
  getDashboardSidebarCollectionsData,
  getDashboardSidebarUser,
} from "@/lib/db/collections";
import { getDashboardItemsData, getDashboardSidebarItemTypes } from "@/lib/db/items";

export default async function DashboardPage() {
  await connection();

  const [collectionsData, itemsData, sidebarCollectionsData, sidebarItemTypes, user] =
    await Promise.all([
      getDashboardCollectionsData(),
      getDashboardItemsData(),
      getDashboardSidebarCollectionsData(),
      getDashboardSidebarItemTypes(),
      getDashboardSidebarUser(),
    ]);

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
