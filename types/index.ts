/**
 * Standardized response shape for all Server Actions and internal APIs.
 * Ensures predictable error handling without leaking database specifics.
 */
export interface ActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Public/Safe user representation without sensitive fields like password.
 */
export interface SafeUser {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
  createdAt?: string | Date;
}
