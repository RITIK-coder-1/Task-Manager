import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchData = createAsyncThunk(
  "test/fetchData",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      console.log("The data: ", response);
      return response.data;
    } catch (error) {
      console.error("The error: ", error);
      return rejectWithValue(error.message);
    }
  }
);

const testSlice = createSlice({
  name: "test",
  initialState: {
    value: 0,
    data: [], // Will hold the fetched data
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // A. The Request is PENDING (Loading)
    builder.addCase(fetchData.pending, (state) => {
      state.status = "loading";
      state.error = null; // Clear previous errors
    });

    // B. The Request is FULFILLED (Success)
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = "succeeded";
      // The payload (action.payload) is the 'data' returned from the thunk function
      state.data = action.payload;
    });

    // C. The Request is REJECTED (Failure)
    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = "failed";
      // The payload (action.payload) is what was returned by rejectWithValue
      state.error = action.payload || "An unknown error occurred.";
      state.data = []; // Clear data on failure
    });
  },
});

export const {} = testSlice.actions;

export { fetchData };

// expore the reducer to configure store
export default testSlice.reducer;
