import "./assets/styles/style.scss";
import { initializeApp, updateUI } from "./js/app.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();

  const form = document.getElementById("trip-form");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      await performAction();
      updateUI(); // Call the imported updateUI function
    });
  }

  displayStoredTrips();
});

// Function to perform the main action: Collect data, send it to the server, and update the UI
async function performAction() {
  const data = {
    location: document.getElementById("location").value,
    date: document.getElementById("departure-date").value,
    temp: document.getElementById("temp")
      ? document.getElementById("temp").innerText
      : "",
    weather: document.getElementById("weather-description")
      ? document.getElementById("weather-description").innerText
      : "",
    image: document.getElementById("image")
      ? document.getElementById("image").src
      : "./assets/media/placeholder.jpg", // Updated path
  };

  await sendData(data);
  updateUI();
}

// Function to send trip data to the server
async function sendData(data) {
  try {
    const response = await fetch("http://localhost:8080/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

// Function to display stored trips
async function displayStoredTrips() {
  try {
    const response = await fetch("http://localhost:8080/all");
    if (!response.ok) {
      throw new Error(
        `Failed to fetch stored trips with status ${response.status}`
      );
    }
    const trips = await response.json();

    const tripInfoContainer = document.getElementById("trip-info-container");
    tripInfoContainer.innerHTML = ""; // Clear previous entries

    trips.forEach((trip) => {
      const tripElement = document.createElement("div");
      tripElement.innerHTML = `
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
        <img src="${
          trip.image || "./assets/media/placeholder.jpg"
        }" alt="Destination Image" class="destination-img" />
      `;
      tripInfoContainer.appendChild(tripElement);
    });
  } catch (error) {
    console.error("Error displaying stored trips:", error);
  }
}
