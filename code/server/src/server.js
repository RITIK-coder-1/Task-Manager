// ----------------------------------------------
// server.js
// Entry point of the backend application.
// ----------------------------------------------

import app from "./app.js"; // importing the express app
import "dotenv/config"; // Importing the environment variables
import connectDB from "./config/db.js"; // The database connection function

// ----------------------------------------------
// All the variables and constants of the file
// ----------------------------------------------

const port = process.env.PORT || 3000; // Port number for the server to listen on
const hostname = "localhost"; // Hostname

// ----------------------------------------------
// Global error handling middleware
// ----------------------------------------------

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
