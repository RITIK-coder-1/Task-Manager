// ----------------------------------------------
// tasks.model.js
// This file defines the entire schema for storing the task's data created by a user
// ----------------------------------------------

import mongoose from "mongoose"; // importing mongoose

// ----------------------------------------------
// Creating the task schema and defining its fields
// ----------------------------------------------

const taskSchema = new mongoose.Schema(
  {
    // the name of the task
    title: {
      type: String,
      required: true,
      unique: false,
      maxlength: [30, "The maximum length of the characters reached."],
      trim: true, // removing the whitespaces for faster queries
    },

    // description of the task
    description: {
      type: String,
      default: "",
      required: false, // description is not required for low priority tasks.
      trim: true,
    },

    // completion
    isCompleted: {
      type: Boolean,
      default: false,
    },

    // How important this task is
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Low",
    },

    // Scheduling to organize tasks chronologically
    dueDate: {
      type: Date,
      required: false,
    },

    // the type of task
    category: {
      type: String,
      required: false,
    },

    // the users can add images to the tasks (optional)
    image: {
      type: String,
      required: false,
    },

    // the owner of the task
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // links to the user schema
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

// ----------------------------------------------
// Creating the Task model based on "taskSchema"
// ----------------------------------------------

const Task = new mongoose.model("Task", taskSchema);

export default Task; // exporting the model as default
