// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
// Here we are configuring express to use body-parser as middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
app.listen(port, () => {
  console.log(`Server running on localhost: ${port}`);
});

// Route to get all data
app.get("/all", (req, res) => {
  res.send(projectData);
});

// Post Route to add data
app.post("/add", (req, res) => {
  projectData = req.body;
  res.send(projectData);
});
