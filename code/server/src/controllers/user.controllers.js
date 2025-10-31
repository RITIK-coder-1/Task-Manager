// ----------------------------------------------
// user.controllers.js
// This file contains all the countrollers for user routes
// ----------------------------------------------

import ApiError from "../utils/apiError.js";
import User from "../models/users.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateRandomTokenString from "../utils/generateRandomTokenString.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// ----------------------------------------------
// Function to generate access and refresh tokens on logging in and logging out
// ----------------------------------------------

const generateTokens = async (userId) => {
  const randomString = generateRandomTokenString(); // this random set of strings is used with the refresh token to validate the user
  try {
    const user = await User.findByIdAndUpdate(userId, {
      $set: {
        refreshTokenString: randomString, // saving the random string for security purposes
      },
    });
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

  const { fullNameString, username, password, email } = req.body;
  const fullName = JSON.parse(fullNameString); // parsing the full name string into an object

  // checking if all the required fields are present or not
  const isRequiredAbsent = [fullName.firstName, username, password, email].some(
    (field) => field?.trim() === "" // if at least one field is not entered, it will store true
  );

  if (isRequiredAbsent) {
    throw new ApiError(400, "All the fields are required!"); // if at least one field is not entered, throw an error
  }

  // validating the number of charaters for username and password
  if (username.trim().length < 3 || username.trim().length > 30) {
    throw new ApiError(
      400,
      "The username should 3 characters minimum and 30 characters maximum!"
    );
  }
  if (password.trim().length < 10) {
    throw new ApiError(400, "The password should be of 10 characters minimum!");
  }

  // checking if the user already exists
  const ifUserExists = await User.findOne({
    email, // if the email already exists, return true
  });
  if (ifUserExists) {
    throw new ApiError(400, "The user with this email is already registered!"); // if the user is not new, throw an error
  }

  // checking if the username has already been take
  const IsSameUsername = await User.findOne({
    username,
  });
  if (IsSameUsername) {
    throw new ApiError(400, "The username has already been taken!");
  }

  // uploading the profile image
  let profilePicture = "";
  if (req.file) {
    // the profile picture should be uploaded only if it is sent and the req.file is valid
    const { path: profilePicturePath } = req.file;

    profilePicture = await uploadOnCloudinary(profilePicturePath);

    if (!profilePicture) {
      throw new ApiError(
        400,
        "There was an error uploading the profile picture! Please try again!"
      ); // if cloudinary returns null, the profile pic wasn't uploaded
    }
  }

  // once the new user is validated, we save all the details of the user

  // saving the user data in the database
  const user = await User.create({
    fullName,
    username,
    email,
    password,
    profilePic: profilePicture?.url || "", // only if the profile picture is present, else it should be empty
  });

  // last validation if the user has been registered
  if (!user) {
    // MongoDB returns a document only if it is created successfully
    throw new ApiError(500, "There was a problem while registering the user!");
  }

  const { accessToken } = await generateTokens(user._id);

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
        { user: createdUser, accessToken: accessToken },
        "The user has been registered successfully!"
      )
    );
};

// ----------------------------------------------
// Login Controller (The function to login a registered user)
// ----------------------------------------------

const loginFunction = async (req, res) => {
  // getting data from the client request
  const { credential, password } = req.body;

  // validating the input data
  if (credential?.trim() === "" || password?.trim() === "")
    throw new ApiError(
      400,
      "At least one of the identifiers and password are required!"
    ); // at least one out of two is required

  // checking if the input data (username/email and password) exist in the database

  const existingUser = await User.findOne({
    $or: [{ username: credential }, { email: credential }], // return true if at least either of them is present
  });
  const passwordValidator = await existingUser?.isPasswordCorrect(password); // returns true if the password is correct (only if the user exists)

  if (!existingUser || !passwordValidator)
    throw new ApiError(
      401,
      "Invalid credentials. Please check your username/email and password, or sign up!"
    );

  // if the user exists, we need to generate the access and refresh token
  const { accessToken, refreshToken } = await generateTokens(existingUser._id);

  // once the user has successfully logged in, we need to send in the cookies to the client

  // deleting the sensitive field in the JSON resposne
  const loggedInUser = existingUser.toObject(); // Convert to JS object
  delete loggedInUser.password;
  delete loggedInUser.refreshTokenString;

  const options = {
    httpOnly: true, // cookie can't be manipulated by the client
    secure: true, // cookie is only sent over HTTPS
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "The user has successfully logged in!"
      )
    );
};

// ----------------------------------------------
// Logout Controller (The function to logout a registered user)
// ----------------------------------------------

const logoutFunction = async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(400, "Invalid user id!");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        refreshTokenString: null, // the refresh token should be changed to undefined once the user logs out
      },
    },
    {
      new: true, // it returns the updated document
    }
  );

  // cookie security options
  const options = {
    httpOnly: true,
    secure: true,
  };

  // clearing the cookies and the tokens once the user is logged out successfully
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out Succesfully!"));
};

// ----------------------------------------------
// New Access Token Controller (The function to generate a new access token using the refresh token)
// ----------------------------------------------

const newAccessTokenFunction = async (req, res) => {
  try {
    // Getting our refresh token from the cookies or request body alternatively
    const incomingRefreshToken =
      req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized Request"); // throw an error if the refresh token is unauthorized
    }

    // once we have the refresh token, we decode it to get the user id
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // we get the user with a query
    const user = await User.findById(decodedToken?.id);

    if (!user) {
      throw new ApiError(403, "Invalid user in the token payload"); // throw an error if the user is not present
    }

    // double checking if the incoming refresh token matches the one stored in the database
    if (decodedToken.uniqueToken !== user?.refreshTokenString) {
      throw new ApiError(403, "Refresh Token is expired or used");
    }

    // the cookie options
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    };

    // getting the new access and the refresh tokens
    const { newAccessToken, newRefreshToken } = await generateTokens(user._id);

    // updating the cookies and sending a JSON API response
    res
      .status(200)
      .cookie("accessToken", newAccessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken: newAccessToken, refreshToken: newRefreshToken },
          "Access Token Refreshed!"
        )
      );
  } catch (error) {
    // JWT errors (like signature mismatch or simple expiration)
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res
        .status(403)
        .json(
          new ApiError(403, "Forbidden: Invalid or Expired JWT Signature.")
        );
    }

    // Final fallback for other unexpected errors
    console.error("Token Refresh Error:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error during token refresh."));
  }
};

// ----------------------------------------------
// Function to fetch the user details
// ----------------------------------------------

const getUserFunction = async (req, res) => {
  // only the logged in user can view this
  const userId = req.user?._id;
  const user = await User.findById(userId);
  const refreshTokenString = user.refreshTokenString;
  if (!refreshTokenString) {
    throw new ApiError(400, "You're unauthorized to view this!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current User Fetched Successfully!"));
};

// ----------------------------------------------
// Function to update the user account
// ----------------------------------------------

const updateAccountFunction = async (req, res) => {
  // getting the data to update
  const { fullName, username, email } = req.body; // once a field is updated, all the fields should be submited as they are
  const userId = req.user?._id; // the user id

  // validating the data to be updated
  const isEmpty = [username, email].some(
    (field) => field?.trim() === "" // return true if at least one of the fields is empty
  );

  // only if the fullname is modified
  if (fullName !== undefined) {
    if (!fullName.firstName?.trim()) {
      // the first name has to be entered
      throw new ApiError(400, "The first name can not be empty!");
    }
  }

  if (isEmpty) {
    throw new ApiError(400, "All Fields Are Required!");
  }

  // The user may have entered a new username or email that is already acquired by some other user

  const existingEmail = await User.findOne({
    email: email,
    _id: { $ne: userId }, // find excluding the current user
  });

  if (existingEmail) {
    throw new ApiError(409, "The entered email is already present!"); // if the updated email is already present
  }

  const existingUsername = await User.findOne({
    username: username,
    _id: { $ne: userId }, // find excluding the current user
  });

  if (existingUsername) {
    throw new ApiError(409, "The entered username is already present!"); // if the updated username is already present
  }

  if (username.trim().length < 3) {
    throw new ApiError(400, "The username should be of 3 characters minimum");
  }

  // finding the user and updating its values

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        // it overrides the previous values
        fullName: fullName,
        username: username,
        email: email,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshTokenString"); // excluding sensitive information

  // checking if the user is valid
  if (!user) {
    throw new ApiError(400, "User could not be updated");
  }

  // sending an API response for the successful update
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account has been updated successfully"));
};

// ----------------------------------------------
// Function to update the password
// ----------------------------------------------

const updatePasswordFunction = async (req, res) => {
  // getting the new and old passwords
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword.trim() || !newPassword.trim()) {
    throw new ApiError(400, "Please enter both the password fields properly!");
  }

  // getting the user and checking if the entered password is correct or not
  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid Old Password");
  }

  // checking if the password is of at least 10 characters
  if (newPassword.trim().length < 10) {
    throw new ApiError(
      400,
      "The password should at least be of 10 characters!"
    );
  }

  // checking if both the passwords are the same
  if (newPassword.trim() === oldPassword.trim()) {
    throw new ApiError(400, "The new and old passwords should be different!");
  }

  // Although the password is always hashed before being saved as per the function defined in the user model, a bug can potentially revoke that. So, it is safe to directly hash the password here
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(newPassword, 10); // hash the passoword with 10 salt rounds
    console.log("New Password successfully hashed before saving.");
  } catch (error) {
    // If hashing fails
    throw new ApiError(500, "Server Error: Password processing failed.");
  }

  // updating the password
  await User.findByIdAndUpdate(user?.id, {
    $set: { password: hashedPassword, uniqueToken: null },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { passwordResetRequired: true },
        "Password Changed Successfully!"
      )
    );
};

// ----------------------------------------------
// Function to update the file (Profile Image)
// ----------------------------------------------

const updateFileFunction = async (req, res) => {
  const user = await User.findById(req.user?._id);
  const oldProfile = user.profilePic;

  // getting the path of the file
  const picPath = req.file?.path; // we're uploading a single file

  // validating the path
  if (!picPath) {
    throw new ApiError(400, "Avatar File is missing");
  }

  // uploading the file on cloudinary
  const newProfilePic = await uploadOnCloudinary(picPath);

  // validating the cloudinary url
  if (!newProfilePic.url) {
    throw new ApiError(400, "Could not upload the new avatar file");
  }

  // updating the user file on database
  const foundUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        profilePic: newProfilePic.url,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  if (!foundUser) {
    throw new ApiError("The data couldn't be updated!");
  }

  // deleting the old file from cloudinary
  try {
    await deleteFromCloudinary(oldProfile); // Utility function runs and handles error internally
  } catch (error) {
    console.error("Non-critical cleanup failure:", error);
  }

  // sending a JSON API response
  res
    .send(200)
    .json(new ApiResponse(200, foundUser, "The file has been updated!"));
};

// ----------------------------------------------
// Error Handling
// ----------------------------------------------
const registerUser = asyncHandler(registerUserFunction);
const loginUser = asyncHandler(loginFunction);
const logoutUser = asyncHandler(logoutFunction);
const newAccessToken = asyncHandler(newAccessTokenFunction);
const getCurrentUser = asyncHandler(getUserFunction);
const updateAccount = asyncHandler(updateAccountFunction);
const updatePassword = asyncHandler(updatePasswordFunction);
const updateFile = asyncHandler(updateFileFunction);

export {
  registerUser,
  loginUser,
  logoutUser,
  newAccessToken,
  getCurrentUser,
  updateAccount,
  updatePassword,
  updateFile,
};
