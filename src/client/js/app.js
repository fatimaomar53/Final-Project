import { validateInput } from "./inputValidation.js";
import { saveTrip } from "./saveTrip.js";
import { deleteTrip } from "./deleteTrip.js";
import { displayTrip } from "./displayTrip.js";

export async function updateUI() {
  try {
    const response = await fetch("http://localhost:8080/all");
    if (!response.ok) {
      throw new Error(
        `GET request to /all failed with status ${response.status}`
      );
    }
    const allData = await response.json();

    const elements = {
      destination: document.getElementById("destination"),
      departureDate: document.getElementById("departure-date"),
      temp: document.getElementById("temp"),
      weatherDescription: document.getElementById("weather-description"),
      image: document.querySelector(".destination-img"),
    };

    if (Array.isArray(allData) && allData.length > 0) {
      const data = allData[allData.length - 1]; // Display the most recent trip

      if (elements.destination) {
        elements.destination.innerText =
          data.location || "Location not provided";
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
        elements.image.src = data.image || "./media/placeholder.jpg";
      }
    } else {
      console.error("No data found");
    }
  } catch (error) {
    console.error("Error in updateUI:", error);
  }
}
export async function sendData(data) {
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
export function initializeApp() {
  const form = document.getElementById("trip-form");
  if (form) {
    form.addEventListener("submit", handleSubmit);
  }

  const deleteButton = document.getElementById("deleteButton");
  if (deleteButton) {
    deleteButton.addEventListener("click", deleteTrip); // Function to handle delete
  }

  const displayButton = document.getElementById("displayButton");
  if (displayButton) {
    displayButton.addEventListener("click", displayTrip); // Function to handle display
  }

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent form from refreshing the page

    const location = document.getElementById("city").value;
    const departureDate = document.getElementById("date").value;

    if (!validateInput()) {
      return; // If validation fails, do not proceed
    }

    await saveTrip(location, departureDate); // Save trip if validation succeeds
    updateUI(); // Update UI after saving the trip
  }
}
