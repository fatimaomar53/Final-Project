import { validateInput } from "./inputValidation.js";
import { saveTrip } from "./saveTrip.js";
import { deleteTrip } from "./deleteTrip.js";
import defaultImage from "../assets/media/1-final-project.jpg";
import { calculateRemainingDays } from "./dateUtils.js";

let isSubmitting = false; // Flag to prevent multiple submissions

// Function to update the UI with the latest trip information from the server
export async function updateUI() {
  try {
    const response = await fetch("http://localhost:8080/all");

    if (!response.ok) {
      throw new Error(
        `GET request to /all failed with status ${response.status}`
      );
    }

    const trips = await response.json();

    if (!Array.isArray(trips) || trips.length === 0) {
      console.warn("No trips found.");
      return;
    }

    const tripInfoContainer = document.getElementById("trip-info-container");
    if (!tripInfoContainer) {
      console.error("trip-info-container element not found.");
      return;
    }

    tripInfoContainer.innerHTML = "";

    trips.forEach((trip, index) => {
      const remainingDays = calculateRemainingDays(trip.date);

      const tripElement = document.createElement("div");
      tripElement.classList.add("trip-item");

      tripElement.innerHTML = `
        <div class="trip-details">
          <p><strong>Location:</strong> ${
            trip.location || "Location not provided"
          }</p>
          <p><strong>Departure Date:</strong> ${
            trip.date
              ? new Date(trip.date).toLocaleDateString()
              : "Date not provided"
          }</p>
          <p><strong>Weather:</strong> ${
            trip.weather || "Weather not provided"
          }</p>
          <p><strong>Temperature:</strong> ${
            trip.temp
              ? `${Math.round(trip.temp)}°F`
              : "Temperature not provided"
          }</p>
          <p><strong>Days Remaining:</strong> ${
            remainingDays >= 0 ? `${remainingDays} days` : "Past departure date"
          }</p>
          <img src="${
            trip.image || defaultImage
          }" alt="Destination Image" class="destination-img" />
          <button id="deleteButton-${index}" type="button" class="btn delete-trip" data-trip-id="${index}" aria-label="Delete trip">Delete Trip</button>
        </div>
      `;

      tripInfoContainer.appendChild(tripElement);

      const deleteButton = tripElement.querySelector(`#deleteButton-${index}`);
      deleteButton.addEventListener("click", () => {
        deleteTrip(index);
      });
    });

    displayMostRecentTrip(trips[trips.length - 1]);
  } catch (error) {
    console.error("Error in updateUI:", error);
  }
}

// Function to display the most recent trip
function displayMostRecentTrip(data) {
  const elements = {
    destination: document.getElementById("display-destination"),
    departureDate: document.getElementById("display-departure-date"),
    temp: document.getElementById("display-temp"),
    weatherDescription: document.getElementById("display-weather-description"),
    image: document.getElementById("display-image"),
    daysRemaining: document.getElementById("display-days-remaining"),
  };

  // Clear previous content to avoid duplication
  if (elements.destination) elements.destination.innerText = "";
  if (elements.departureDate) elements.departureDate.innerText = "";
  if (elements.temp) elements.temp.innerText = "";
  if (elements.weatherDescription) elements.weatherDescription.innerText = "";
  if (elements.image) elements.image.src = "";
  if (elements.daysRemaining) elements.daysRemaining.innerText = "";

  // Display the most recent trip
  if (data) {
    if (elements.destination) {
      elements.destination.innerText = data.location || "Location not provided";
    }
    if (elements.departureDate) {
      elements.departureDate.innerText = data.date
        ? new Date(data.date).toLocaleDateString()
        : "Date not provided";
    }
    if (elements.temp) {
      elements.temp.innerText = data.temp
        ? `${Math.round(data.temp)}°F`
        : "Temperature not provided";
    }
    if (elements.weatherDescription) {
      elements.weatherDescription.innerText =
        data.weather || "Weather not provided";
    }
    if (elements.image) {
      elements.image.src = data.image || "../assets/media/1-final-project.jpg";
    }
    if (elements.daysRemaining) {
      const remainingDays = calculateRemainingDays(data.date);
      elements.daysRemaining.innerText =
        remainingDays >= 0 ? `${remainingDays} days` : "Past departure date";
    }
  } else {
    console.error("No recent trip data found.");
  }
}

// Function to send trip data to the server
export async function sendData(data) {
  try {
    const response = await fetch("http://localhost:8080/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Send trip data as JSON
    });

    if (!response.ok) {
      throw new Error(`POST request failed with status ${response.status}`);
    }
    const result = await response.json();
    console.log("Data successfully sent to the server:", result);
  } catch (error) {
    console.error("Error in sendData:", error);
  }
}
// Function to initialize the app and attach event listeners
export function initializeApp() {
  console.log("Initializing app");

  const form = document.getElementById("trip-form");
  if (form) {
    form.addEventListener("submit", handleSubmit);
  }

  const displayButton = document.getElementById("displayButton");
  if (displayButton) {
    displayButton.addEventListener("click", () => {
      document.getElementById("trip-info-container").classList.remove("hidden");
    });
  }

  const saveButton = document.getElementById("saveButton");
  if (saveButton) {
    saveButton.addEventListener("click", () => {
      document.getElementById("trip-info-container").classList.add("hidden");
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isSubmitting) return;
    isSubmitting = true;

    try {
      const location = document.getElementById("location").value;
      const departureDate = document.getElementById("departure-date").value;

      if (!validateInput()) {
        isSubmitting = false;
        return;
      }

      await saveTrip(location, departureDate);
      await updateUI();

      document.getElementById("location").value = "";
      document.getElementById("departure-date").value = "";
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    } finally {
      isSubmitting = false;
    }
  }
}
