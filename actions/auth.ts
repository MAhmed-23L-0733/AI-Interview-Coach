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
 * Implements granular step-by-step error handling, diagnostic logging,
 * and secure credential handling for production debugging.
 */
export async function signupUser(
  payload: unknown
): Promise<ActionResponse<SignupSuccessData>> {
  const timestamp = new Date().toISOString();
  console.log(`[SIGNUP_FLOW_START] [${timestamp}] Starting user registration sequence...`);

  // ==========================================
  // STEP 1: Runtime Schema & Payload Validation
  // ==========================================
  console.log(`[SIGNUP_STEP_1_VALIDATION] [${timestamp}] Validating registration input with Zod...`);
  const validationResult = signupPayloadSchema.safeParse(payload);
  if (!validationResult.success) {
    const issues = validationResult.error.issues;
    console.error(`[SIGNUP_STEP_1_VALIDATION_ERROR] [${timestamp}] Input validation failed:`, {
      issueCount: issues.length,
      errors: issues.map((issue) => ({
        field: issue.path.join("."),
        code: issue.code,
        message: issue.message,
      })),
    });

    const firstError = issues[0]?.message || "Invalid registration data provided.";
    return {
      success: false,
      error: `[Validation Error] ${firstError}`,
    };
  }

  const { name, email, password } = validationResult.data;
  const normalizedEmail = email.toLowerCase().trim();
  console.log(
    `[SIGNUP_STEP_1_VALIDATION_SUCCESS] [${timestamp}] Payload verified for email: ${normalizedEmail}`
  );

  // ==========================================
  // STEP 2: Database Connection & Collection Access
  // ==========================================
  console.log(`[SIGNUP_STEP_2_DB_CONNECT] [${timestamp}] Initializing MongoDB connection...`);
  let usersCollection;
  try {
    if (!process.env.MONGODB_URI) {
      const configErrorMsg =
        "MONGODB_URI environment variable is missing from the server environment.";
      console.error(`[SIGNUP_STEP_2_DB_CONNECT_ERROR] [${timestamp}] ${configErrorMsg}`);
      return {
        success: false,
        error: `[Database Connection Error] ${configErrorMsg} Please configure it in your production deployment settings.`,
      };
    }

    const db = await getDatabase();
    usersCollection = db.collection("users");
    console.log(`[SIGNUP_STEP_2_DB_CONNECT_SUCCESS] [${timestamp}] MongoDB connected. Users collection acquired.`);
  } catch (dbError) {
    const errorDetails = {
      name: dbError instanceof Error ? dbError.name : "UnknownError",
      message: dbError instanceof Error ? dbError.message : String(dbError),
      stack: dbError instanceof Error ? dbError.stack : undefined,
    };
    console.error(`[SIGNUP_STEP_2_DB_CONNECT_ERROR] [${timestamp}] Failed to connect to MongoDB:`, errorDetails);

    return {
      success: false,
      error: `[Database Connection Error] Failed to connect to database: ${errorDetails.message}`,
    };
  }

  // ==========================================
  // STEP 3: Check for Existing User in Database
  // ==========================================
  console.log(`[SIGNUP_STEP_3_CHECK_EXISTING] [${timestamp}] Checking if email already exists in users collection...`);
  try {
    const existingUser = await usersCollection.findOne({ email: normalizedEmail });
    if (existingUser) {
      console.warn(
        `[SIGNUP_STEP_3_CHECK_EXISTING_CONFLICT] [${timestamp}] Duplicate registration attempt for email: ${normalizedEmail}`
      );
      return {
        success: false,
        error: "An account with this email address already exists. Please log in instead.",
      };
    }
    console.log(`[SIGNUP_STEP_3_CHECK_EXISTING_SUCCESS] [${timestamp}] Email is available.`);
  } catch (lookupError) {
    const errorDetails = {
      name: lookupError instanceof Error ? lookupError.name : "UnknownError",
      message: lookupError instanceof Error ? lookupError.message : String(lookupError),
      stack: lookupError instanceof Error ? lookupError.stack : undefined,
    };
    console.error(
      `[SIGNUP_STEP_3_CHECK_EXISTING_ERROR] [${timestamp}] Error querying database for existing user:`,
      errorDetails
    );

    return {
      success: false,
      error: `[Database Query Error] Failed to verify if email already exists: ${errorDetails.message}`,
    };
  }

  // ==========================================
  // STEP 4: Password Hashing (bcrypt)
  // ==========================================
  console.log(`[SIGNUP_STEP_4_HASH_PASSWORD] [${timestamp}] Generating salted bcrypt hash...`);
  let hashedPassword = "";
  try {
    const saltRounds = 12;
    hashedPassword = await bcrypt.hash(password, saltRounds);

    if (!hashedPassword || hashedPassword.length === 0) {
      throw new Error("bcrypt generated an empty password hash.");
    }
    console.log(`[SIGNUP_STEP_4_HASH_PASSWORD_SUCCESS] [${timestamp}] Password hash computed securely.`);
  } catch (hashError) {
    const errorDetails = {
      name: hashError instanceof Error ? hashError.name : "UnknownError",
      message: hashError instanceof Error ? hashError.message : String(hashError),
      stack: hashError instanceof Error ? hashError.stack : undefined,
    };
    console.error(`[SIGNUP_STEP_4_HASH_PASSWORD_ERROR] [${timestamp}] bcrypt password hashing failed:`, errorDetails);

    return {
      success: false,
      error: `[Password Encryption Error] Failed to process password securely: ${errorDetails.message}`,
    };
  }

  // ==========================================
  // STEP 5: Document Insertion into MongoDB
  // ==========================================
  console.log(`[SIGNUP_STEP_5_INSERT_USER] [${timestamp}] Inserting new user record into MongoDB...`);
  let insertResult;
  try {
    const now = new Date();
    insertResult = await usersCollection.insertOne({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      emailVerified: null,
      createdAt: now,
      updatedAt: now,
    });

    if (!insertResult.acknowledged || !insertResult.insertedId) {
      throw new Error("MongoDB insertOne command was not acknowledged or returned no insertedId.");
    }

    console.log(
      `[SIGNUP_STEP_5_INSERT_USER_SUCCESS] [${timestamp}] User inserted with ID: ${insertResult.insertedId.toString()}`
    );
  } catch (insertError: unknown) {
    // Detect MongoDB unique index collision error (code 11000)
    const isDuplicateKey =
      typeof insertError === "object" &&
      insertError !== null &&
      "code" in insertError &&
      (insertError as { code: number }).code === 11000;

    if (isDuplicateKey) {
      console.warn(
        `[SIGNUP_STEP_5_DUPLICATE_KEY_ERROR] [${timestamp}] MongoDB code 11000 duplicate key collision for email: ${normalizedEmail}`
      );
      return {
        success: false,
        error: "An account with this email address already exists. Please log in instead.",
      };
    }

    const errorDetails = {
      name: insertError instanceof Error ? insertError.name : "UnknownError",
      message: insertError instanceof Error ? insertError.message : String(insertError),
      stack: insertError instanceof Error ? insertError.stack : undefined,
    };
    console.error(
      `[SIGNUP_STEP_5_INSERT_USER_ERROR] [${timestamp}] Failed to insert user into MongoDB collection:`,
      errorDetails
    );

    return {
      success: false,
      error: `[Database Insert Error] Failed to save user account: ${errorDetails.message}`,
    };
  }

  // ==========================================
  // STEP 6: Final Verification & Return Response
  // ==========================================
  console.log(`[SIGNUP_STEP_6_COMPLETE] [${timestamp}] Registration sequence completed successfully for user: ${insertResult.insertedId.toString()}`);
  return {
    success: true,
    data: {
      id: insertResult.insertedId.toString(),
      name: name.trim(),
      email: normalizedEmail,
    },
  };
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
