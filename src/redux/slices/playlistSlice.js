import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FetchApi from "../../client.js";
import { config } from "../../config/config.js";

const initialState = {
  AllPlaylistName: [],
  playListData: [],
};

export const getUserPlaylist = createAsyncThunk("playlist/getUserPlaylist", async ({ userId, token }) => {
  return FetchApi.fetch(`${config.api}/api/playlist/getuserplaylist/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
});

export const createPlaylist = createAsyncThunk(
  "playlist/createPlaylist",
  async ({ playlistName, userId, token }) => {
    return FetchApi.fetch(`${config.api}/api/playlist/createplaylist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ playlistName, userId }),
    });
  },
);

export const deletePlaylist = createAsyncThunk("playlist/deletePlaylist", async ({ playlistId, token }) => {
  return FetchApi.fetch(`${config.api}/api/playlist/deleteplaylist/${playlistId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
});

export const addVideoToPlaylist = createAsyncThunk(
  "playlist/addVideoToPlaylist",
  async ({ playlistId, videoId, token }) => {
    return FetchApi.fetch(`${config.api}/api/playlist/addvideotoplaylist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ playlistId, videoId }),
    });
  },
);

export const removeVideoFromPlaylist = createAsyncThunk(
  "playlist/removeVideoFromPlaylist",
  async ({ playlistId, videoId, token }) => {
    return FetchApi.fetch(`${config.api}/api/playlist/removevideofromplaylist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ playlistId, videoId }),
    });
  },
);

export const moveVideoToDifferentPlaylist = createAsyncThunk(
  "playlist/moveVideoToDifferentPlaylist",
  async ({ sourcePlaylistId, targetPlaylistId, videoId, token }) => {
    return FetchApi.fetch(`${config.api}/api/playlist/movevideo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ sourcePlaylistId, targetPlaylistId, videoId }),
    });
  },
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserPlaylist.fulfilled, (state, { payload }) => {
      console.log("payload", payload);
      state.AllPlaylistName = payload.playlistNamesAll;
      state.playListData = payload.playlistsData;
    });
    builder.addCase(createPlaylist.fulfilled, (state, { payload }) => {
      //   state.AllPlaylistName = payload.playlistNamesAll;
      //   state.playListData = payload.playlistsData;
    });
    builder.addCase(deletePlaylist.fulfilled, (state, { payload }) => {
      //   state.AllPlaylistName = payload.playlistNamesAll;
      //   state.playListData = payload.playlistsData;
    });
    builder.addCase(addVideoToPlaylist.fulfilled, (state, { payload }) => {
      //   state.AllPlaylistName = payload.playlistNamesAll;
      //   state.playListData = payload.playlistsData;
    });
    builder.addCase(removeVideoFromPlaylist.fulfilled, (state, { payload }) => {
      //   state.AllPlaylistName = payload.playlistNamesAll;
      //   state.playListData = payload.playlistsData;
    });
    builder.addCase(moveVideoToDifferentPlaylist.fulfilled, (state, { payload }) => {
      //   state.AllPlaylistName = payload.playlistNamesAll;
      //   state.playListData = payload.playlistsData;
    });
  },
});

export default playlistSlice.reducer;

export const selectAllPlaylistName = (state) => state.playlist.AllPlaylistName;
export const selectPlayListData = (state) => state.playlist.playListData;
