import type { QuestionAnalysis } from "@/lib/validations/report";

export const MOCK_REPORT_QUESTIONS: QuestionAnalysis[] = [
  {
    id: "01",
    topic: "Data Structures",
    status: "Strong",
    prompt: "Given an array of integers, how would you find the first duplicate value?",
    expectedResponse:
      "Use a hash set while scanning once. Return the first value already present; state O(n) average time and O(n) auxiliary space, and address the no duplicate case.",
    userResponse:
      "Use a HashSet to track values already seen. Check each value during iteration and return it when it is already in the set.",
    coachAssessment:
      "The approach and implementation were correct. The space complexity required a follow-up prompt.",
  },
  {
    id: "02",
    topic: "Algorithms",
    status: "Good",
    prompt: "How would you find the shortest path in an unweighted graph, and why?",
    expectedResponse:
      "Use breadth-first search because it explores nodes layer by layer. Explain O(V + E) time, O(V) space, visited state tracking, and path reconstruction with parent pointers.",
    userResponse:
      "I would use BFS and implement it in a queue, and trace when the target is reached.",
    coachAssessment:
      "Correct algorithm and stopping condition. Complexity and parent-pointer path reconstruction should have been stated.",
  },
  {
    id: "03",
    topic: "OOP",
    status: "Developing",
    prompt: "How would you design an extensible notification service for email, SMS, and push?",
    expectedResponse:
      "Define a common sender interface, use dependency injection/registry, orchestrate retry/failure policies, decouple implementations, and apply the open/closed principle so new channels do not modify existing logic.",
    userResponse:
      "I would make a base Notification class and make classes for each notification type.",
    coachAssessment:
      "Inheritance is workable, but a composition, failure handling, and dependency injection solution was preferred.",
  },
  {
    id: "04",
    topic: "Operating Systems",
    status: "Good",
    prompt: "What is the difference between a process and a thread, and when would you use each?",
    expectedResponse:
      "Compare address space isolation, shared memory, context switch cost/failure boundaries, and summarize use cases with a concrete scenario.",
    userResponse:
      "Processes have separate memory, while threads share memory and are lighter to create.",
    coachAssessment:
      "The core definition was accurate. Detail context, failure isolation, and performance tradeoffs.",
  },
];
