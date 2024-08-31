const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Initialize a new Express application
const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the 'dist' directory
app.use(express.static("dist"));

// Initialize project data object
let projectData = {};

// GET route to send the current project data
app.get("/all", (req, res) => {
  res.send(projectData);
});

// POST route to add or update project data
app.post("/add", (req, res) => {
  projectData = req.body; // Save incoming data to the projectData object
  res.send(projectData); // Send the updated data back to the client
});

// Set the port for the server
const PORT = process.env.PORT || 8081;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export the app for testing
