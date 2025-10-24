// ----------------------------------------------
// task.controllers.js
// This file contains all the countrollers for task routes
// ----------------------------------------------

import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiError.js";
import Task from "../models/tasks.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

// ----------------------------------------------
// Controller to create a new task
// ----------------------------------------------

const createTaskFunction = async (req, res) => {
  // taking all the input fields from the client request
  const { title, description, priority, isCompleted, dueDate, category } =
    req.body;
  const { imagePath } = req.files; // the image uploaded

  // only name is the required field, so we need to check if it is empty
  if (title === "") {
    throw new ApiError(400, "The title of the task can't be empty!");
  }

  // The title is compulsory and all the other fields have default values if not customized by the User
  // Once it is validated, we need to save the data in the database

  // uploading the image on cloudinary
  let uploadedImage = "";
  if (imagePath) {
    // Because image is optional, we're uploading it only when it given by the user
    uploadedImage = await uploadOnCloudinary(imagePath);

    if (!uploadedImage) {
      throw new ApiError(400, "The image wasn't uploaded!"); // if cloudinary returns null, the pic wasn't uploaded
    }
  }

  // creating a new task to save the details
  const task = await Task.create({
    title,
    description,
    priority,
    isCompleted,
    dueDate,
    category,
    image: uploadedImage?.url,
  });

  // last validation if the task has been registered
  if (!task) {
    // MongoDB returns a document only if it is created successfully
    throw new ApiError(500, "There was a problem while creating the task!");
  }

  return res
    .response(201)
    .json(
      new ApiResponse(201, task, "The task has been successfully created!")
    );
};

// ----------------------------------------------
// Controller to retrive a task
// ----------------------------------------------

const retrieveTaskFunction = async (req, res) => {};

// ----------------------------------------------
// Controller to update a task
// ----------------------------------------------

const updateTaskFunction = async (req, res) => {};

// ----------------------------------------------
// Controller to delete a new task
// ----------------------------------------------

const deleteTaskFunction = async (req, res) => {};

// ----------------------------------------------
// Error Handling
// ----------------------------------------------
const createTask = asyncHandler(createTaskFunction);
const retrieveTask = asyncHandler(retrieveTaskFunction);
const updateTask = asyncHandler(updateTaskFunction);
const deleteTask = asyncHandler(deleteTaskFunction);

export { createTask, retrieveTask, updateTask, deleteTask };
