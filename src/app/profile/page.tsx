import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/profile");
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6">
      <section className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-lg border bg-card/70 p-6">
        <div className="flex items-center gap-4">
          <UserAvatar
            name={session.user.name}
            image={session.user.image}
            className="size-14 text-lg"
          />
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-semibold tracking-normal">
              {session.user.name ?? "DevStash User"}
            </h1>
            <p className="truncate text-sm text-muted-foreground">
              {session.user.email ?? "No email available"}
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
