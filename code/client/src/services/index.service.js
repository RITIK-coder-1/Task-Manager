/* ---------------------------------------------------------------------------
index.service.js
This script exports all the user and task related API calls from a single place
------------------------------------------------------------------------------ */

// user API calls
import { registerUser } from "./users.service";
import { loginUser } from "./users.service";
import { logout } from "./users.service";
import { getUser } from "./users.service";
import { updateUser } from "./users.service";
import { updatePassword } from "./users.service";
import { updatePic } from "./users.service";

// task API calls
import { createTask } from "./tasks.service";

export {
  registerUser,
  loginUser,
  logout,
  getUser,
  updateUser,
  updatePassword,
  updatePic,
  createTask,
};
