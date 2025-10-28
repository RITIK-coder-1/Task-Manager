/* ---------------------------------------------------------------------------
user.features.js
This is the slice for all the user related global state management
------------------------------------------------------------------------------ */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logout,
  getUser,
  updateUser,
  updatePassword,
  updatePic,
} from "../services/index.services.js";

/* ---------------------------------------------------------------------------
The function to register a user
------------------------------------------------------------------------------ */

const register = createAsyncThunk(
  "users/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response; // the response sent by the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* ---------------------------------------------------------------------------
The Slice
------------------------------------------------------------------------------ */

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: null, // will hold the fetched data
    status: "idle", // idle, pending, succeeded, failed
    error: null, // will hold any error message
  },
  extraReducers: (builder) => {
    /* ---------------------------------------------------------------------------
       All the cases for registering a user
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(register.pending, (state) => {
      (state.status = "pending"), (state.error = null); // clear previous errors
    });

    // the success case
    builder.addCase(register.fulfilled, (state, action) => {
      (state.status = "succeeded"), (state.data = action.payload);
    });

    // the failure case
    builder.addCase(register.rejected, (state, action) => {
      (state.status = "failed"),
        (state.error = action.payload || "An unknown error occured"),
        (state.data = null); // clear data on failure
    });
  },
});

export { register };

export default userSlice.reducer;
