import { Code, Terminal } from "lucide-react";
import { type ReactNode } from "react";

export function AuthShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[1fr_30rem]">
        <section className="relative hidden min-h-screen overflow-hidden border-r bg-card/50 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(217_91%_60%/.18),transparent_28%),radial-gradient(circle_at_80%_15%,hsl(24_95%_53%/.14),transparent_24%),linear-gradient(135deg,hsl(0_0%_4%),hsl(0_0%_10%))]" />
          <div className="relative flex h-full flex-col justify-between p-10">
            <div className="flex items-center gap-3 text-lg font-semibold">
              <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Code className="size-5" />
              </span>
              DevStash
            </div>
            <div className="max-w-xl space-y-5">
              <div className="inline-flex items-center gap-2 rounded-md border bg-background/50 px-3 py-1 text-sm text-muted-foreground">
                <Terminal className="size-4" />
                Developer knowledge, one command away
              </div>
              <h1 className="text-5xl leading-tight font-semibold tracking-normal">
                Keep the workbench open.
              </h1>
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                Sign in to collect snippets, prompts, commands, links, and notes without
                losing the thread between projects.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm text-muted-foreground">
              {["Snippets", "Prompts", "Commands"].map((label) => (
                <div key={label} className="rounded-lg border bg-background/45 p-3">
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-lg font-semibold lg:hidden">
                <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Code className="size-5" />
                </span>
                DevStash
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-normal">{title}</h1>
                <p className="text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            </div>
            <div className="rounded-lg border bg-card/80 p-5 shadow-2xl shadow-black/20 sm:p-6">
              {children}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
