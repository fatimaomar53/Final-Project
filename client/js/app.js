// Define API keys and base URLs from environment variables
const geonamesBaseURL = process.env.GEONAMES_BASE_URL;
const weatherbitBaseURL = process.env.WEATHERBIT_BASE_URL;
const pixabayBaseURL = process.env.PIXABAY_BASE_URL;
const geonamesAPIKey = process.env.GEONAMES_API_KEY;
const weatherbitAPIKey = process.env.WEATHERBIT_API_KEY;
const pixabayAPIKey = process.env.PIXABAY_API_KEY;

// Primary object with placeholder values
let projectData = {
  location: "",
  date: "",
  temp: "",
  weather: "",
  image: "",
};

// Export the primary function
export function initializeApp() {
  // Add event listener to the 'Save Trip' button
  document
    .getElementById("trip-form")
    .addEventListener("submit", performAction);

  // Function to handle form submission
  function performAction(e) {
    e.preventDefault(); // Prevent form from refreshing the page
    const location = document.getElementById("location").value;
    const departureDate = document.getElementById("departure-date").value;

    if (!location) {
      alert("Please enter a location.");
      return;
    }

    // Fetch data from APIs
    Promise.all([
      getWeatherData(weatherbitBaseURL, location, `&key=${weatherbitAPIKey}`),
      getGeonamesData(geonamesBaseURL, location, `&username=${geonamesAPIKey}`),
      getPixabayData(pixabayBaseURL, location, `&key=${pixabayAPIKey}`),
    ])
      .then(([weatherData, geonamesData, pixabayData]) => {
        if (
          weatherData &&
          weatherData.data &&
          pixabayData &&
          pixabayData.hits.length > 0
        ) {
          const image = pixabayData.hits[0].webformatURL; // Get the first image from Pixabay
          sendData("/add", {
            location: location,
            date: departureDate,
            temp: weatherData.data[0].temp,
            weather: weatherData.data[0].weather.description,
            image: image,
          });
        } else {
          console.error("Failed to retrieve data.");
        }
      })
      .then(updateUI)
      .catch((error) => console.log("Error: ", error));
  }

  // Function to fetch weather data from Weatherbit API
  async function getWeatherData(baseURL, location, key) {
    const response = await fetch(baseURL + location + key);
    try {
      const data = await response.json();
      if (data && data.data && data.data.length > 0) {
        return data;
      } else {
        console.error("Error: Unable to retrieve weather data.");
      }
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  }

  // Function to fetch data from Geonames API
  async function getGeonamesData(baseURL, location, key) {
    const response = await fetch(baseURL + location + key);
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Geonames data: ", error);
    }
  }

  // Function to fetch data from Pixabay API
  async function getPixabayData(baseURL, location, key) {
    const response = await fetch(`${baseURL}?q=${location}${key}`);
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Pixabay data: ", error);
    }
  }

  // Function to send data to the server
  async function sendData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.error("Error sending data: ", error);
    }
  }

  // Function to update the UI with the most recent data
  async function updateUI() {
    const request = await fetch("/all");
    try {
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
      document.getElementById("image").src = allData.image; // Display the image from Pixabay
    } catch (error) {
      console.error("Error updating UI: ", error);
    }
  }

  // Function to calculate days away from the departure date
  function calculateDaysAway(date) {
    const today = new Date();
    const tripDate = new Date(date);
    const differenceInTime = tripDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  }
}
