import "./styles/style.scss";
import { initializeApp } from "./js/app";
import destinationImage from "./views/media/1-final project.jpg";

// Ensure environment variables are accessible
const GEONAMES_BASE_URL = process.env.GEONAMES_BASE_URL;
const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;
const WEATHERBIT_BASE_URL = process.env.WEATHERBIT_BASE_URL;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_BASE_URL = process.env.PIXABAY_BASE_URL;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();

  // Set the image source dynamically
  const imageElement = document.querySelector(".destination-img");
  if (imageElement) {
    imageElement.src = destinationImage;
  }

  // Add event listener to form
  const form = document.getElementById("trip-form");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const location = document.getElementById("location").value;
      const date = document.getElementById("departure-date").value;

      try {
        // Fetch data from APIs
        const geonamesData = await fetchGeonamesData(location);
        const weatherData = await fetchWeatherData(location);
        const pixabayData = await fetchPixabayData(location);

        console.log(geonamesData, weatherData, pixabayData);
        // Handle the data from APIs
        // You might want to add more logic here to update the UI
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      }
    });
  }
});
async function fetchGeonamesData(city) {
  try {
    const response = await fetch(
      `${GEONAMES_BASE_URL}/searchJSON?q=${city}&username=${GEONAMES_USERNAME}`
    );
    if (response.status === 401) {
      throw new Error("Unauthorized: Check your Geonames username.");
    }
    if (!response.ok) {
      throw new Error(
        `Geonames API request failed with status ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Geonames data: ", error);
  }
}

async function fetchWeatherData(city) {
  if (!WEATHERBIT_BASE_URL || !WEATHERBIT_API_KEY) {
    console.error("Weatherbit API configuration is missing.");
    return;
  }

  try {
    const response = await fetch(
      `${WEATHERBIT_BASE_URL}/current?city=${city}&key=${WEATHERBIT_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(
        `Weatherbit API request failed with status ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Weather data: ", error);
  }
}

async function fetchPixabayData(query) {
  if (!PIXABAY_BASE_URL || !PIXABAY_API_KEY) {
    console.error("Pixabay API configuration is missing.");
    return;
  }

  try {
    const response = await fetch(
      `${PIXABAY_BASE_URL}/?q=${query}&key=${PIXABAY_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(
        `Pixabay API request failed with status ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Pixabay data: ", error);
  }
}
console.log("Geonames Base URL: ", process.env.GEONAMES_BASE_URL);
console.log("Geonames Username: ", process.env.GEONAMES_USERNAME);
