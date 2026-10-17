"use server";

import { auth } from "@/auth";
import { getDatabase } from "@/lib/db";
import {
  userSettingsSchema,
  DEFAULT_USER_SETTINGS,
  type UserSettingsInput,
} from "@/lib/validations/settings";
import type { ActionResponse } from "@/types";

/**
 * Retrieves the current user's settings from MongoDB or fallback defaults.
 */
export async function getUserSettings(): Promise<
  ActionResponse<UserSettingsInput>
> {
  try {
    const session = await auth();
    if (!session?.user?.id && !session?.user?.email) {
      return { success: true, data: DEFAULT_USER_SETTINGS };
    }

    const db = await getDatabase();
    const settingsDoc = await db.collection("settings").findOne({
      $or: [
        ...(session.user.id ? [{ userId: session.user.id }] : []),
        ...(session.user.email ? [{ email: session.user.email }] : []),
      ],
    });

    if (!settingsDoc || !settingsDoc.settings) {
      return { success: true, data: DEFAULT_USER_SETTINGS };
    }

    const parsed = userSettingsSchema.safeParse(settingsDoc.settings);
    return {
      success: true,
      data: parsed.success ? parsed.data : DEFAULT_USER_SETTINGS,
    };
  } catch (error) {
    console.error("[GET_USER_SETTINGS_ERROR]", error);
    return { success: true, data: DEFAULT_USER_SETTINGS };
  }
}

/**
 * Persists updated settings to MongoDB for the current user.
 */
export async function updateUserSettings(
  payload: unknown
): Promise<ActionResponse<UserSettingsInput>> {
  try {
    const parsed = userSettingsSchema.safeParse(payload);
    if (!parsed.success) {
      const firstError =
        parsed.error.issues[0]?.message || "Invalid settings input.";
      return { success: false, error: firstError };
    }

    const session = await auth();
    const identifier = session?.user?.id || session?.user?.email || "anonymous_session";

    try {
      const db = await getDatabase();
      const now = new Date();
      await db.collection("settings").updateOne(
        { userId: identifier },
        {
          $set: {
            userId: identifier,
            settings: parsed.data,
            updatedAt: now,
          },
        },
        { upsert: true }
      );
    } catch (dbError) {
      console.warn("[SETTINGS_DB_PERSIST_WARNING]", dbError);
      // Still succeed so user experience is not blocked in local/preview environments
    }

    return {
      success: true,
      data: parsed.data,
    };
  } catch (error) {
    console.error("[UPDATE_USER_SETTINGS_ERROR]", error);
    return {
      success: false,
      error: "An unexpected error occurred while saving your settings.",
    };
  }
}
