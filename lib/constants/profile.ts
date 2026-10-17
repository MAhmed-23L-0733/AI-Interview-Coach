import type { ProfileData } from "@/lib/validations/profile";

export const DEFAULT_PROFILE: ProfileData = {
  name: "Alex Morgan",
  email: "alex.morgan@devs.corp",
  targetRole: "Senior Full-Stack Engineer",
  seniority: "L5 / Senior (5+ Years)",
  targetCompanies: ["Google", "Meta", "Stripe"],
  githubUrl: "https://github.com/alexmorgan-dev",
  portfolioUrl: "https://alexmorgan.engineering",
  allowInterruption: true,
  autoComplexityAnalysis: true,
  verifiedCandidate: true,
  avatarInitials: "AM",
  readinessScore: 84,
  benchmarkTier: "Tier 1 Calibrated",
  percentileRank: "Top 16% of Senior candidates",
  currentPlan: "Pro Developer Tier",
  planPrice: "$29/mo",
  renewalDate: "June 15, 2025",
  sessionsCompleted: 14,
  twoFactorEnabled: true,
  lastAutosaved: "12 minutes ago",
};

export const TARGET_ROLE_OPTIONS = [
  "Senior Full-Stack Engineer",
  "Distributed Systems Architect",
  "Staff Frontend Engineer",
  "Principal Platform Engineer",
  "Machine Learning Engineer",
] as const;

export const SENIORITY_OPTIONS = [
  "L3 / Junior (0-2 Years)",
  "L4 / Mid-Level (2-5 Years)",
  "L5 / Senior (5+ Years)",
  "L6 / Staff (8+ Years)",
] as const;
