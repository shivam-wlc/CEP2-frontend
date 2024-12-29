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

// export const getUserAnalytics = createAsyncThunk(
//   "userHistory/getUserAnalytics",
//   async ({ userId, token }) => {
//     return FetchApi.fetch(`${config.api}/api/history/studentdashboardanalytics/${userId}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   },
// );

export const getUserAnalytics = createAsyncThunk(
  "userHistory/getUserAnalytics",
  async ({ userId, token }) => {
    const response = await fetch(`${config.api}/api/history/studentdashboardanalytics/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user analytics");
    }

    const data = await response.json(); // Parse the response data
    return data; // Return the data to be used by the reducer
  },
);

const userHistorySlice = createSlice({
  name: "userHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserHistory.fulfilled, (state, action) => {
      state.allHistory = action.payload;
    });
    builder.addCase(getUserAnalytics.fulfilled, (state, { payload }) => {
      console.log("payload", payload);
      // state.allAnalytics = payload?.analytics;
    });
  },
});

// Selectors
export const selectUserHistory = (state) => state.userHistory.allHistory;
// export const selectUserAnalytics = (state) => state.userHistory.allAnalytics

export default userHistorySlice.reducer;
