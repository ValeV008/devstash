"use client";

import { GitBranch } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { type FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const authError = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(getAuthErrorMessage(authError));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(
    searchParams.get("registered") === "1",
  );

  useEffect(() => {
    if (!isRegistrationComplete) {
      return;
    }

    const timeoutId = window.setTimeout(() => setIsRegistrationComplete(false), 5000);

    return () => window.clearTimeout(timeoutId);
  }, [isRegistrationComplete]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();

    if (!emailPattern.test(trimmedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Enter your password.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: trimmedEmail,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError("Email or password is incorrect.");
        return;
      }

      router.push(result?.url ?? callbackUrl);
      router.refresh();
    } catch {
      setError("Could not reach the authentication service. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-5">
      {isRegistrationComplete && (
        <div
          role="status"
          className="fixed top-4 right-4 z-50 max-w-sm rounded-lg border border-emerald-400/40 bg-emerald-950 px-4 py-3 text-sm text-emerald-100 shadow-xl shadow-black/30"
        >
          Account created. You can now log in.
        </div>
      )}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => void signIn("github", { callbackUrl })}
      >
        <GitBranch />
        Sign in with GitHub
      </Button>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        <span>or use email</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        {error && (
          <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        New to DevStash?{" "}
        <Link className="font-medium text-foreground hover:underline" href="/register">
          Create an account
        </Link>
      </p>
    </div>
  );
}

function getAuthErrorMessage(error: string | null) {
  if (!error) {
    return null;
  }

  return "Sign-in failed. Check your credentials and try again.";
}
