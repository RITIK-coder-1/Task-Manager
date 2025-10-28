/* ---------------------------------------------------------------------------
userSlice.js
This is the slice for all the user related global state management
------------------------------------------------------------------------------ */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logoutUser,
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
The function to login a user
------------------------------------------------------------------------------ */

const login = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUser(userData);
      return response; // the response sent by the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* ---------------------------------------------------------------------------
The function to logout a user
------------------------------------------------------------------------------ */

const logout = createAsyncThunk(
  "users/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutUser();
      return response; // the response sent by the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* ---------------------------------------------------------------------------
The function to fetch a user
------------------------------------------------------------------------------ */

const get = createAsyncThunk("users/get", async (_, { rejectWithValue }) => {
  try {
    const response = await updateUser();
    return response; // the response sent by the backend
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

/* ---------------------------------------------------------------------------
The function to update a user
------------------------------------------------------------------------------ */

const userUpdate = createAsyncThunk(
  "users/userUpdate",
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await getUser(updatedData);
      return response; // the response sent by the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* ---------------------------------------------------------------------------
The function to update the password
------------------------------------------------------------------------------ */

const passwordUpdate = createAsyncThunk(
  "users/passwordUpdate",
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await updatePassword(updatedData);
      return response; // the response sent by the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* ---------------------------------------------------------------------------
The function to update the profile pic
------------------------------------------------------------------------------ */

const profileUpdate = createAsyncThunk(
  "users/profileUpdate",
  async (profileFormData, { rejectWithValue }) => {
    try {
      const response = await updatePic(profileFormData);
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
    user: null, // will hold the fetched data
    token: null, // will hold the access token
    status: "idle", // idle, pending, succeeded, failed
    error: null, // will hold any error message
  },
  extraReducers: (builder) => {
    /* ---------------------------------------------------------------------------
       All the cases for registering a user
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(register.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(register.fulfilled, (state, action) => {
      const user = action.payload.user;
      const token = action.payload.accessToken; // the access token generated by the Server
      state.status = "succeeded";
      state.user = user;
      state.token = token;
      localStorage.setItem("accessToken", token); // saving the access token for authentication
    });

    // the failure case
    builder.addCase(register.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || "An unknown error occured";
      state.user = null; // clear data on failure
      state.token = null;
    });

    /* ---------------------------------------------------------------------------
       All the cases for logging in a user
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(login.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(login.fulfilled, (state, action) => {
      const user = action.payload.user;
      const token = action.payload.accessToken; // the access token generated by the Server
      state.status = "succeeded";
      state.user = user;
      state.token = token;
      localStorage.setItem("accessToken", token); // saving the access token for authentication
    });

    // the failure case
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.user = null; // clear data on failure
    });

    /* ---------------------------------------------------------------------------
       All the cases for logging out a user
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(logout.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(logout.fulfilled, (state) => {
      state.status = "succeeded";
      state.user = null;
      state.token = null;
      localStorage.removeItem("accessToken"); // removing the access token for credentials
    });

    // the failure case
    builder.addCase(logout.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.user = null; // clear data on failure
      localStorage.removeItem("accessToken"); // if the server fails to log out, we need to clean the token locally
    });

    /* ---------------------------------------------------------------------------
       All the cases for getting a user
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(get.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(get.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    });

    // the failure case
    builder.addCase(get.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.user = null; // clear data on failure
    });

    /* ---------------------------------------------------------------------------
       All the cases for updating a user
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(userUpdate.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(userUpdate.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    });

    // the failure case
    builder.addCase(userUpdate.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.user = null; // clear data on failure
    });

    /* ---------------------------------------------------------------------------
       All the cases for updating the password
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(passwordUpdate.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(passwordUpdate.fulfilled, (state, action) => {
      state.status = "succeeded";
    });

    // the failure case
    builder.addCase(passwordUpdate.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.user = null; // clear data on failure
    });

    /* ---------------------------------------------------------------------------
       All the cases for updating the profile pic
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(profileUpdate.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(profileUpdate.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    });

    // the failure case
    builder.addCase(profileUpdate.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export {
  register,
  login,
  logout,
  get,
  userUpdate,
  passwordUpdate,
  profileUpdate,
};

export default userSlice.reducer;
