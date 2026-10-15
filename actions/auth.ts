"use server";

import bcrypt from "bcryptjs";
import { getDatabase } from "@/lib/db";
import { signupPayloadSchema } from "@/lib/validations/auth";
import type { ActionResponse } from "@/types";
import { signOut } from "@/auth";

export interface SignupSuccessData {
  id: string;
  name: string;
  email: string;
}

/**
 * Server action to register a new user in MongoDB.
 * Validates payload with Zod, hashes password, and handles duplicates securely.
 */
export async function signupUser(
  payload: unknown
): Promise<ActionResponse<SignupSuccessData>> {
  try {
    // 1. Validate payload at runtime using Zod
    const validationResult = signupPayloadSchema.safeParse(payload);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message || "Invalid input data.";
      return {
        success: false,
        error: firstError,
      };
    }

    const { name, email, password } = validationResult.data;
    const normalizedEmail = email.toLowerCase();

    // 2. Obtain database instance
    const db = await getDatabase();
    const usersCollection = db.collection("users");

    // 3. Check for existing user
    const existingUser = await usersCollection.findOne({ email: normalizedEmail });
    if (existingUser) {
      return {
        success: false,
        error: "An account with this email already exists.",
      };
    }

    // 4. Hash the password securely
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 5. Insert new user into MongoDB
    const now = new Date();
    const insertResult = await usersCollection.insertOne({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      emailVerified: null,
      createdAt: now,
      updatedAt: now,
    });

    return {
      success: true,
      data: {
        id: insertResult.insertedId.toString(),
        name,
        email: normalizedEmail,
      },
    };
  } catch (error) {
    // 6. Secure logging: never expose raw MongoDB error to the client
    console.error("[SIGNUP_USER_ERROR]", error);
    return {
      success: false,
      error: "An unexpected error occurred during registration. Please try again later.",
    };
  }
}

/**
 * Server action to sign out the current user session.
 */
export async function logoutUser(): Promise<ActionResponse<{ loggedOut: boolean }>> {
  try {
    await signOut({ redirectTo: "/login" });
    return {
      success: true,
      data: { loggedOut: true },
    };
  } catch (error) {
    console.error("[LOGOUT_USER_ERROR]", error);
    return {
      success: false,
      error: "Failed to sign out. Please try again.",
    };
  }
}
