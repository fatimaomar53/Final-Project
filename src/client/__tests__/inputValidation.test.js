// __tests__/inputValidation.test.js
import { validateInput } from "../js/inputValidation.js";
import { calculateRemainingDays } from "../js/dateUtils.js";

// Mocking DOM elements for testing
beforeEach(() => {
  document.body.innerHTML = `
    <input id="location" type="text" />
    <input id="departure-date" type="date" />
    <div id="city-error"></div>
    <div id="date-error"></div>
  `;
});

// Mock the calculateRemainingDays function
jest.mock("../js/dateUtils.js", () => ({
  calculateRemainingDays: jest.fn(),
}));

test("should show error if city field is empty", () => {
  const cityField = document.getElementById("location");
  const dateField = document.getElementById("departure-date");
  const cityErrorElement = document.getElementById("city-error");

  cityField.value = "";
  dateField.value = "2024-12-01";

  const result = validateInput();

  expect(result).toBe(false);
  expect(cityErrorElement.textContent).toBe("City name is required");
  expect(cityErrorElement.style.display).toBe("block");
});

test("should show error if date field is empty", () => {
  const cityField = document.getElementById("location");
  const dateField = document.getElementById("departure-date");
  const dateErrorElement = document.getElementById("date-error");

  cityField.value = "Paris";
  dateField.value = "";

  const result = validateInput();

  expect(result).toBe(false);
  expect(dateErrorElement.textContent).toBe("Departure date is required");
  expect(dateErrorElement.style.display).toBe("block");
});

test("should show error if date is in the past", () => {
  const cityField = document.getElementById("location");
  const dateField = document.getElementById("departure-date");
  const dateErrorElement = document.getElementById("date-error");

  cityField.value = "Paris";
  dateField.value = "2020-01-01";

  calculateRemainingDays.mockReturnValue(-5);

  const result = validateInput();

  expect(result).toBe(false);
  expect(dateErrorElement.textContent).toBe("Date cannot be in the past");
  expect(dateErrorElement.style.display).toBe("block");
});

test("should return true if all inputs are valid", () => {
  const cityField = document.getElementById("location");
  const dateField = document.getElementById("departure-date");

  cityField.value = "Paris";
  dateField.value = "2024-12-01";

  calculateRemainingDays.mockReturnValue(30);

  const result = validateInput();

  expect(result).toBe(true);
});
