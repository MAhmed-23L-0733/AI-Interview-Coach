import Link from "next/link";
import { LoginForm } from "@/components/login/LoginForm";
import { ShieldCheck } from "lucide-react";

export function LoginPageContent(): React.JSX.Element {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Sign in to your account with your credentials
          </p>
        </div>

        <LoginForm />

        <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
          >
            Create one now
          </Link>
        </div>
      </div>
    </div>
  );
}
