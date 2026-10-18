"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { signupSchema } from "@/lib/validations/auth";
import { signupUser } from "@/actions/auth";

export interface UseSignupFormReturn {
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  fieldErrors: {
    name?: string;
    email?: string;
    password?: string;
  };
  formError: string | null;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useSignupForm(): UseSignupFormReturn {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fieldErrors, setFieldErrors] = React.useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});

    // ----------------------------------------------------
    // STEP 1: Client-Side Form Validation
    // ----------------------------------------------------
    console.log("[USE_SIGNUP_FORM_STEP_1] Validating registration inputs on client...");
    const validationResult = signupSchema.safeParse({ name, email, password });
    if (!validationResult.success) {
      console.warn(
        "[USE_SIGNUP_FORM_STEP_1_FAILED] Client validation failed with issues:",
        validationResult.error.issues
      );
      const errors: { name?: string; email?: string; password?: string } = {};
      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0] as keyof typeof errors;
        if (fieldName && !errors[fieldName]) {
          errors[fieldName] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }
    console.log("[USE_SIGNUP_FORM_STEP_1_SUCCESS] Client input validation passed.");

    try {
      setIsLoading(true);

      // ----------------------------------------------------
      // STEP 2: Dispatch Server Action (signupUser)
      // ----------------------------------------------------
      console.log(
        "[USE_SIGNUP_FORM_STEP_2] Invoking signupUser server action for:",
        validationResult.data.email
      );
      const res = await signupUser(validationResult.data);
      console.log("[USE_SIGNUP_FORM_STEP_2_RESULT] Server action response:", res);

      if (!res.success) {
        console.error("[USE_SIGNUP_FORM_STEP_2_FAILED] Server action returned error:", res.error);
        setFormError(res.error || "Registration failed. Please try again.");
        setIsLoading(false);
        return;
      }

      console.log(
        "[USE_SIGNUP_FORM_STEP_2_SUCCESS] Account created successfully. User ID:",
        res.data?.id
      );

      // ----------------------------------------------------
      // STEP 3: Automatic Credentials Sign-In
      // ----------------------------------------------------
      console.log("[USE_SIGNUP_FORM_STEP_3] Initiating automatic signIn with NextAuth...");
      let signInRes;
      try {
        signInRes = await signIn("credentials", {
          email: validationResult.data.email,
          password: validationResult.data.password,
          redirect: false,
        });
        console.log("[USE_SIGNUP_FORM_STEP_3_RESULT] signIn response:", signInRes);
      } catch (signInErr) {
        console.error("[USE_SIGNUP_FORM_STEP_3_ERROR] signIn threw an exception:", signInErr);
        // Note: Database account exists, but automatic session creation failed
        router.push("/login?registered=true");
        return;
      }

      // ----------------------------------------------------
      // STEP 4: Session Navigation
      // ----------------------------------------------------
      if (signInRes && !signInRes.error) {
        console.log("[USE_SIGNUP_FORM_STEP_4] Authentication verified. Routing to /dashboard...");
        router.push("/dashboard");
      } else {
        console.warn(
          "[USE_SIGNUP_FORM_STEP_4_WARN] Automatic sign-in did not complete:",
          signInRes?.error
        );
        router.push("/login?registered=true");
      }
      router.refresh();
    } catch (err) {
      console.error("[USE_SIGNUP_FORM_UNHANDLED_ERROR]", err);
      setFormError(
        err instanceof Error
          ? `Signup process error: ${err.message}`
          : "An unexpected error occurred during signup. Please try again."
      );
      setIsLoading(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    fieldErrors,
    formError,
    isLoading,
    handleSubmit,
  };
}
