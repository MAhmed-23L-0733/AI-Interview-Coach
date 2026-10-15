import * as React from "react";
import { Database, Key, Server, UserCheck } from "lucide-react";

interface DashboardStatsProps {
  userId: string;
}

export function DashboardStats({ userId }: DashboardStatsProps): React.JSX.Element {
  const cards = [
    {
      title: "Account ID",
      value: userId,
      icon: UserCheck,
      desc: "MongoDB ObjectId identifier",
    },
    {
      title: "Auth Strategy",
      value: "JWT + Credentials",
      icon: Key,
      desc: "Auth.js v5 Session Token",
    },
    {
      title: "Database Driver",
      value: "MongoDB Native",
      icon: Database,
      desc: "Cached client promise singleton",
    },
    {
      title: "App Router Mode",
      value: "Next.js 15 Server Comp",
      icon: Server,
      desc: "Zero useEffect data fetching",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {card.title}
              </span>
              <Icon className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
            </div>
            <div className="mt-3 truncate text-lg font-bold text-zinc-900 dark:text-zinc-50" title={card.value}>
              {card.value}
            </div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{card.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
