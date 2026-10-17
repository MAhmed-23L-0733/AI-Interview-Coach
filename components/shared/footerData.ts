export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export const FOOTER_GROUPS: FooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Topics", href: "#topics" },
      { label: "Sandbox", href: "#demo" },
      { label: "Methodology", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Topics",
    links: [
      { label: "Data Structures", href: "#topics" },
      { label: "Algorithms", href: "#topics" },
      { label: "System Design", href: "#topics" },
      { label: "Operating Systems", href: "#topics" },
      { label: "Machine Learning", href: "#topics" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "System Status", href: "#" },
      { label: "Interview Rubrics", href: "#" },
      { label: "Engineering Blog", href: "#" },
    ],
  },
];
