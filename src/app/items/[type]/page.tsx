import Link from "next/link";
import { notFound } from "next/navigation";

import { mockDashboardData, type MockItemType } from "@/lib/mock-data";

function getItemTypeSegment(itemType: MockItemType) {
  const segments = itemType.route.split("/").filter(Boolean);

  return segments[segments.length - 1];
}

export function generateStaticParams() {
  return mockDashboardData.itemTypes.map((itemType) => ({
    type: getItemTypeSegment(itemType),
  }));
}

export default async function ItemTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const itemType = mockDashboardData.itemTypes.find(
    (candidate) => getItemTypeSegment(candidate) === type,
  );

  if (!itemType) {
    notFound();
  }

  const items = mockDashboardData.items.filter(
    (item) => item.itemTypeId === itemType.id,
  );

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <div className="flex flex-col gap-3 border-b pb-5">
          <Link
            href="/dashboard"
            className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to dashboard
          </Link>
          <div>
            <p className="text-sm text-muted-foreground">
              {itemType.contentType} items
            </p>
            <h1 className="text-2xl font-semibold">{itemType.label}</h1>
          </div>
        </div>

        <div className="divide-y rounded-md border bg-card/60">
          {items.map((item) => (
            <article key={item.id} className="px-4 py-3">
              <h2 className="text-sm font-medium">{item.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
