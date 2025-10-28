import { configureStore } from "@reduxjs/toolkit";
import { taskReducer, userReducer } from "../features/index.features.js";

export const store = configureStore({
  reducer: {
    task: taskReducer,
    user: userReducer,
  },
});
