import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import FetchApi from "../../client.js";
import { config } from "../../config/config.js";

const initialState = {
  discQuestions: [],
};

export const getDiscQuestions = createAsyncThunk("disc/getDiscQuestions", async ({ userId, token }) => {
  return FetchApi.fetch(`${config.api}/api/discQuestions/getallquestions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
});

export const saveDiscAnswers = createAsyncThunk(
  "disc/saveDiscAnswers",
  async ({ answers, userId, token }) => {
    return FetchApi.fetch(`${config.api}/api/disc/savediscanswers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ answers, userId }),
    });
  },
);

export const discSlice = createSlice({
  name: "disc",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDiscQuestions.fulfilled, (state, action) => {
      state.discQuestions = action.payload;
    });
  },
});

export const selectQuestions = (state) => state.disc.discQuestions;
export default discSlice.reducer;
