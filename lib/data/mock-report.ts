import type { SessionReport } from "@/lib/validations/report";
import { MOCK_REPORT_QUESTIONS } from "./mock-questions";

export const DEFAULT_SESSION_REPORT: SessionReport = {
  id: "session-1",
  title: "Interview report",
  topicsCount: 4,
  date: "May 24, 2025",
  duration: "28 minutes",
  score: 84,
  status: "Strong foundation, with room to sharpen analysis",
  description:
    "You communicated your approach clearly and selected appropriate data structures. Focus next on edge cases and complexity with more precision.",
  highlights: ["Clear communication", "Correct solutions", "Improve complexity analysis"],
  percentile: "Top 24%",
  percentileSubtext: "of Data Structures sessions",
  dimensions: [
    { label: "Problem solving", score: 92 },
    { label: "Technical accuracy", score: 86 },
    { label: "Communication", score: 82 },
    { label: "Code quality", score: 81 },
    { label: "Complexity analysis", score: 67 },
  ],
  recommendedFocus: [
    {
      id: "01",
      title: "Big-O analysis",
      description: "State time and space complexity without prompting and explain what drives each term.",
    },
    {
      id: "02",
      title: "Solution tradeoffs",
      description: "Compare the hash set approach with sorting and clarify when each is preferable.",
    },
    {
      id: "03",
      title: "Edge cases",
      description: "Proactively test empty arrays, single values, and inputs with no duplicates.",
    },
  ],
  topicFeedback: {
    topicName: "Data Structures",
    strengths: [
      {
        title: "Hash-based lookup",
        description: "Quickly identified a hash set as the optimal structure for constant-time lookup.",
      },
      {
        title: "Implementation quality",
        description: "Code was clean, readable, and handled the primary test cases correctly.",
      },
      {
        title: "Verbal reasoning",
        description: "Explained the solution incrementally and responded well to follow-up questions.",
      },
    ],
    gaps: [
      {
        title: "Big-O precision",
        description: "You correctly stated O(n) time but needed prompting to identify O(n) auxiliary space.",
      },
      {
        title: "Alternative approaches",
        description: "Consider sorting for memory-constrained environments, with the tradeoff of O(n log n) time.",
      },
      {
        title: "Input assumptions",
        description: "Clarify whether mutating the input is allowed before choosing an in-place strategy.",
      },
    ],
  },
  questions: MOCK_REPORT_QUESTIONS,
};
