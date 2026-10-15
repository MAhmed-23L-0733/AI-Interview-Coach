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
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  fieldErrors: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
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
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [fieldErrors, setFieldErrors] = React.useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const validationResult = signupSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!validationResult.success) {
      const errors: {
        name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
      } = {};
      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0] as keyof typeof errors;
        if (fieldName && !errors[fieldName]) {
          errors[fieldName] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    try {
      setIsLoading(true);
      const res = await signupUser({
        name: validationResult.data.name,
        email: validationResult.data.email,
        password: validationResult.data.password,
      });

      if (!res.success) {
        setFormError(res.error || "Registration failed. Please check your inputs.");
        setIsLoading(false);
        return;
      }

      const signInRes = await signIn("credentials", {
        email: validationResult.data.email,
        password: validationResult.data.password,
        redirect: false,
      });

      if (signInRes && !signInRes.error) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
      router.refresh();
    } catch (err) {
      console.error("[USE_SIGNUP_FORM_ERROR]", err);
      setFormError("An unexpected error occurred. Please try again.");
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
    confirmPassword,
    setConfirmPassword,
    fieldErrors,
    formError,
    isLoading,
    handleSubmit,
  };
}
