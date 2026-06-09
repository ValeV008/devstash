import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="flex h-16 items-center gap-4 border-b bg-card px-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <h1 className="shrink-0 text-lg font-semibold tracking-normal">
            DevStash
          </h1>
          <div className="relative hidden w-full max-w-xl sm:block">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
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

      <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 md:grid-cols-[17rem_1fr]">
        <aside className="border-b bg-card/60 p-4 md:border-r md:border-b-0 sm:p-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">
            Sidebar
          </h2>
        </aside>

        <section className="p-4 sm:p-6">
          <h2 className="text-xl font-semibold">Main</h2>
        </section>
      </div>
    </main>
  );
}
