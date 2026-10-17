import { z } from "zod";

export const reportDimensionSchema = z.object({
  label: z.string(),
  score: z.number().min(0).max(100),
});

export const recommendedFocusSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

export const feedbackItemSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const questionAnalysisSchema = z.object({
  id: z.string(),
  topic: z.string(),
  status: z.enum(["Strong", "Good", "Developing"]),
  prompt: z.string(),
  expectedResponse: z.string(),
  userResponse: z.string(),
  coachAssessment: z.string(),
});

export const sessionReportSchema = z.object({
  id: z.string(),
  title: z.string(),
  topicsCount: z.number(),
  date: z.string(),
  duration: z.string(),
  score: z.number().min(0).max(100),
  status: z.string(),
  description: z.string(),
  highlights: z.array(z.string()),
  percentile: z.string(),
  percentileSubtext: z.string(),
  dimensions: z.array(reportDimensionSchema),
  recommendedFocus: z.array(recommendedFocusSchema),
  topicFeedback: z.object({
    topicName: z.string(),
    strengths: z.array(feedbackItemSchema),
    gaps: z.array(feedbackItemSchema),
  }),
  questions: z.array(questionAnalysisSchema),
});

export type ReportDimension = z.infer<typeof reportDimensionSchema>;
export type RecommendedFocusItem = z.infer<typeof recommendedFocusSchema>;
export type FeedbackItem = z.infer<typeof feedbackItemSchema>;
export type QuestionAnalysis = z.infer<typeof questionAnalysisSchema>;
export type SessionReport = z.infer<typeof sessionReportSchema>;
