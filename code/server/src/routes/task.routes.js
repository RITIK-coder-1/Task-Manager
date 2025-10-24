// ----------------------------------------------
// task.routes.js
// This file contains all the routes for tasks
// ----------------------------------------------

import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
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

taskRouter.route("/create").post(verifyJwt, upload.single("image"), createTask); // route to create new tasks
taskRouter.route("/:taskId").get(verifyJwt, retrieveTask); // route to get a particular task
taskRouter
  .route("/:taskId")
  .patch(verifyJwt, upload.single("image"), updateTask); // route to update a particular task (The patch method automatically adds "/update")
taskRouter.route("/:taskId").delete(verifyJwt, deleteTask); // route to delete a particular task

export default taskRouter;
