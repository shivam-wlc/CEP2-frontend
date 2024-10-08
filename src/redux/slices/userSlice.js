import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import FetchApi from "../../client.js";
import { config } from "../../config/config.js";

const initialState = {
  history: [],
  myLikes: [],
  playlist: [],
};

export const addHistory = createAsyncThunk(
  "user/addHistory",
  async ({ userId, videoId, token }, thunkAPI) => {
    try {
      return await FetchApi.fetch(`${config.api}/api/user/history/${userId}/${videoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const getHistory = createAsyncThunk("user/getHistory", async ({ userId, token }, thunkAPI) => {
  try {
    return await FetchApi.fetch(`${config.api}/api/user/gethistory/${userId}`, {
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

export const getMyLikedVideos = createAsyncThunk(
  "user/getMyLikedVideos",
  async ({ userId, page, token }, thunkAPI) => {
    try {
      return await FetchApi.fetch(`${config.api}/api/user/getmylikedvideos/${userId}/?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

// Playlist

export const createPlaylist = createAsyncThunk(
  "user/createPlaylist",
  async ({ name, userId, token }, thunkAPI) => {
    try {
      return await FetchApi.fetch(`${config.api}/api/user/createplaylist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, userId }),
      });
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const getUserPlaylists = createAsyncThunk(
  "user/getUserPlaylists",
  async ({ userId, token }, thunkAPI) => {
    try {
      return await FetchApi.fetch(`${config.api}/api/user/getplaylists/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const addVideoToPlaylist = createAsyncThunk(
  "user/addVideoToPlaylist",
  async ({ playlistId, videoId, userId, token }, thunkAPI) => {
    try {
      return await FetchApi.fetch(`${config.api}/api/user/addvideotoplaylist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ playlistId, videoId, userId }),
      });
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const removeVideoFromPlaylist = createAsyncThunk(
  "user/removeVideoFromPlaylist",
  async ({ playlistId, videoId, userId, token }, thunkAPI) => {
    try {
      await FetchApi.fetch(`${config.api}/api/user/removevideofromplaylist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ playlistId, videoId, userId }),
      });
      return { playlistId, videoId };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const deletePlaylist = createAsyncThunk(
  "user/deletePlaylist",
  async ({ playlistId, userId, token }, thunkAPI) => {
    try {
      await FetchApi.fetch(`${config.api}/api/user/deleteplaylist/${userId}/${playlistId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return playlistId;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addHistory.fulfilled, (state, { payload }) => {
      console.log("addHistory", payload);
    });
    builder.addCase(getHistory.fulfilled, (state, { payload }) => {
      console.log("getHistory", payload);
      state.history = payload.history;
    });
    builder.addCase(getMyLikedVideos.fulfilled, (state, { payload }) => {
      state.myLikes = payload;
    });
    builder.addCase(createPlaylist.fulfilled, (state, { payload }) => {
      console.log("createPlaylist", payload);
      // state.playlist = [...state.playlist, payload.playlist];
    });
    builder.addCase(getUserPlaylists.fulfilled, (state, { payload }) => {
      state.playlist = payload.playlists;
    });
    builder.addCase(addVideoToPlaylist.fulfilled, (state, { payload }) => {
      console.log("addVideoToPlaylist", payload);
    });
    builder.addCase(deletePlaylist.fulfilled, (state, { payload }) => {
      state.playlist = state.playlist.filter((p) => p._id != payload);
    });
    builder.addCase(removeVideoFromPlaylist.fulfilled, (state, { payload }) => {
      state.playlist = state.playlist.map((p) => {
        if (p._id === payload.playlistId) {
          p.videos = p.videos.filter((v) => v._id != payload.videoId);
        }
        return p;
      });
    });
  },
});

export const selectHistory = (state) => state.user.history;
export const selectMyLikedVideos = (state) => state.user.myLikes;
export const selectPlaylist = (state) => state.user.playlist;

export default userSlice.reducer;
