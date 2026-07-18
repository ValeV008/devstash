import { connection } from "next/server";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getDashboardCollectionsData } from "@/lib/db/collections";

export default async function DashboardPage() {
  await connection();

  const collectionsData = await getDashboardCollectionsData();

  return <DashboardShell collectionsData={collectionsData} />;
}
