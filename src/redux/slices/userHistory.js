import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FetchApi from "../../client.js";
import { config } from "../../config/config.js";

const initialState = {
  allHistory: null,
};

export const getUserHistory = createAsyncThunk("userHistory/getUserHistory", async ({ userId, token }) => {
  return FetchApi.fetch(`${config.api}/api/history/getuserhistory/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
});

const userHistorySlice = createSlice({
  name: "userHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserHistory.fulfilled, (state, action) => {
      state.allHistory = action.payload;
    });
  },
});

// Selectors
export const selectUserHistory = (state) => state.userHistory.allHistory;

export default userHistorySlice.reducer;
