import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import FetchApi from "../../client.js";
import { config } from "../../config/config.js";

const initialState = {
  socialMediaData: [],
};

// saving the socialMediaLink to db
export const socialMediaLink = createAsyncThunk(
  "creator/socialMediaLink",
  async ({ userId, formData, token }, thunkAPI) => {
    try {
      const response = await FetchApi.fetch(`${config.api}/api/user-details/creatorsocialmedia/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

// getting the links from the db

export const getSocialMediaLink = createAsyncThunk(
  "userDetails/getSocialMediaLink",
  async ({ userId, token }, thunkAPI) => {
    try {
      const response = await FetchApi.fetch(`${config.api}/api/user-details/getsocialmedia/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(socialMediaLink.fulfilled, (state, { payload }) => {
      // state.socialMediaData = payload.userDetails;
    });

    builder.addCase(getSocialMediaLink.fulfilled, (state, { payload }) => {
      state.socialMediaData = payload.socialMediaLinks;
    });
  },
});

export const selectSocialMediaData = (state) => state.userDetails.socialMediaData;

export default userDetailsSlice.reducer;
