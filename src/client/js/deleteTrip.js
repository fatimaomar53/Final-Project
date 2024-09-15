export async function deleteTrip() {
  try {
    const response = await fetch("http://localhost:8080/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`DELETE request failed with status ${response.status}`);
    }

    console.log("Trip successfully deleted.");
    // Optionally, clear the UI or update it
    clearUI();
  } catch (error) {
    console.error("Error in deleteTrip:", error);
  }
}

function clearUI() {
  // Implement clearing UI logic if needed
  document.getElementById("trip-info-container").innerHTML = `
      <p><strong>Location:</strong> <span id="display-destination">N/A</span></p>
      <p><strong>Departure Date:</strong> <span id="display-departure-date"></span></p>
      <p><strong>Temperature:</strong> <span id="display-temp"></span></p>
      <p><strong>Weather:</strong> <span id="display-weather-description"></span></p>
      <img id="display-image" alt="Destination Image will appear here" class="destination-img" />
    `;
}
