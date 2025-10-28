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

/* ---------------------------------------------------------------------------
Function to remove a task
------------------------------------------------------------------------------ */

const remove = createAsyncThunk(
  "tasks/remove",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await deleteTask(taskId);
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
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );

      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    });

    // the failure case
    builder.addCase(update.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    /* ---------------------------------------------------------------------------
      All the cases for removing a task
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(remove.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(remove.fulfilled, (state, action) => {
      state.status = "succeeded";
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      state.tasks.splice(index, 1);
    });

    // the failure case
    builder.addCase(remove.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export { create, update, remove };

export default taskSlice.reducer;
