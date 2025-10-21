// ----------------------------------------------
// db.js
// This file sets up the connection between the database and the express server.
// ----------------------------------------------

import mongoose from "mongoose"; // importing mongoose

// ----------------------------------------------
// The function to connect to the database
// ----------------------------------------------

async function connectDB() {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
    console.log("Database connected successfully!"); // if the connection was successful
  } catch (error) {
    console.log(
      `There was an error while connecting to the database and it was: ${error}`
    ); // if there is an error while connecting
    process.exit(1); // exit with a general error message
  }
}

export default connectDB; // exporting the connection function
