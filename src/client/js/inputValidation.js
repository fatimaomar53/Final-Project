// inputValidation.js
import { calculateRemainingDays } from "./dateUtils.js";
const validateInput = () => {
  const cityField = document.getElementById("location"); // City input field
  const dateField = document.getElementById("departure-date"); // Date input field
  const cityErrorElement = document.getElementById("city-error"); // City error message element
  const dateErrorElement = document.getElementById("date-error"); // Date error message element

  console.log("Date field value: ", dateField.value); // Debug the value of dateField

  // Initially hide the error messages before validation starts
  cityErrorElement.style.display = "none";
  dateErrorElement.style.display = "none";

  // Check if the city input field is empty
  if (!cityField.value.trim()) {
    cityErrorElement.textContent = "City name is required"; // Set error message for missing city name
    cityErrorElement.style.display = "block"; // Show the error message
    return false; // Return false if city input is invalid
  }

  // Check if the date input field is empty
  if (!dateField.value) {
    console.log("Date validation failed: No date provided"); // Log if this condition is triggered
    dateErrorElement.textContent = "Departure date is required"; // Set error message for missing date
    dateErrorElement.style.display = "block"; // Show the error message
    return false; // Return false if date input is invalid
  }

  // Check if the provided date is in the past
  if (calculateRemainingDays(dateField.value) < 0) {
    console.log("Date validation failed: Date is in the past"); // Log if this condition is triggered
    dateErrorElement.textContent = "Date cannot be in the past"; // Set error message for past date
    dateErrorElement.style.display = "block"; // Show the error message
    return false; // Return false if the date is invalid
  }

  console.log("Validation succeeded"); // Log when validation succeeds

  // If both city and date inputs are valid, return true
  return true;
};

export { validateInput };
