import { useScrollTrigger } from "@mui/material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import FetchApi from "../../client.js";
import { config } from "../../config/config.js";

const initialState = {
  resumeData: [],
};

export const getResume = createAsyncThunk("resume/getResume", async ({ userId, token }, thunkAPI) => {
  try {
    return await FetchApi.fetch(`${config.api}/api/resume/getResume/${userId}`, {
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

export const updateResume = createAsyncThunk(
  "resume/updateResume",
  async ({ userId, formData, token }, thunkAPI) => {
    try {
      return await FetchApi.fetch(`${config.api}/api/resume/updateResume/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getResume.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);
      state.resumeData = action.payload;
    });

    builder.addCase(updateResume.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);
      state.resumeData = action.payload;
    });
  },
});

export const selectResume = (state) => state.resume.resumeData;

export default resumeSlice.reducer;
