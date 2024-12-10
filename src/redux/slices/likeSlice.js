import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FetchApi from "../../client.js";
import { config } from "../../config/config.js";

const initialState = {
  userLiked: null,
  totalShares: null,
  totalViews: null,
};

export const getLikeStatus = createAsyncThunk("like/getLikeStatus", async ({ videoId, userId, token }) => {
  return FetchApi.fetch(`${config.api}/api/like/getlikestatus/${videoId}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
});

export const toggleLike = createAsyncThunk("like/toggleLike", async ({ videoId, userId, token }) => {
  return FetchApi.fetch(`${config.api}/api/like/togglelikevideo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ videoId, userId }),
  });
});

export const increaseViewsCount = createAsyncThunk("like/increaseViewsCount", async ({ videoId, userId }) => {
  return FetchApi.fetch(`${config.api}/api/viewsAndShares/increaseviewscount/${videoId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
});

export const increaseSharesCount = createAsyncThunk(
  "like/increaseSharesCount",
  async ({ videoId, userId }) => {
    return FetchApi.fetch(`${config.api}/api/viewsAndShares/increasesharescount/${videoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
  },
);

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLikeStatus.fulfilled, (state, { payload }) => {
      state.userLiked = payload.userLiked;
    });
    builder.addCase(toggleLike.fulfilled, (state, { payload }) => {
      state.userLiked = payload.userLiked;
    });
    builder.addCase(increaseViewsCount.fulfilled, (state, { payload }) => {
      state.totalViews = payload.updatedValue;
    });
    builder.addCase(increaseSharesCount.fulfilled, (state, { payload }) => {
      state.totalShares = payload.updatedValue;
    });
  },
});

export default likeSlice.reducer;
export const selectUserLiked = (state) => state.like.userLiked;
