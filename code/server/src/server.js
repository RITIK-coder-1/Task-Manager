// ----------------------------------------------
// server.js
// Entry point of the backend application.
// ----------------------------------------------

import express from "express"; // Import the Express framework
import statusRouter from "./routes/status.routes.js"; // Importing the authentication route
import "dotenv/config"; // Importing the environment variables
import connectDB from "./config/db.js"; // The database connection function

// ----------------------------------------------
// All the variables and constants of the file
// ----------------------------------------------

const app = express(); // Initialize the Express application
const port = process.env.PORT || 3000; // Port number for the server to listen on
const hostname = "localhost"; // Hostname

// ----------------------------------------------
// Routes
// ----------------------------------------------

// Simple status check
app.use("/", statusRouter);

// ----------------------------------------------
// Global error checks
// ----------------------------------------------

app.on("error", (error) => {
  console.log("There was an unexpected error: ", error); // it catches any unexpected errors before starting the server
});

// Global Error Handling Middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? error : undefined, // Full error object for debugging (only in development)
  });
});

// ----------------------------------------------
// Server Startup and Database Connection
// ----------------------------------------------

connectDB()
  .then(() => {
    // Start the server and listen on the defined port if the database connected properly
    // Logs a message to confirm successful startup
    app.listen(port, () => {
      console.log(`Server is running at http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.log(
      "there was an error while connecting to the database and it was: ",
      err
    ); // If there is a problem while connecting to the database
  });
