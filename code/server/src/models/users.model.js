// ----------------------------------------------
// users.model.js
// This file defines the entire schema for storing the users' data of the application
// ----------------------------------------------

import mongoose from "mongoose"; // importing mongoose

// ----------------------------------------------
// Creating the user schema and defining its fields
// ----------------------------------------------

const userSchema = new mongoose.Schema(
  {
    // The fullname of the user. The first name is mandatory and the last name is optional.
    fullName: {
      firstName: {
        type: String, // Only string
        required: true,
        unique: false, // multiple people can have the same name
      },
      lastName: {
        type: String,
        required: false, // it is not required
        unique: false,
      },
    },

    // the unique username of the user. This could be a combination of different characters. 6-8 lowercase characters
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: [6, "You have to enter at least 6 characters"],
      maxlength: [8, "You can not enter more than 8 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// ----------------------------------------------
// Creating the User model based on "userSchema"
// ----------------------------------------------

const User = new mongoose.model("User", userSchema);

export default User; // exporting the model as default
