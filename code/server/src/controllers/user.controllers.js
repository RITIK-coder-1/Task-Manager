// ----------------------------------------------
// user.controllers.js
// This file contains all the countrollers for user routes
// ----------------------------------------------

import ApiError from "../utils/apiError.js";
import User from "../models/users.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// ----------------------------------------------
// Register Controller (The function to register a new user on the platform)
// ----------------------------------------------

const registerUserFunction = async (req, res) => {
  // taking all the input fields from the client request
  const { fullName, username, password, email } = req.body;
  const { profilePicturePath } = req.files; // the file uploaded

  // checking if all the required fields are present or not
  const isRequiredAbsent = [fullName, username, password, email].map(
    (field) => {
      if (field.trim() === "") {
        return true; // if at least one field is not entered, it will store true
      }
    }
  );

  if (isRequiredAbsent) {
    throw new ApiError(400, "All the fields are required!"); // if at least one field is not entered, throw an error
  }

  // checking if the user already exists
  const isUserExists = await User.findOne({
    $or: [{ username }, { email }], // if the username or the email already exists, return true
  });

  if (isUserExists) {
    throw new ApiError(400, "The user is already registered!"); // if the user is not new, throw an error
  }

  // once the new user is validated, we save all the details of the user

  // uploading the profile image
  const profilePicture = await uploadOnCloudinary(profilePicturePath);

  if (!profilePicture) {
    throw new ApiError(400, "The profile picture wasn't uploaded!"); // if cloudinary returns null, the profile pic wasn't uploaded
  }

  // saving the user data in the database
  const user = await User.create({
    fullName,
    username,
    email,
    password,
    profilePicture: profilePicture?.url || "", // only if the profile picture is present, else it should be empty
  });

  // last validation if the user has been registered
  const createdUser = await User.findById(user._id).select(
    "-password -refreshTokenString"
  ); // if the user exists return true

  if (!createdUser) {
    throw new ApiError(500, "There was a problem while registering the user!");
  }

  // if the user has been validated and registered successfully, return a success response

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        createdUser,
        "The user has been registered successfully!"
      )
    );
};

const registerUser = asyncHandler(registerUserFunction); // error handling

export { registerUser };
