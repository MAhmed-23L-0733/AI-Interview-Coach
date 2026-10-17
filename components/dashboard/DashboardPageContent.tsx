import * as React from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardLayoutWrapper } from "@/components/dashboard/DashboardLayoutWrapper";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { NextSessionCard } from "@/components/dashboard/NextSessionCard";
import { TopicSelector } from "@/components/dashboard/TopicSelector";
import { RecentInterviewsList } from "@/components/dashboard/RecentInterviewsList";

export interface DashboardUserProps {
  id?: string;
  name?: string | null;
  email?: string | null;
  initials?: string;
}

interface DashboardPageContentProps {
  user?: DashboardUserProps;
}

export function DashboardPageContent({
  user,
}: DashboardPageContentProps): React.JSX.Element {
  const userName = user?.name || "Alex";
  const userInitials =
    user?.initials ||
    userName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ||
    "AM";

  return (
    <div className="relative min-h-screen w-full bg-[#0B0F17] text-white">
      {/* Persistent Left Sidebar Navigation Rail / Mobile Nav */}
      <DashboardSidebar initials={userInitials} />

      {/* Main Content Area responsive to expanded/retracted sidebar */}
      <DashboardLayoutWrapper>
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
          {/* Greeting Header */}
          <DashboardHeader name={userName} initials={userInitials} />

          {/* Hero "YOUR NEXT SESSION" Card */}
          <NextSessionCard />

          {/* Interactive Multi-Select Topic Area */}
          <TopicSelector />

          {/* Recent Session History */}
          <RecentInterviewsList />
        </div>
      </DashboardLayoutWrapper>
    </div>
  );
}
