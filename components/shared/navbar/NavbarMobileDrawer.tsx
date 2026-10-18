"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SECTION_IDS } from "@/components/shared/navData";
import { useActiveSection } from "@/hooks/useActiveSection";
import { NavbarMobileDrawerContent } from "@/components/shared/navbar/NavbarMobileDrawerContent";
import type { SafeUser } from "@/types";

interface NavbarMobileDrawerProps {
  readonly user: SafeUser | null;
}

export function NavbarMobileDrawer({ user }: NavbarMobileDrawerProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const activeSection = useActiveSection(SECTION_IDS);

  const handleNavClick = (sectionId: string): void => {
    setIsOpen(false);
    if (pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${sectionId}`);
      }
    }
  };

  return (
    <div className="flex md:hidden items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        className="h-11 w-11 min-h-[44px] min-w-[44px] rounded-xl border border-white/[0.08] bg-white/[0.04] text-slate-200 hover:bg-white/[0.08] hover:text-white"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-20 z-50 border-b border-white/[0.08] bg-[#0B0F17]/95 p-6 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
          >
            <NavbarMobileDrawerContent
              user={user}
              activeSection={activeSection}
              onNavClick={handleNavClick}
              onClose={() => setIsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
