/* ---------------------------------------------------------------------------
task.features.js
This is the slice for all the task related global state management
------------------------------------------------------------------------------ */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTask,
  getTask,
  updateTask,
  deleteTask,
} from "../services/index.services.js";

/* ---------------------------------------------------------------------------
Function to create a task
------------------------------------------------------------------------------ */

const create = createAsyncThunk(
  "tasks/create",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await createTask(taskData);
      return response; // the data sent by the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* ---------------------------------------------------------------------------
Function to update a task
------------------------------------------------------------------------------ */

const update = createAsyncThunk(
  "tasks/update",
  async (taskData, { rejectWithValue }) => {
    try {
      const { id: taskId, ...formData } = taskData;
      const response = await updateTask(taskId, formData);
      return response; // the data sent by the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [], // holding the data
    status: "idle", // "idle", "pending", "succeeded", "rejected"
    error: null, // the error message
  },
  extraReducers: (builder) => {
    /* ---------------------------------------------------------------------------
      All the cases for creating a task
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(create.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(create.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.tasks.push(action.payload);
    });

    // the failure case
    builder.addCase(create.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    /* ---------------------------------------------------------------------------
      All the cases for updating a task
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(update.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(update.fulfilled, (state, action) => {
      state.status = "succeeded";
      // override the task

      // -- TO BE DONE
    });

    // the failure case
    builder.addCase(update.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export { create, update };

export default taskSlice.reducer;
