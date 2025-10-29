import { configureStore } from "@reduxjs/toolkit";
import { taskReducer, userReducer } from "../features/index.features.js";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    users: userReducer,
  },
});
