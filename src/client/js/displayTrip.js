export async function displayTrip() {
  try {
    const response = await fetch("http://localhost:8080/all");
    if (!response.ok) {
      throw new Error(
        `GET request to /all failed with status ${response.status}`
      );
    }
    const allData = await response.json();

    const elements = {
      destination: document.getElementById("display-destination"),
      departureDate: document.getElementById("display-departure-date"),
      temp: document.getElementById("display-temp"),
      weatherDescription: document.getElementById(
        "display-weather-description"
      ),
      image: document.getElementById("display-image"),
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
        elements.image.src = data.image || "./assets/media/1-final project.jpg";
      }
    } else {
      console.error("No data found");
    }
  } catch (error) {
    console.error("Error in displayTrip:", error);
  }
}
