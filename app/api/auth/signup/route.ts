import { NextResponse } from "next/server";
import { signupUser } from "@/actions/auth";
import type { ActionResponse } from "@/types";
import type { SignupSuccessData } from "@/actions/auth";

/**
 * Next.js Route Handler for POST /api/auth/signup.
 * Enables direct API testing, automated health checks, and production debugging.
 */
export async function POST(
  request: Request
): Promise<NextResponse<ActionResponse<SignupSuccessData>>> {
  const timestamp = new Date().toISOString();
  console.log(`[API_SIGNUP_ROUTE_POST] [${timestamp}] Incoming registration request...`);

  let body: unknown;
  try {
    body = await request.json();
    console.log(`[API_SIGNUP_ROUTE_BODY_PARSED] [${timestamp}] Request JSON parsed successfully.`);
  } catch (parseError) {
    const errorMsg =
      parseError instanceof Error ? parseError.message : "Invalid JSON payload.";
    console.error(`[API_SIGNUP_ROUTE_PARSE_ERROR] [${timestamp}]`, errorMsg);
    return NextResponse.json(
      {
        success: false,
        error: `Malformed JSON request body: ${errorMsg}`,
      },
      { status: 400 }
    );
  }

  try {
    const result = await signupUser(body);
    console.log(`[API_SIGNUP_ROUTE_ACTION_RESULT] [${timestamp}] Result:`, {
      success: result.success,
      error: result.error,
      userId: result.data?.id,
    });

    if (!result.success) {
      const errorMessage = result.error || "Registration failed.";
      // Map domain error to appropriate HTTP status code
      let statusCode = 400;
      if (errorMessage.includes("already exists")) {
        statusCode = 409; // Conflict
      } else if (
        errorMessage.includes("Database Connection") ||
        errorMessage.includes("Database Insert") ||
        errorMessage.includes("Database Query") ||
        errorMessage.includes("Password Encryption")
      ) {
        statusCode = 500; // Internal Server Error
      }

      return NextResponse.json(result, { status: statusCode });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (unhandledError) {
    const errorDetails = {
      name: unhandledError instanceof Error ? unhandledError.name : "UnknownError",
      message:
        unhandledError instanceof Error
          ? unhandledError.message
          : String(unhandledError),
      stack: unhandledError instanceof Error ? unhandledError.stack : undefined,
    };
    console.error(
      `[API_SIGNUP_ROUTE_UNHANDLED_ERROR] [${timestamp}]`,
      errorDetails
    );

    return NextResponse.json(
      {
        success: false,
        error: `Unexpected internal server error: ${errorDetails.message}`,
      },
      { status: 500 }
    );
  }
}
