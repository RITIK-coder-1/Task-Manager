// ----------------------------------------------
// db.js
// This file sets up the connection between the database and the express server,
// relying solely on environment variables for configuration.
// ----------------------------------------------

import mongoose from "mongoose"; // importing mongoose

// ----------------------------------------------
// The function to connect to the database
// ----------------------------------------------

async function connectDB() {
  // Constructing the full connection string from environment variables
  const connectionUrl = `${process.env.MONGO_URI}/${process.env.DB_NAME}`;

  try {
    // Attempt the connection using the environment-provided URL
    await mongoose.connect(connectionUrl);

    // Log success
    console.log("Database connected successfully!");
  } catch (error) {
    console.error(
      `CRITICAL ERROR: Failed to connect to the database: ${error}`
      // We print the error object itself for full stack trace
    );

    // Exit the process as the application cannot run without the database
    process.exit(1);
  }
}

export default connectDB;
