//displayTrip.js
import defaultImage from "../assets/media/1-final-project.jpg";

export async function displayTrip() {
  console.log("Fetching trip data");
  const response = await fetch("http://localhost:8080/all");
  if (!response.ok) {
    throw new Error(
      `Failed to fetch stored trips with status ${response.status}`
    );
  }
  const trips = await response.json();
  console.log("Fetched trip data:", trips);

  const tripInfoContainer = document.getElementById("trip-info-container");
  if (tripInfoContainer) {
    tripInfoContainer.innerHTML = "";
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
          trip.image || defaultImage
        }" alt="Destination Image" class="destination-img" />
      `;
      tripInfoContainer.appendChild(tripElement);
    });
  } else {
    console.error("trip-info-container element not found.");
  }
}
