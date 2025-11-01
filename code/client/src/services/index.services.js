/* ---------------------------------------------------------------------------
index.service.js
This script exports all the user and task related API calls from a single place
------------------------------------------------------------------------------ */

// user API calls
import { registerUser } from "./userService";
import { loginUser } from "./userService";
import { logoutUser } from "./userService";
import { getUser } from "./userService";
import { updateUser } from "./userService";
import { updatePassword } from "./userService";
import { updatePic } from "./userService";

// task API calls
import { createTask } from "./taskService";
import { displayAllTasks } from "./taskService";
import { updateTask } from "./taskService";
import { deleteTask } from "./taskService";

export {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  updatePassword,
  updatePic,
  createTask,
  displayAllTasks,
  updateTask,
  deleteTask,
};
