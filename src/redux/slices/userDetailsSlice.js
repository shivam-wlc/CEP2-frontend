import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import FetchApi from "../../client.js";
import { config } from "../../config/config.js";

const initialState = {
  socialMediaData: [],
};

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

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(socialMediaLink.fulfilled, (state, { payload }) => {
      state.socialMediaData = payload.userDetails;
      console.log("payload", payload.userDetails);
    });
  },
});

export const selectSocialMediaData = (state) => state.userDetails.socialMediaData;
export default userDetailsSlice.reducer;
