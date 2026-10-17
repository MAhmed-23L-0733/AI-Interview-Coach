import { z } from "zod";

export const historyQuerySchema = z.object({
  topic: z.string().optional().default("all"),
  search: z.string().optional().default(""),
});

export type HistoryQuery = z.infer<typeof historyQuerySchema>;

export const TOPIC_OPTIONS = [
  { label: "All topics", value: "all" },
  { label: "Data Structures", value: "data-structures" },
  { label: "Algorithms", value: "algorithms" },
  { label: "Operating Systems", value: "os" },
  { label: "Object-Oriented Design", value: "oop" },
  { label: "Computer Networks", value: "networks" },
  { label: "System Design", value: "system-design" },
] as const;

export type TopicValue = (typeof TOPIC_OPTIONS)[number]["value"];

export const safeSessionRecordSchema = z.object({
  id: z.string(),
  topic: z.string(),
  topicSlug: z.string(),
  date: z.string(),
  duration: z.string(),
  score: z.number().min(0).max(100),
  status: z.enum(["Strong", "Good", "Developing"]),
  iconName: z.enum(["Network", "Activity", "Cpu", "Code", "Layers", "Database", "Terminal", "Share2"]),
});

export type SafeSessionRecord = z.infer<typeof safeSessionRecordSchema>;

export interface HistoryMetrics {
  totalSessions: number;
  totalSessionsDelta: string;
  averageScore: number;
  averageScoreDelta: string;
  practiceTimeHours: string;
  practiceTimeSubtext: string;
  strongestTopic: string;
  strongestTopicAverage: number;
}
