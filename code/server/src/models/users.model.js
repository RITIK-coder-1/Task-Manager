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
        trim: true, // removes the white space
      },
      lastName: {
        type: String,
        required: false, // optional
        unique: false,
        trim: true,
      },
    },

    // the unique username of the user. This could be a combination of different characters. 6 lowercase characters
    username: {
      type: String,
      required: [true, "Username is mandatory!"],
      unique: true, // unique
      lowercase: true,
      minlength: [3, "The username must be of 3 characters only."],
      maxlength: [30, "The username must not exceed 30 characters."],
    },

    // the password of the user. 6-8 characters
    password: {
      type: String,
      required: true, // mandatory
      unique: false,
      minlength: [10, "You have to enter at least 10 characters"], // longer password for security
    },

    // the email of the User
    email: {
      type: String,
      required: true, // mandatory
      unique: true, // unique
      lowercase: true,
      trim: true, // removes the whitespaces
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
