import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create account"
      description="Start a DevStash workspace with your name, email, and password."
    >
      <RegisterForm />
    </AuthShell>
  );
}
