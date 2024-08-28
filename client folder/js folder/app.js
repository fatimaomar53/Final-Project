/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "6badd7a71271ed8821d338f85d509111&units=imperial";

// Add event listener to the 'Generate' button
document.getElementById("generate").addEventListener("click", performAction);

// Function to handle button click event
function performAction(e) {
  const zipCode = document.getElementById("zip").value;
  const userFeeling = document.getElementById("feelings").value;

  if (!zipCode) {
    alert("Please enter a zip code.");
    return;
  }

  getWeatherData(baseURL, zipCode, `&appid=${apiKey}`)
    .then((weatherData) => {
      if (weatherData && weatherData.main) {
        sendData("/add", {
          date: currentDate(),
          temp: weatherData.main.temp,
          feel: userFeeling,
        });
      } else {
        console.error("Failed to retrieve weather data.");
      }
    })
    .then(updateUI)
    .catch((error) => console.log("Error: ", error));
}

// Function to fetch weather data from OpenWeatherMap API
const getWeatherData = async (baseURL, zip, key) => {
  const response = await fetch(baseURL + zip + key);

  if (response.status === 401) {
    console.error("Unauthorized: Please check your API key.");
    return;
  }

  try {
    const data = await response.json();
    if (data.main) {
      return data;
    } else {
      console.error("Error: Unable to retrieve weather data.");
    }
  } catch (error) {
    console.error("Error fetching weather data: ", error);
  }
};

// Function to send data to the server
const sendData = async (url = "", data = {}) => {
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
};

// Function to update the UI with the most recent data
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("temp").innerText = `${Math.round(
      allData.temp
    )} degrees`;
    document.getElementById("content").innerText = allData.feel;
    document.getElementById("date").innerText = allData.date;
  } catch (error) {
    console.error("Error updating UI: ", error);
  }
};

// Function to get the current date
const currentDate = () => {
  const d = new Date();
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
};
