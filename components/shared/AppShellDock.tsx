"use client";

import * as React from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

interface AppShellDockProps {
  initials?: string;
}

export function AppShellDock({ initials = "AM" }: AppShellDockProps): React.JSX.Element {
  return <DashboardSidebar initials={initials} />;
}

