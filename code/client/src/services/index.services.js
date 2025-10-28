/* ---------------------------------------------------------------------------
index.service.js
This script exports all the user and task related API calls from a single place
------------------------------------------------------------------------------ */

// user API calls
import { registerUser } from "./users.services";
import { loginUser } from "./users.services";
import { logout } from "./users.services";
import { getUser } from "./users.services";
import { updateUser } from "./users.services";
import { updatePassword } from "./users.services";
import { updatePic } from "./users.services";

// task API calls
import { createTask } from "./tasks.services";
import { getTask } from "./tasks.services";
import { updateTask } from "./tasks.services";
import { deleteTask } from "./tasks.services";

export {
  registerUser,
  loginUser,
  logout,
  getUser,
  updateUser,
  updatePassword,
  updatePic,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
