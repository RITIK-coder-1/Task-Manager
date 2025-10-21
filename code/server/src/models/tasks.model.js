// ----------------------------------------------
// tasks.model.js
// This file defines the entire schema for storing the tasks' data created by a user
// ----------------------------------------------

import mongoose from "mongoose"; // importing mongoose

// ----------------------------------------------
// Creating the task schema and defining its fields
// ----------------------------------------------

const taskSchema = new mongoose.Schema(
  {
    // the name of the task
    name: {
      type: String,
      required: true,
      unique: false,
      maxlength: [30, "The maximum length of the characters reached."],
    },

    // description of the task
    description: {
      type: String,
      required: true,
    },

    // completion
    complete: {
      type: Boolean,
      required: true, // either yes or no
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

export default User; // exporting the model as default
