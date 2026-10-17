"use server";

import { auth } from "@/auth";
import { getDatabase } from "@/lib/db";
import { DEFAULT_PROFILE } from "@/lib/constants/profile";
import { profileSchema, type ProfileData, type ProfileInput } from "@/lib/validations/profile";
import type { ActionResponse } from "@/types";

export async function getProfile(): Promise<ActionResponse<ProfileData>> {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: true, data: DEFAULT_PROFILE };
    }

    const db = await getDatabase();
    const user = await db.collection("users").findOne({
      email: session.user.email.toLowerCase(),
    });

    const sessionName = session.user.name || DEFAULT_PROFILE.name;

    if (!user) {
      return {
        success: true,
        data: {
          ...DEFAULT_PROFILE,
          name: sessionName,
          email: session.user.email,
          avatarInitials: getInitials(sessionName),
        },
      };
    }

    const resolvedName =
      typeof user.name === "string" && user.name.trim()
        ? user.name
        : sessionName;

    return {
      success: true,
      data: {
        ...DEFAULT_PROFILE,
        name: resolvedName,
        email: typeof user.email === "string" ? user.email : session.user.email,
        targetRole: typeof user.targetRole === "string" ? user.targetRole : DEFAULT_PROFILE.targetRole,
        seniority: typeof user.seniority === "string" ? user.seniority : DEFAULT_PROFILE.seniority,
        targetCompanies: Array.isArray(user.targetCompanies) ? user.targetCompanies : DEFAULT_PROFILE.targetCompanies,
        githubUrl: typeof user.githubUrl === "string" ? user.githubUrl : DEFAULT_PROFILE.githubUrl,
        portfolioUrl: typeof user.portfolioUrl === "string" ? user.portfolioUrl : DEFAULT_PROFILE.portfolioUrl,
        allowInterruption: typeof user.allowInterruption === "boolean" ? user.allowInterruption : DEFAULT_PROFILE.allowInterruption,
        autoComplexityAnalysis: typeof user.autoComplexityAnalysis === "boolean" ? user.autoComplexityAnalysis : DEFAULT_PROFILE.autoComplexityAnalysis,
        avatarInitials: getInitials(resolvedName),
      },
    };
  } catch (error) {
    console.error("[GET_PROFILE_ERROR]", error);
    return { success: true, data: DEFAULT_PROFILE };
  }
}

function getInitials(name: string): string {
  return name.split(" ").filter(Boolean).map((p) => p[0]).join("").toUpperCase().slice(0, 2) || "AM";
}

export async function updateProfile(
  payload: unknown
): Promise<ActionResponse<ProfileInput>> {
  try {
    const parsed = profileSchema.safeParse(payload);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Invalid profile data.",
      };
    }

    const session = await auth();
    if (session?.user?.email) {
      const db = await getDatabase();
      await db.collection("users").updateOne(
        { email: session.user.email.toLowerCase() },
        {
          $set: {
            ...parsed.data,
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );
    }

    return { success: true, data: parsed.data };
  } catch (error) {
    console.error("[UPDATE_PROFILE_ERROR]", error);
    return { success: false, error: "Failed to update profile." };
  }
}
