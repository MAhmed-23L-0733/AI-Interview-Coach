"use client";

import { useNavbarScroll } from "@/hooks/useNavbarScroll";
import { cn } from "@/lib/utils";
import { NavbarBrand } from "@/components/shared/navbar/NavbarBrand";
import { NavbarNavLinks } from "@/components/shared/navbar/NavbarNavLinks";
import { NavbarActions } from "@/components/shared/navbar/NavbarActions";
import { NavbarMobileDrawer } from "@/components/shared/navbar/NavbarMobileDrawer";
import type { SafeUser } from "@/types";

interface NavbarClientShellProps {
  readonly user: SafeUser | null;
}

export function NavbarClientShell({ user }: NavbarClientShellProps): React.JSX.Element {
  const { isScrolled, isHomePage } = useNavbarScroll(20);
  const isFloating = isScrolled;
  const isTransparent = isHomePage && !isScrolled;

  return (
    <header
      className={cn(
        "sticky z-50 w-full transition-all duration-300 ease-in-out pointer-events-none",
        isFloating ? "top-3 md:top-4 px-3 sm:px-6 md:px-8" : "top-0 px-0"
      )}
    >
      <div
        className={cn(
          "pointer-events-auto mx-auto flex items-center justify-between transition-all duration-300 ease-in-out",
          isFloating
            ? "h-16 w-full max-w-6xl rounded-2xl md:rounded-full border border-white/[0.08] bg-[#0B0F17]/85 px-5 md:px-8 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150"
            : isTransparent
            ? "h-20 w-full max-w-7xl rounded-none border-b-0 border-transparent bg-transparent px-6 md:px-12 shadow-none"
            : "h-20 w-full border-b border-white/[0.08] bg-[#0B0F17]/80 px-6 md:px-12 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl backdrop-saturate-150"
        )}
      >
        <NavbarBrand />
        <NavbarNavLinks />
        <NavbarActions user={user} />
        <NavbarMobileDrawer user={user} />
      </div>
    </header>
  );
}
