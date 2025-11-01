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
import Dashboard from "./users/Dashboard";
import TaskDetails from "./tasks/TaskDetails";

export {
  Register,
  Login,
  Logout,
  Profile,
  UpdateDetails,
  UpdatePassword,
  UpdatePic,
  Dashboard,
  TaskDetails,
};
