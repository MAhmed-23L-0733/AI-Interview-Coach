"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

/**
 * Hides root marketing navigation and footer for dedicated app-shell routes like /dashboard.
 */
export function ConditionalLayout({
  children,
}: ConditionalLayoutProps): React.JSX.Element | null {
  const pathname = usePathname();

  if (
    pathname &&
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/profile") ||
      pathname.startsWith("/history") ||
      pathname.startsWith("/settings") ||
      pathname.startsWith("/interview") ||
      pathname.startsWith("/report") ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/signup"))
  ) {
    return null;
  }

  return <>{children}</>;
}
