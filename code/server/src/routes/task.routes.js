// ----------------------------------------------
// task.routes.js
// This file contains all the routes for tasks
// ----------------------------------------------

import { Router } from "express";
import {
  createTask,
  retrieveTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controllers.js";
import verifyJwt from "../middlewares/auth.middleware.js";

const taskRouter = Router();

// ----------------------------------------------
// Defining specific routes
// - Create
// - Read
// - Update
// - Delete
// ----------------------------------------------

taskRouter.route("/create").post(verifyJwt, createTask); // route to create new tasks

export default taskRouter;
