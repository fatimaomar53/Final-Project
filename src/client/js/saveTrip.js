//saveTrip.js
import { sendData, updateUI } from "./app.js";

export async function saveTrip(location, departureDate) {
  console.log("saveTrip called");
  try {
    const [weatherData, geonamesData, pixabayData] = await Promise.all([
      getWeatherData(location),
      getGeonamesData(location),
      getPixabayData(location),
    ]);

    if (weatherData && pixabayData && pixabayData.hits.length > 0) {
      const image = pixabayData.hits[0].webformatURL;

      await sendData({
        location: location,
        date: departureDate,
        temp: weatherData.data[0].temp,
        weather: weatherData.data[0].weather.description,
        image: image,
      });

      updateUI(); // Update UI after sending data
    } else {
      console.error("Failed to retrieve data.");
    }
  } catch (error) {
    console.error("Error in saveTrip:", error);
  }
}

async function getWeatherData(location) {
  try {
    const response = await fetch(
      `${process.env.WEATHERBIT_BASE_URL}/current?city=${location}&key=${process.env.WEATHERBIT_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(
        `Weather API request failed with status ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

async function getGeonamesData(location) {
  try {
    const response = await fetch(
      `${process.env.GEONAMES_BASE_URL}/searchJSON?q=${location}&username=${process.env.GEONAMES_USERNAME}`
    );
    if (!response.ok) {
      throw new Error(
        `Geonames API request failed with status ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Geonames data:", error);
  }
}

async function getPixabayData(location) {
  try {
    const response = await fetch(
      `${process.env.PIXABAY_BASE_URL}/?q=${encodeURIComponent(location)}&key=${
        process.env.PIXABAY_API_KEY
      }`
    );
    if (!response.ok) {
      throw new Error(
        `Pixabay API request failed with status ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Pixabay data:", error);
  }
}
