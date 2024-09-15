// __tests__/dateUtils.test.js
import { calculateRemainingDays } from "../js/dateUtils";

test("should calculate remaining days correctly", () => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + 10); // 10 days in the future

  const result = calculateRemainingDays(futureDate.toISOString().split("T")[0]);

  expect(result).toBe(10);
});

test("should return 0 for today's date", () => {
  const today = new Date();
  const result = calculateRemainingDays(today.toISOString().split("T")[0]);

  expect(result).toBeCloseTo(0); // Use toBeCloseTo to handle -0 and 0 equivalently
});

test("should handle past dates correctly", () => {
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - 5); // 5 days in the past

  const result = calculateRemainingDays(pastDate.toISOString().split("T")[0]);

  expect(result).toBe(-5);
});
