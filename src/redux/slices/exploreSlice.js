import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import FetchApi from "../../client.js";
import { config } from "../../config/config.js";

const initialState = {
  allVideos: [],
};

export const getAllVideos = createAsyncThunk("explore/getAllVideos", async ({ page }) => {
  try {
    return await FetchApi.fetch(`${config.api}/api/explore/getallvideos?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllVideos.fulfilled, (state, { payload }) => {
      state.allVideos = payload;
    });
  },
});

export const selectAllVideos = (state) => state.explore.allVideos;
export default exploreSlice.reducer;
