import { useSession } from "next-auth/react";

interface UseSidebarUserOptions {
  propInitials?: string;
  propName?: string | null;
}

interface SidebarUserState {
  name: string;
  initials: string;
  isAuthenticated: boolean;
}

/**
 * Resolves the display name and initials for sidebar and navbars.
 * Prioritizes active user session, with prop fallbacks and graceful defaults.
 */
export function useSidebarUser(options: UseSidebarUserOptions = {}): SidebarUserState {
  const { data: session, status } = useSession();
  const { propInitials, propName } = options;

  const sessionName = session?.user?.name?.trim();
  const rawName = propName?.trim();

  // If a propName was passed that isn't the default "Alex", respect it;
  // otherwise prefer the authenticated session's user name.
  const resolvedName =
    rawName && rawName !== "Alex"
      ? rawName
      : sessionName || rawName || "Alex";

  const computedInitials = resolvedName !== "Alex"
    ? resolvedName
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AM";

  const resolvedInitials =
    propInitials && propInitials !== "AM"
      ? propInitials
      : computedInitials || "AM";

  return {
    name: resolvedName,
    initials: resolvedInitials,
    isAuthenticated: status === "authenticated",
  };
}
