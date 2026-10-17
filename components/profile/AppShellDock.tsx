"use client";

import * as React from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

interface AppShellDockProps {
  userInitials?: string;
  userName?: string | null;
}

export function AppShellDock({
  userInitials = "AM",
  userName,
}: AppShellDockProps): React.JSX.Element {
  return <DashboardSidebar initials={userInitials} name={userName} />;
}

