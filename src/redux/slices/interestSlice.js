import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FetchApi from "../../client.js";
import { config } from "../../config/config.js";

const initialState = {
  interestsProfile: [],
};

export const getInterests = createAsyncThunk("interest/getInterests", async ({ userId, token }, thunkAPI) => {
  try {
    return FetchApi.fetch(`${config.api}/api/interest/getinterestprofile/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

const interestSlice = createSlice({
  name: "interest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInterests.fulfilled, (state, action) => {
      state.interestsProfile = action.payload;
    });
  },
});

export const selectInterests = (state) => state.interest.interestsProfile;

export default interestSlice.reducer;
