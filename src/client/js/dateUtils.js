//dateUtils.js
// Function to calculate the number of remaining days from today to a target departure date
export function calculateRemainingDays(dateStr) {
  const today = new Date();
  const departureDate = new Date(dateStr);
  const timeDifference = departureDate - today;
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
}
