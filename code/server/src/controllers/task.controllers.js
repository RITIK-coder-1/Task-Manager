// ----------------------------------------------
// task.controllers.js
// This file contains all the countrollers for task routes
// ----------------------------------------------

import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import Task from "../models/tasks.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import mongoose from "mongoose";

// ----------------------------------------------
// Controller to create a new task
// ----------------------------------------------

const createTaskFunction = async (req, res) => {
  // taking all the input fields from the client request
  const { title, description, priority, isCompleted, category } = req.body;
  const { path: imagePath } = req.file || ""; // the image uploaded
  const ownerId = req.user._id; // the owner of the task

  if (!ownerId) {
    // Only authenticated users can create tasks!
    throw new ApiError(401, "Authentication required to create a task.");
  }

  // only name is the required field, so we need to check if it is empty
  if (title?.trim() === "") {
    throw new ApiError(400, "The title of the task can't be empty!");
  }

  // checking if the priority is limited to the given options only
  const validPriorities = ["Low", "Medium", "High", "Urgent"];

  if (!priority || !validPriorities.includes(priority)) {
    throw new ApiError(
      400,
      `Invalid priority value: "${priority}". Must be one of: ${validPriorities.join(
        ", "
      )}.`
    );
  }

  console.log(req.body);

  // checking if isCompleted a boolean or not

  const booleanIsCompleted = Boolean(isCompleted); // because I'm sending "" for false and "true" for true from the frontend
  if (booleanIsCompleted !== true && booleanIsCompleted !== false) {
    throw new ApiError(400, "Completion should only be a boolean!");
  }

  // The title is compulsory and all the other fields have default values if not customized by the User
  // Once it is validated, we need to save the data in the database

  // uploading the image on cloudinary
  let uploadedImage = "";
  if (imagePath) {
    // Because image is optional, we're uploading it only when it given by the user
    uploadedImage = await uploadOnCloudinary(imagePath);

    if (!uploadedImage) {
      throw new ApiError(500, "The image wasn't uploaded!"); // if cloudinary returns null, the pic wasn't uploaded
    }
  }

  // creating a new task to save the details
  const task = await Task.create({
    title,
    description: description || "",
    priority,
    isCompleted: booleanIsCompleted,
    category: category || "unspecified",
    image: uploadedImage?.url,
    owner: ownerId,
  });

  // last validation if the task has been registered
  if (!task) {
    // MongoDB returns a document only if it is created successfully
    throw new ApiError(500, "There was a problem while creating the task!");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, task, "The task has been successfully created!")
    );
};

// ----------------------------------------------
// Controller to display all the tasks
// ----------------------------------------------

const displayAllTasksFunction = async (req, res) => {
  const userId = req.user._id; // the user id

  if (!userId) {
    // Only authenticated users can read tasks!
    throw new ApiError(401, "Authentication required to retrive task.");
  }

  // fetching details from the database
  const task = await Task.find({ owner: userId }); // only the tasks that are owned by this user

  if (!task) {
    throw new ApiError(404, "The tasks couldn't be fetched!");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, task, "The tasks have been retrieved successfully!")
    );
};

// ----------------------------------------------
// Controller to retrieve a particular task
// ----------------------------------------------

const retrieveTask = async (req, res) => {
  const userId = req.user?._id;
  const taskId = req.body.taskId;

  if (!userId || !taskId) {
    throw new ApiError(400, "Invalid user or task!");
  }

  const task = await Task.findOne({ owner: userId, _id: taskId });

  if (!task) {
    throw new ApiError(404, "The task couldn't be fetched!");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, task, "The task has been retrieved successfully!")
    );
};

// ----------------------------------------------
// Controller to update a task
// ----------------------------------------------

const updateTaskFunction = async (req, res) => {
  // retrieving the data to be updated
  const { title, description, priority, isCompleted, category } = req.body;
  const taskId = req.params?.taskId; // the task id
  const userId = req.user?._id; // the user id
  const existingTask = await Task.findOne({ _id: taskId, owner: userId }); // the current task
  const oldImage = existingTask.image; // the old image to be deleted after the new image is uploaded

  // checking if the task belongs to the user
  if (!existingTask) {
    throw new ApiError(
      403,
      `There was an issue in retriving the task: ${taskId} by this user: ${userId}`
    );
  }

  // checking if all the values are properly entered (only the updated ones!)

  if (title !== undefined) {
    if (title?.trim() === "") {
      throw new ApiError(400, "The title can not be empty!");
    }
  }

  if (priority !== undefined) {
    // checking if the priority is limited to the given options only
    const validPriorities = ["Low", "Medium", "High", "Urgent"];

    if (!priority || !validPriorities.includes(priority)) {
      throw new ApiError(
        400,
        `Invalid priority value: "${priority}". Must be one of: ${validPriorities.join(
          ", "
        )}.`
      );
    }
  }

  if (isCompleted !== undefined) {
    // checking if isCompleted a boolean or not
    if (isCompleted !== true && isCompleted !== false) {
      throw new ApiError(400, "Completion should only be a boolean!");
    }
  }

  // updating the image

  let newImage = oldImage;
  if (req.file !== undefined) {
    const imagePath = req.file.path;
    if (imagePath !== undefined) {
      // update the image only if a new image is sent
      newImage = await uploadOnCloudinary(imagePath);
      if (!newImage) {
        throw new ApiError(500, "The image could not be uploaded!");
      }
    }
  }

  // updating the entire task
  const updatedTask = {};

  // Only add a field if it is present (not undefined).
  if (title !== undefined) updatedTask.title = title;
  if (description !== undefined) updatedTask.description = description || "";
  if (priority !== undefined) updatedTask.priority = priority || "Low";
  if (isCompleted !== undefined) updatedTask.isCompleted = isCompleted || false;
  if (category !== undefined) updatedTask.category = category || "unspecified";

  const task = await Task.findByIdAndUpdate(
    taskId,
    {
      $set: updatedTask,
    },
    {
      new: true,
    }
  );

  // checking if the task is valid
  if (!task) {
    throw new ApiError(400, "The task could not be updated!");
  }

  // deleting the old image from cloudinary
  try {
    await deleteFromCloudinary(oldImage); // Utility function runs and handles error internally
  } catch (error) {
    console.error("Non-critical cleanup failure:", error);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, task, "The task has been successfully updated!")
    );
};

// ----------------------------------------------
// Controller to delete a new task
// ----------------------------------------------

const deleteTaskFunction = async (req, res) => {
  const userId = req.user?._id; // the user id
  const taskId = req.params?.taskId; // the task id

  // checking if both the ids are correct
  if (!userId) {
    throw new ApiError(400, "Invalid user!");
  }
  if (!taskId) {
    throw new ApiError(400, "Invalid Task!");
  }

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new ApiError(400, "Invalid task id format!");
  }

  // finding the task and deleting it
  const task = await Task.findOneAndDelete({ _id: taskId, owner: userId });
  if (!task) {
    console.log(task);

    throw new ApiError(
      404,
      `The particular task: ${taskId} by the user: ${userId} doesn't exist!`
    );
  }
  const image = task.image; // the deleted document is returned

  // once the task is deleted, we need to delete any associated image on cloudinary too
  // using 'image' to check if a URL exists
  if (image && image.trim() !== "") {
    try {
      await deleteFromCloudinary(image);
    } catch (error) {
      console.error("Non-critical cleanup failure:", error);
    }
  }

  return res
    .status(200)
    .json(200, null, "The task has been successfully deleted!");
};

// ----------------------------------------------
// Error Handling
// ----------------------------------------------
const createTask = asyncHandler(createTaskFunction);
const displayAllTasks = asyncHandler(displayAllTasksFunction);
const updateTask = asyncHandler(updateTaskFunction);
const deleteTask = asyncHandler(deleteTaskFunction);

export { createTask, displayAllTasks, updateTask, deleteTask };
