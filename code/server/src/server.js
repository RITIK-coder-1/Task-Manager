// ----------------------------------------------
// server.js
// Entry point of the backend application.
// ----------------------------------------------

import app from "./app.js"; // importing the express app
import "dotenv/config.js"; // Importing the environment variables
import connectDB from "./config/db.js"; // The database connection function

// ----------------------------------------------
// All the variables and constants of the file
// ----------------------------------------------

const port = process.env.PORT || 3000; // Port number for the server to listen on
const hostname = process.env.HOST || "0.0.0.0"; // Hostname

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
    console.error(
      "there was an error while connecting to the database and it was: ",
      err
    ); // If there is a problem while connecting to the database
  });
