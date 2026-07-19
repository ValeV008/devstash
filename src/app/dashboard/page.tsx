import { connection } from "next/server";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getDashboardCollectionsData } from "@/lib/db/collections";
import { getDashboardItemsData } from "@/lib/db/items";

export default async function DashboardPage() {
  await connection();

  const [collectionsData, itemsData] = await Promise.all([
    getDashboardCollectionsData(),
    getDashboardItemsData(),
  ]);

  return <DashboardShell collectionsData={collectionsData} itemsData={itemsData} />;
}
