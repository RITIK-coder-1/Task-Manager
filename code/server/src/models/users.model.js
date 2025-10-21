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
        type: String,
        required: true, // mandatory
        unique: false, // multiple people can have the same name
      },
      lastName: {
        type: String,
        required: false, // optional
        unique: false,
      },
    },

    // the unique username of the user. This could be a combination of different characters. 6 lowercase characters
    username: {
      type: String,
      required: true,
      unique: true, // unique
      lowercase: true,
      minlength: [6, "The username must be of 6 characters only."],
      maxlength: [6, "The username must be of 6 characters only."],
    },

    // the password of the user. 6-8 characters
    password: {
      type: String,
      required: true, // mandatory
      unique: false,
      minlength: [6, "You have to enter at least 6 characters"],
      maxlength: [8, "You can not enter more than 8 characters"],
    },

    // the email of the User
    email: {
      type: String,
      required: true, // mandatory
      unique: true, // unique
      lowercase: true,
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
