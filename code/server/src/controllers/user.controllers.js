// ----------------------------------------------
// user.controllers.js
// This file contains all the countrollers for user routes
// ----------------------------------------------

import ApiError from "../utils/apiError.js";
import User from "../models/users.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateRandomTokenString from "../utils/generateRandomTokenString.js";

// ----------------------------------------------
// Function to generate access and refresh tokens on login and logout
// ----------------------------------------------

const generateTokens = async (userId) => {
  const randomString = generateRandomTokenString(); // this random set of strings is used with the refresh token to validate the user
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken(randomString);

    await user.save({ validateBeforeSave: false }); // we don't validate each field whenever the user logs in or out

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Could not generate tokens");
  }
};

// ----------------------------------------------
// Register Controller (The function to register a new user on the platform)
// ----------------------------------------------

const registerUserFunction = async (req, res) => {
  // taking all the input fields from the client request
  const { fullName, username, password, email } = req.body;
  const { profilePicturePath } = req.files; // the file uploaded

  // checking if all the required fields are present or not
  const isRequiredAbsent = [fullName, username, password, email].some(
    (field) => field?.trim() === "" // if at least one field is not entered, it will store true
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
  if (!user) {
    // MongoDB returns a document only if it is created successfully
    throw new ApiError(500, "There was a problem while registering the user!");
  }

  // The user data is going to be sent in to JSON response without the password and the refresh token string
  // Convert Mongoose document to a plain JS object for safer manipulation
  const createdUser = user.toObject();
  delete createdUser.password;
  delete createdUser.refreshTokenString;

  // if the user has been validated and registered successfully, return a success response
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdUser,
        "The user has been registered successfully!"
      )
    );
};

// ----------------------------------------------
// Login Controller (The function to login a registered user)
// ----------------------------------------------

const loginFunction = async (req, res) => {
  // getting data from the client request
  const { username, email, password } = req.body;

  // validating the input data
  if (!username || !email)
    throw new ApiError(400, "username or email is required!"); // at least one out of two is required

  // checking if the input data exists in the database
  const existingUser = await User.findOne({
    $or: [{ username }, { email }], // return true if at least either of them is present
  });

  if (!existingUser) {
    throw new ApiError(
      404,
      "the user isn't registered! Enter correct credentials or sign up."
    );
  }

  // checking if the password entered is correct or not
  const passwordValidator = existingUser.isPasswordCorrect(password); // returns true if the password is correct

  if (!passwordValidator)
    throw new ApiError(400, "The password isn't correct!");

  // if the user exists, we need to generate the access and refresh token
  const { accessToken, refreshToken } = await generateTokens(existingUser._id);

  // fetching the user details without any sensitive information
  const loggedInUser = await User.findById(existingUser._id).select(
    "-password -refreshToken"
  );

  // once the user has successfully logged in, we need to send in the cookies to the client

  const options = {
    httpOnly: true, // cookie can't be manipulated by the client
    secure: true, // cookie is only sent over HTTPS
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, "The user has successfully logged in!"));
};

// ----------------------------------------------
// Error Handling
// ----------------------------------------------
const registerUser = asyncHandler(registerUserFunction);
const loginUser = asyncHandler(loginFunction);

export { registerUser, loginUser };
