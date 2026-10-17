"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/lib/stores/useSidebarStore";

interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayoutWrapper({
  children,
  className,
}: DashboardLayoutWrapperProps): React.JSX.Element {
  const { isExpanded } = useSidebarStore();

  return (
    <main
      className={cn(
        "min-h-screen pb-24 md:pb-12 transition-[padding] duration-300 ease-in-out",
        isExpanded ? "md:pl-64" : "md:pl-[72px]",
        className
      )}
    >
      {children}
    </main>
  );
}
