import { z } from "zod";

export const voicePersonalitySchema = z.enum(["nova", "echo", "alloy"]);
export type VoicePersonality = z.infer<typeof voicePersonalitySchema>;

export const programmingLanguageSchema = z.enum([
  "python",
  "typescript",
  "javascript",
  "go",
  "cpp",
  "java",
]);
export type ProgrammingLanguage = z.infer<typeof programmingLanguageSchema>;

export const feedbackStrictnessSchema = z.enum([
  "forgiving",
  "standard",
  "strict",
]);
export type FeedbackStrictness = z.infer<typeof feedbackStrictnessSchema>;

export const retentionPolicySchema = z.enum([
  "immediate",
  "30_days",
  "indefinitely",
]);
export type RetentionPolicy = z.infer<typeof retentionPolicySchema>;

export const userSettingsSchema = z.object({
  // SEC-01 Audio & Speech
  microphone: z.string().min(1, "Microphone is required"),
  voicePersonality: voicePersonalitySchema,
  speechRate: z.number().min(0.8).max(1.5),
  noiseCancellation: z.boolean(),

  // SEC-02 Interview & Coding
  programmingLanguage: programmingLanguageSchema,
  feedbackStrictness: feedbackStrictnessSchema,
  proactiveHints: z.boolean(),
  editorTheme: z.string().min(1, "Editor theme is required"),

  // SEC-03 Account & Data Privacy
  postInterviewSummary: z.boolean(),
  retentionPolicy: retentionPolicySchema,
});

export type UserSettingsInput = z.infer<typeof userSettingsSchema>;

export const DEFAULT_USER_SETTINGS: UserSettingsInput = {
  microphone: "MacBook Pro Microphone (Built-in) - 48kHz",
  voicePersonality: "nova",
  speechRate: 1.0,
  noiseCancellation: true,
  programmingLanguage: "python",
  feedbackStrictness: "strict",
  proactiveHints: true,
  editorTheme: "vs-code-dark",
  postInterviewSummary: true,
  retentionPolicy: "30_days",
};
