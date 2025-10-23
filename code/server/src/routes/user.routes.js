// ----------------------------------------------
// user.routes.js
// This file contains all the routes for users
// ----------------------------------------------

import { Router } from "express"; // importing the router
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const userRouter = Router(); // express router

// ----------------------------------------------
// Defining specific routes
// - Register
// - Log in
// - Log Out
// ----------------------------------------------

userRouter.route("/register").post(
  upload.fields([
    {
      name: "profilePicture",
      maxCount: 1,
    },
  ]),
  registerUser
); // register the user on the register path

userRouter.route("/login").post(loginUser); // login the user on the login path

// secured routes (User should be logged in to access this)

userRouter.route("/logout").post(verifyJWT, logoutUser); // log the user out on this path

export default userRouter; // exporting as default
