// ----------------------------------------------
// server.js
// Entry point of the backend application.
// ----------------------------------------------

import express from "express"; // Import the Express framework
import statusRouter from "./routes/status.routes.js"; // Importing the authentication route

// ----------------------------------------------
// All the variables and constants of the file
// ----------------------------------------------

const app = express(); // Initialize the Express application
const port = 3000; // Port number for the server to listen on
const hostname = "localhost"; // Hostname

// ----------------------------------------------
// Routes
// ----------------------------------------------

// Simple status check
app.use("/", statusRouter);

// ----------------------------------------------
// Server Startup
// ----------------------------------------------

// Start the server and listen on the defined port
// Logs a message to confirm successful startup
app.listen(port, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
