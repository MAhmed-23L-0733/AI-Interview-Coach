"use server";

import { sessionReportSchema, type SessionReport } from "@/lib/validations/report";
import { DEFAULT_SESSION_REPORT } from "@/lib/data/mock-report";

export async function fetchSessionReport(sessionId: string): Promise<SessionReport> {
  // In production or when DB records exist, fetch from DB by sessionId.
  // For now, provide the validated Stitch design report matching the session.
  const reportData: SessionReport = {
    ...DEFAULT_SESSION_REPORT,
    id: sessionId || "session-1",
  };

  return sessionReportSchema.parse(reportData);
}
