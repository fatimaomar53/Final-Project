// deleteTrip.js
import { updateUI } from "./app.js"; // Import updateUI to refresh UI after deletion

export async function deleteTrip(tripId) {
  try {
    const response = await fetch(`http://localhost:8080/delete/${tripId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete trip with status ${response.status}`);
    }

    const result = await response.json();
    console.log("Trip deleted:", result);

    // Update the UI after deletion
    updateUI(); // Re-fetch and display updated trips
  } catch (error) {
    console.error("Error deleting trip:", error);
  }
}
