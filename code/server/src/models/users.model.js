// ----------------------------------------------
// users.model.js
// This file defines the entire schema for storing the users' data of the application
// ----------------------------------------------

import mongoose from "mongoose"; // importing mongoose

// ----------------------------------------------
// Creating the user schema and defining its fields
// ----------------------------------------------

const userSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

// ----------------------------------------------
// Creating the User model out of the user schema
// ----------------------------------------------

const User = new mongoose.model("User", userSchema);

export default User; // exporting the model as default
