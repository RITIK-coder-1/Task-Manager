// ----------------------------------------------
// server.js
// Entry point of the backend application.
// Sets up an Express server with a test route.
// ----------------------------------------------

import express from "express"; // Import the Express framework

// ----------------------------------------------
// All the variables and constants of the file
// ----------------------------------------------

const app = express(); // Initialize the Express application
const port = 3000; // Port number for the server to listen on
const hostname = "localhost"; // Hostname

// ----------------------------------------------
// Routes
// ----------------------------------------------

// GET / → Root route
// Sends a simple text response to verify that the server is running
app.get("/", (req, res) => {
  res.send("Hey!");
});

// ----------------------------------------------
// Server Startup
// ----------------------------------------------

// Start the server and listen on the defined port
// Logs a message to confirm successful startup
app.listen(port, () => {
  console.log(`✅ Server is running at http://${hostname}:${port}`);
});
