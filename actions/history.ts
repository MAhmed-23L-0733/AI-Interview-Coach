"use server";

import {
  safeSessionRecordSchema,
  type SafeSessionRecord,
  type HistoryMetrics,
  type HistoryQuery,
} from "@/lib/validations/history";

const ALL_SESSIONS: readonly SafeSessionRecord[] = [
  { id: "session-1", topic: "Data Structures", topicSlug: "data-structures", date: "May 24, 2025", duration: "28 min", score: 84, status: "Strong", iconName: "Network" },
  { id: "session-2", topic: "Algorithms", topicSlug: "algorithms", date: "May 21, 2025", duration: "34 min", score: 76, status: "Good", iconName: "Activity" },
  { id: "session-3", topic: "Operating Systems", topicSlug: "os", date: "May 17, 2025", duration: "23 min", score: 68, status: "Developing", iconName: "Cpu" },
  { id: "session-4", topic: "Object-Oriented Design", topicSlug: "oop", date: "May 12, 2025", duration: "31 min", score: 81, status: "Strong", iconName: "Terminal" },
  { id: "session-5", topic: "Computer Networks", topicSlug: "networks", date: "May 8, 2025", duration: "22 min", score: 72, status: "Good", iconName: "Database" },
] as const;

export interface HistoryDataResult {
  metrics: HistoryMetrics;
  sessions: SafeSessionRecord[];
}

export async function fetchHistoryData(
  query?: Partial<HistoryQuery>
): Promise<HistoryDataResult> {
  const selectedTopic = query?.topic ?? "all";
  const searchKeyword = (query?.search ?? "").toLowerCase().trim();

  const filtered = ALL_SESSIONS.filter((session) => {
    const matchesTopic =
      selectedTopic === "all" ||
      session.topicSlug === selectedTopic ||
      session.topic.toLowerCase() === selectedTopic.toLowerCase();

    const matchesSearch =
      !searchKeyword ||
      session.topic.toLowerCase().includes(searchKeyword) ||
      session.status.toLowerCase().includes(searchKeyword);

    return matchesTopic && matchesSearch;
  });

  const validatedSessions: SafeSessionRecord[] = filtered.map((s) =>
    safeSessionRecordSchema.parse(s)
  );

  const metrics: HistoryMetrics = {
    totalSessions: 12,
    totalSessionsDelta: "+3 this month",
    averageScore: 78,
    averageScoreDelta: "+8% from last month",
    practiceTimeHours: "5.8h",
    practiceTimeSubtext: "Avg. 29 min / session",
    strongestTopic: "Data Structures",
    strongestTopicAverage: 84,
  };

  return {
    metrics,
    sessions: validatedSessions,
  };
}
