"use client";

import * as React from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

interface AppShellDockProps {
  initials?: string;
  name?: string | null;
}

export function AppShellDock({ initials, name }: AppShellDockProps): React.JSX.Element {
  return <DashboardSidebar initials={initials} name={name} />;
}
