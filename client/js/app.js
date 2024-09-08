// Define API keys and base URLs from environment variables
const GEONAMES_BASE_URL = process.env.GEONAMES_BASE_URL;
const weatherbitBaseURL = process.env.WEATHERBIT_BASE_URL;
const pixabayBaseURL = process.env.PIXABAY_BASE_URL;
const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;
const weatherbitAPIKey = process.env.WEATHERBIT_API_KEY;
const pixabayAPIKey = process.env.PIXABAY_API_KEY;

// Export the initializeApp function
export function initializeApp() {
  document
    .getElementById("trip-form")
    .addEventListener("submit", performAction);

  async function performAction(e) {
    e.preventDefault(); // Prevent form from refreshing the page
    const location = document.getElementById("location").value;
    const departureDate = document.getElementById("departure-date").value;

    if (!location) {
      alert("Please enter a location.");
      return;
    }

    try {
      const [weatherData, geonamesData, pixabayData] = await Promise.all([
        getWeatherData(location),
        getGeonamesData(location),
        getPixabayData(location),
      ]);

      if (weatherData && pixabayData && pixabayData.hits.length > 0) {
        const image = pixabayData.hits[0].webformatURL;

        // Call sendData here
        await sendData("/add", {
          location: location,
          date: departureDate,
          temp: weatherData.data[0].temp,
          weather: weatherData.data[0].weather.description,
          image: image,
        });

        updateUI();
      } else {
        console.error("Failed to retrieve data.");
      }
    } catch (error) {
      console.error("Error in performAction: ", error);
    }
  }

  async function getWeatherData(location) {
    const response = await fetch(
      `${weatherbitBaseURL}/current?city=${location}&key=${weatherbitAPIKey}`
    );
    if (!response.ok) {
      throw new Error(
        `Weather API request failed with status ${response.status}`
      );
    }
    return await response.json();
  }

  async function getGeonamesData(city) {
    try {
      const response = await fetch(
        `${GEONAMES_BASE_URL}/searchJSON?q=${city}&username=${GEONAMES_USERNAME}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching Geonames data:", error);
      throw error;
    }
  }

  async function getPixabayData(location) {
    const response = await fetch(
      `${pixabayBaseURL}/?q=${location}&key=${pixabayAPIKey}`
    );
    if (!response.ok) {
      throw new Error(
        `Pixabay API request failed with status ${response.status}`
      );
    }
    return await response.json();
  }

  async function updateUI() {
    try {
      const request = await fetch("/all"); // Adjust this URL if needed
      if (!request.ok) {
        throw new Error(
          `GET request to /all failed with status ${request.status}`
        );
      }
      const allData = await request.json();
      document.getElementById("destination").innerText = allData.location;
      document.getElementById("departure-date").innerText = allData.date;
      document.getElementById("temp").innerText = `${Math.round(
        allData.temp
      )}°F`;
      document.getElementById("weather-description").innerText =
        allData.weather;
      document.getElementById("days-away").innerText = calculateDaysAway(
        allData.date
      );
      document.getElementById("image").src = allData.image;
    } catch (error) {
      console.error("Error in updateUI:", error);
    }
  }

  // Example function to send data to server
  async function sendData(url = "", data = {}) {
    console.log("Sending data to:", url);

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`POST request failed with status ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Data successfully sent to the server:", responseData);

      // Display success alert
      alert("Data successfully saved!");
      return responseData;
    } catch (error) {
      console.error("Error in sendData:", error);

      // Display error alert
      alert("Failed to save data. Please try again!");
    }
  }
  // Function to handle the display of trip information after saving
  function displayTripInfo(data) {
    // Select DOM elements to update
    const locationElement = document.getElementById("display-location");
    const departureDateElement = document.getElementById(
      "display-departure-date"
    );

    // Update DOM elements with data received from the server
    locationElement.innerText = data.location || "Unknown Location";
    departureDateElement.innerText = data.departureDate || "Unknown Date";
  }
  async function performAction(event) {
    event.preventDefault();

    const data = {
      location: "Amman",
      temp: 23,
      weather: "Clear sky",
      image:
        "https://pixabay.com/get/g88e0fe633106ff44925184b446ab7ed8d4002400bf95d4b270e23182eeed66abe62de38c7e057bb9f1df5f7e5933f54cc5bdb3a960f1e7cfd7de0c9a985684e6_640.jpg",
    };

    const url = "http://localhost:8080/add";
    await sendData(url, data);
  }

  document
    .getElementById("saveButton")
    .addEventListener("click", performAction);

  function calculateDaysAway(date) {
    const today = new Date();
    const tripDate = new Date(date);
    const differenceInTime = tripDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  }
}

// Initialize the app
initializeApp();
console.log("GEONAMES_BASE_URL:", GEONAMES_BASE_URL);
console.log("WEATHERBIT_BASE_URL:", weatherbitBaseURL);
console.log("PIXABAY_BASE_URL:", pixabayBaseURL);
