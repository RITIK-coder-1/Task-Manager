// ----------------------------------------------
// user.routes.js
// This file contains all the routes for users
// ----------------------------------------------

import { Router } from "express"; // importing the router
import upload from "../middlewares/multer.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateAccount,
  updatePassword,
  updateFile,
  newAccessToken,
  getCurrentUser,
} from "../controllers/user.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const userRouter = Router(); // express router

// ----------------------------------------------
// Defining specific routes
// - Register
// - Log in
// - Log Out
// - Getting the current user
// - New Access Token
// - Update Details
// - Update Password
// - Update Profile
// ----------------------------------------------

userRouter.route("/register").post(upload.single("profilePic"), registerUser); // register the user on the register path

userRouter.route("/login").post(loginUser); // login the user on the login path

// secured routes (User should be logged in to access these)

userRouter.route("/logout").post(verifyJWT, logoutUser); // log the user out on this path

userRouter.route("/me").get(verifyJWT, getCurrentUser); // getting the current user

userRouter.route("/:userId/token/refresh").post(verifyJWT, newAccessToken); // to issue a new access token end point

userRouter.route("/:userId/details").patch(verifyJWT, updateAccount); // to update the user details

userRouter.route("/:userId/password").patch(verifyJWT, updatePassword); // to update the password

userRouter
  .route("/:userId/profile")
  .patch(verifyJWT, upload.single("profilePic"), updateFile); // to update the profie image

export default userRouter; // exporting as default
