"use client";

import * as React from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

interface AppShellDockProps {
  initials?: string;
  userInitials?: string;
  name?: string | null;
  userName?: string | null;
}

export function AppShellDock({
  initials,
  userInitials,
  name,
  userName,
}: AppShellDockProps): React.JSX.Element {
  const resolvedInitials = initials ?? userInitials ?? "AM";
  const resolvedName = name ?? userName ?? null;
  return <DashboardSidebar initials={resolvedInitials} name={resolvedName} />;
}
