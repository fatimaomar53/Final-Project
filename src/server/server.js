const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("src/client/assets"));

let trips = []; // Temporary in-memory storage

// Endpoint to add data
app.post("/add", (req, res) => {
  const tripData = req.body;
  trips.push(tripData); // Store the data
  res.json({ message: "Data successfully received!" });
});

// Endpoint to get all trips data
app.get("/all", (req, res) => {
  res.json(trips); // Send all stored data
});

app.delete("/delete/:id", (req, res) => {
  const tripId = req.params.id;

  // Assuming you are storing trips in an array
  if (trips[tripId]) {
    trips.splice(tripId, 1); // Remove the trip by index or unique ID
    res.status(200).send({ message: "Trip deleted successfully" });
  } else {
    res.status(404).send({ message: "Trip not found" });
  }
});

// Start the server
const PORT = process.env.PORT || 8080; // Default to 8080 if not defined

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
