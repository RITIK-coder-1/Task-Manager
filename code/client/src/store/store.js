import { configureStore } from "@reduxjs/toolkit";
import testReducer from "../features/testSlice.js";

export const store = configureStore({
  reducer: {
    test: testReducer,
  },
});
