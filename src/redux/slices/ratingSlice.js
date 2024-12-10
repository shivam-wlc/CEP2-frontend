import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FetchApi from "../../client.js";
import { config } from "../../config/config.js";

const initialState = {
  rating: null,
};

export const getRatingStatus = createAsyncThunk(
  "rating/getRatingStatus",
  async ({ videoId, userId, token }) => {
    return FetchApi.fetch(`${config.api}/api/rating/getratingstatus/${videoId}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
);

export const rateVideo = createAsyncThunk("rating/rateVideo", async ({ videoId, userId, token, rating }) => {
  return FetchApi.fetch(`${config.api}/api/rating/ratevideo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ videoId, userId, rating }),
  });
});

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRatingStatus.fulfilled, (state, action) => {
      state.rating = action.payload;
    });
    builder.addCase(rateVideo.fulfilled, (state, action) => {
      state.rating = action.payload;
    });
  },
});

export default ratingSlice.reducer;
export const selectRating = (state) => state.rating.rating;
