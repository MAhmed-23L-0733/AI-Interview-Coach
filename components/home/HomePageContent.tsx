import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FeatureCard } from "@/components/home/FeatureCard";
import { ArrowRight, Database, Lock, Moon, Shield, Sparkles } from "lucide-react";

export function HomePageContent(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <section className="relative w-full max-w-5xl px-4 pt-20 pb-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>Production-Grade Next.js 15 Starter</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
          Secure Full-Stack Template with{" "}
          <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
            MongoDB & Auth.js
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Engineered with strict TypeScript, modular Page Wrapper architecture,
          hydration-safe dark mode, and Zod runtime schema validations.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="gap-2 shadow-lg shadow-zinc-900/10 dark:shadow-none">
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="secondary" size="lg">
              Protected Dashboard
            </Button>
          </Link>
        </div>
      </section>

      <section className="w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={Database}
            title="MongoDB Native"
            description="Cached client promise with connection pooling and NextAuth MongoDB adapter."
            badge="Database"
          />
          <FeatureCard
            icon={Lock}
            title="Auth.js v5"
            description="JWT session strategy, bcryptjs password hashing, and secure server actions."
            badge="Security"
          />
          <FeatureCard
            icon={Shield}
            title="Strict TypeScript"
            description="Zero any types, validated API/action boundaries, and standardized response shapes."
            badge="Safety"
          />
          <FeatureCard
            icon={Moon}
            title="Dark & Light Mode"
            description="Hydration-safe theme toggle powered by next-themes and Tailwind CSS v4."
            badge="Theming"
          />
        </div>
      </section>
    </div>
  );
}
