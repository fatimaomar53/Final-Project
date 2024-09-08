const express = require("express");
const cors = require("cors"); // Import cors middleware

const app = express();
const PORT = 8080; // Ensure this matches the port in your client code
let tripData = {};
// app.use(cors()); // Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:8081", // Allow requests from this origin
    methods: ["GET", "POST"], // Allow only specific HTTP methods
    allowedHeaders: ["Content-Type"], // Allow only specific headers
  })
);

app.use(express.json()); // To parse JSON request bodies

// Example /add endpoint to handle POST requests
app.post("/add", (req, res) => {
  const data = req.body; // Retrieve data from request body
  console.log("Received data:", data);

  // Perform your logic here (e.g., save data to database or memory)

  // Send response back to client
  res.status(200).json({ message: "Data successfully received!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
