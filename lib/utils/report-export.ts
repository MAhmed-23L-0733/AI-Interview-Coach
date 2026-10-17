import type { SessionReport } from "@/lib/validations/report";

export function exportReport(format: "pdf" | "txt" | "json", report: SessionReport): void {
  if (typeof window === "undefined") return;

  if (format === "pdf") {
    window.print();
    return;
  }

  const triggerDownload = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (format === "json") {
    triggerDownload(
      `interview-report-${report.id}.json`,
      JSON.stringify(report, null, 2),
      "application/json"
    );
    return;
  }

  const textLines = [
    `INTERVIEW REPORT - ${report.title}`,
    `Date: ${report.date} | Duration: ${report.duration}`,
    `Score: ${report.score}/100 - ${report.status}`,
    `\nDescription: ${report.description}`,
    `\nQUESTIONS & ASSESSMENTS:`,
    ...report.questions.map(
      (q) =>
        `\n[${q.id}] ${q.prompt}\nExpected: ${q.expectedResponse}\nYour Response: ${q.userResponse}\nCoach Assessment: ${q.coachAssessment}\n`
    ),
  ];
  triggerDownload(`interview-report-${report.id}.txt`, textLines.join("\n"), "text/plain");
}
