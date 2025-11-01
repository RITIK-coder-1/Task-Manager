/* ---------------------------------------------------------------------------
index.pages.js
This file exports all the app pages from a single place
------------------------------------------------------------------------------ */

import Register from "./auth/Register";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Profile from "./users/Profile";
import UpdateDetails from "./users/UpdateDetails";
import UpdatePassword from "./users/UpdatePassword";
import UpdatePic from "./users/UpdatePic";

export {
  Register,
  Login,
  Logout,
  Profile,
  UpdateDetails,
  UpdatePassword,
  UpdatePic,
};
