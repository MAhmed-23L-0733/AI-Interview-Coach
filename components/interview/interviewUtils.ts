export function formatSeconds(sec: number): string {
  const mins = Math.floor(sec / 60);
  const remainder = sec % 60;
  return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
}

export const MOCK_TEST_OUTPUT = `✓ Test Case 1: [2, 1, 3, 5, 3, 2] -> 3 passed
✓ Test Case 2: [1, 2, 3, 4] -> None passed
✓ Test Case 3: [5, 5] -> 5 passed

All 3 test assertions passed in 14ms (Memory: 14.2 MB).`;

export const FOLLOW_UP_AI_PROMPT =
  "Spot on! Now let's explore if we can solve this with O(1) auxiliary space if the array values are guaranteed to be in the range [1, n].";

export const USER_MOCK_ANSWER =
  "The time complexity is O(n) because we iterate through the list once. The space complexity is O(n) in the worst case where all elements are distinct and stored in the set.";
