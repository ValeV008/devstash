import { Suspense } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { SignInForm } from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <AuthShell
      title="Sign in"
      description="Use your DevStash account or GitHub to get back to your dashboard."
    >
      <Suspense fallback={<div className="h-72 rounded-md bg-secondary/40" />}>
        <SignInForm />
      </Suspense>
    </AuthShell>
  );
}
