/* ---------------------------------------------------------------------------
taskSlice.js
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

/* ---------------------------------------------------------------------------
Function to get a task
------------------------------------------------------------------------------ */

const get = createAsyncThunk(
  "tasks/get",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await getTask(taskId);
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
    tempTask: null, // the current task that the user wishes to view
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
      if (action.payload === "timeout of 5000ms exceeded") {
        state.error = `${action.payload}. Please try again!`; // for UX
      }
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
      if (action.payload === "timeout of 5000ms exceeded") {
        state.error = `${action.payload}. Please try again!`; // for UX
      }
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
      if (action.payload === "timeout of 5000ms exceeded") {
        state.error = `${action.payload}. Please try again!`; // for UX
      }
    });

    /* ---------------------------------------------------------------------------
      All the cases for retrieving a task
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(get.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(get.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.tempTask = action.payload; // the current task that the user wishes to view
    });

    // the failure case
    builder.addCase(get.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      if (action.payload === "timeout of 5000ms exceeded") {
        state.error = `${action.payload}. Please try again!`; // for UX
      }
    });
  },
});

export { create, update, remove };

export default taskSlice.reducer;
