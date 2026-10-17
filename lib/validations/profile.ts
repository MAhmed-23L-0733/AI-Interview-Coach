import { z } from "zod";

/**
 * Validation schema for developer profile settings and calibration.
 */
export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." })
    .toLowerCase(),
  targetRole: z.string().min(1, { message: "Please select a target role." }),
  seniority: z.string().min(1, { message: "Please select seniority level." }),
  targetCompanies: z.array(z.string()).max(15),
  githubUrl: z
    .string()
    .trim()
    .url({ message: "Must be a valid URL." })
    .or(z.literal("")),
  portfolioUrl: z
    .string()
    .trim()
    .url({ message: "Must be a valid URL." })
    .or(z.literal("")),
  allowInterruption: z.boolean(),
  autoComplexityAnalysis: z.boolean(),
});

export type ProfileInput = z.infer<typeof profileSchema>;

export interface ProfileData extends ProfileInput {
  verifiedCandidate: boolean;
  avatarInitials: string;
  readinessScore: number;
  benchmarkTier: string;
  percentileRank: string;
  currentPlan: string;
  planPrice: string;
  renewalDate: string;
  sessionsCompleted: number;
  twoFactorEnabled: boolean;
  lastAutosaved: string;
}
