export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly sectionId: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Topics", href: "/#topics", sectionId: "topics" },
  { label: "Features", href: "/#features", sectionId: "features" },
  { label: "How It Works", href: "/#how-it-works", sectionId: "how-it-works" },
  { label: "Pricing", href: "/#pricing", sectionId: "pricing" },
] as const;

export const SECTION_IDS: readonly string[] = [
  "topics",
  "features",
  "how-it-works",
  "pricing",
] as const;
