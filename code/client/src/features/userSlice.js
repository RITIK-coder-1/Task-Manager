/* ---------------------------------------------------------------------------
user.features.js
This is the slice for all the user related global state management
------------------------------------------------------------------------------ */

import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logout,
  getUser,
  updateUser,
  updatePassword,
  updatePic,
} from "../services/index.services.js";

export default userSlice.reducer;
