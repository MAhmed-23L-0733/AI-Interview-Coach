"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { loginSchema } from "@/lib/validations/auth";

export interface UseLoginFormReturn {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  fieldErrors: { email?: string; password?: string };
  formError: string | null;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useLoginForm(): UseLoginFormReturn {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fieldErrors, setFieldErrors] = React.useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      const errors: { email?: string; password?: string } = {};
      for (const issue of validationResult.error.issues) {
        if (issue.path[0] === "email") errors.email = issue.message;
        if (issue.path[0] === "password") errors.password = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: validationResult.data.email,
        password: validationResult.data.password,
        redirect: false,
      });

      if (!res || res.error) {
        setFormError("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("[USE_LOGIN_FORM_ERROR]", err);
      setFormError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return {
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
