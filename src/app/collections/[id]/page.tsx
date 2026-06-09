import Link from "next/link";
import { notFound } from "next/navigation";

import { mockDashboardData } from "@/lib/mock-data";

export function generateStaticParams() {
  return mockDashboardData.collections.map((collection) => ({
    id: collection.id,
  }));
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const collection = mockDashboardData.collections.find(
    (candidate) => candidate.id === id,
  );

  if (!collection) {
    notFound();
  }

  const items = mockDashboardData.items.filter((item) =>
    collection.itemIds.includes(item.id),
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
              {collection.itemCount} items
            </p>
            <h1 className="text-2xl font-semibold">{collection.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {collection.description}
            </p>
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
