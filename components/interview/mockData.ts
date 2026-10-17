import type { InterviewSessionData, SupportedLanguage } from "./types";

export const LANGUAGE_TEMPLATES: Record<SupportedLanguage, string> = {
  python: `def first_duplicate(nums):
    # Track values we've already seen
    seen = set()

    for num in nums:
        if num in seen:
            return num
        seen.add(num)

    return None`,
  typescript: `function firstDuplicate(nums: number[]): number | null {
    // Track values we've already seen
    const seen = new Set<number>();

    for (const num of nums) {
        if (seen.has(num)) {
            return num;
        }
        seen.add(num);
    }

    return null;
}`,
  javascript: `function firstDuplicate(nums) {
    // Track values we've already seen
    const seen = new Set();

    for (const num of nums) {
        if (seen.has(num)) {
            return num;
        }
        seen.add(num);
    }

    return null;
}`,
  go: `package main

// FirstDuplicate finds the first duplicate in a slice
func FirstDuplicate(nums []int) *int {
    seen := make(map[int]bool)
    for _, num := range nums {
        if seen[num] {
            return &num
        }
        seen[num] = true
    }
    return nil
}`,
};

export const INITIAL_INTERVIEW_SESSION: InterviewSessionData = {
  id: "session-ds-01",
  title: "Technical Interview",
  topic: "Data Structures",
  initialTimeRemaining: 18 * 60 + 42, // 18:42
  initialLanguage: "python",
  initialCode: LANGUAGE_TEMPLATES.python,
  messages: [
    {
      id: "msg-1",
      speaker: "ai",
      name: "Interviewer",
      avatar: "AI",
      timestamp: "18:10",
      content:
        "Let's work through a data structures problem. Given an array of integers, can you describe how you would find the first duplicate value?",
      isActive: false,
    },
    {
      id: "msg-2",
      speaker: "user",
      name: "You",
      avatar: "AM",
      timestamp: "18:24",
      content:
        "I'd use a hash set to track the values I've already seen. As I iterate through the array, I would check whether each value is in the set.",
      isActive: false,
    },
    {
      id: "msg-3",
      speaker: "ai",
      name: "Interviewer",
      avatar: "AI",
      timestamp: "18:39",
      content:
        "Good. What would the time and space complexity be? And could you think of a case where you might prefer a different approach?",
      isActive: true,
    },
  ],
};
