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
  const isTransparent = isHomePage && !isScrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,border-color,box-shadow] duration-200 ease-out",
        isTransparent
          ? "border-b border-transparent bg-transparent shadow-none"
          : "border-b border-white/[0.08] bg-[#0B0F17]/80 backdrop-blur-xl backdrop-saturate-150 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 md:px-12">
        <NavbarBrand />
        <NavbarNavLinks />
        <NavbarActions user={user} />
        <NavbarMobileDrawer user={user} />
      </div>
    </header>
  );
}
