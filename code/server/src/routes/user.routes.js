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
// - New Access Token
// - Update Details
// - Update Password
// - Update Profile
// - Getting the current user
// ----------------------------------------------

userRouter.route("/register").post(upload.single("profilePic"), registerUser); // register the user on the register path

userRouter.route("/login").post(loginUser); // login the user on the login path

// secured routes (User should be logged in to access these)

userRouter.route("/logout").post(verifyJWT, logoutUser); // log the user out on this path

userRouter.route("/token/refresh").post(newAccessToken); // to issue a new access token end point

userRouter.route("/details").patch(verifyJWT, updateAccount); // to update the user details

userRouter.route("/password").patch(verifyJWT, updatePassword); // to update the password

userRouter
  .route("/profile")
  .patch(verifyJWT, upload.single("profilePic"), updateFile); // to update the profie image

userRouter.route("/:userId").get(verifyJWT, getCurrentUser); // getting the current user

export default userRouter; // exporting as default
