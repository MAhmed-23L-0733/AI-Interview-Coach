"use client";

import * as React from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

interface AppShellDockProps {
  userInitials?: string;
}

export function AppShellDock({ userInitials = "AM" }: AppShellDockProps): React.JSX.Element {
  return <DashboardSidebar initials={userInitials} />;
}

