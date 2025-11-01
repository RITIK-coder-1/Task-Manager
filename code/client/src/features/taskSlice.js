/* ---------------------------------------------------------------------------
taskSlice.js
This is the slice for all the task related global state management
------------------------------------------------------------------------------ */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTask,
  displayAllTasks,
  updateTask,
  deleteTask,
  getTask,
} from "../services/index.services.js";

/* ---------------------------------------------------------------------------
Function to create a task
------------------------------------------------------------------------------ */

const create = createAsyncThunk(
  "tasks/create",
  async ({ userId, taskData }, { rejectWithValue }) => {
    try {
      const response = await createTask(userId, taskData);
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
  async ({ userId, taskId, taskData }, { rejectWithValue }) => {
    try {
      const response = await updateTask(userId, taskId, taskData);
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
  async ({ userId, taskId }, { rejectWithValue }) => {
    try {
      const response = await getTask(userId, taskId);
      return response;
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
  async ({ userId, taskId }, { rejectWithValue }) => {
    try {
      const response = await deleteTask(userId, taskId);
      return response; // the data sent by the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* ---------------------------------------------------------------------------
Function to display all the tasks
------------------------------------------------------------------------------ */

const displayAll = createAsyncThunk(
  "tasks/displayAll",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await displayAllTasks(userId);
      return response; // the data sent by the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* ---------------------------------------------------------------------------
This is a custom error message for better user experience (Purely for UX)
------------------------------------------------------------------------------ */

const uxErrorMessage = (str) => {
  if (str.includes("timeout") && str.includes("exceeded")) {
    const customMessage = str.replace("t", "T");
    return `${customMessage}. Please try again!`;
  } else {
    return str; // if there is no timeout error, return the entire payload message
  }
};

/* ---------------------------------------------------------------------------
SLICE
------------------------------------------------------------------------------ */

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
      state.error = uxErrorMessage(action.payload);
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
      state.error = uxErrorMessage(action.payload);
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
      state.error = uxErrorMessage(action.payload);
    });

    /* ---------------------------------------------------------------------------
      All the cases for displaying all the tasks
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(displayAll.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(displayAll.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.tasks = action.payload;
    });

    // the failure case
    builder.addCase(displayAll.rejected, (state, action) => {
      state.status = "failed";
      state.error = uxErrorMessage(action.payload);
    });

    /* ---------------------------------------------------------------------------
      All the cases for getting a specific task
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(get.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(get.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.tasks = action.payload;
    });

    // the failure case
    builder.addCase(get.rejected, (state, action) => {
      state.status = "failed";
      state.error = uxErrorMessage(action.payload);
    });
  },
});

export { create, update, remove, displayAll, get };

export default taskSlice.reducer;
