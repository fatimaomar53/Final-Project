const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());

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

// Start the server
const PORT = process.env.PORT || 8080; // Default to 8080 if not defined

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
