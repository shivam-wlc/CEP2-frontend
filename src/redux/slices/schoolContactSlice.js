import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FetchApi from "../../client.js";
import { config } from "../../config/config";

const initialState = {
  schoolContact: [],
};

export const saveschoolcontactform = createAsyncThunk(
  "schoolContact/saveschoolcontactform",
  async ({ formData, token, userId }) => {
    return FetchApi.fetch(`${config.api}/api/schoolContact/saveschoolcontactform/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
  },
);

export const getschoolcontactform = createAsyncThunk(
  "schoolContact/getschoolcontactform",
  async ({ token, search = "", page = 1, limit = 10 }) => {
    const queryParams = new URLSearchParams({
      search,
      page: page.toString(),
      limit: limit.toString(),
    });
    return FetchApi.fetch(`${config.api}/api/schoolContact/getschoolcontactform?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
);

const schoolContactSlice = createSlice({
  name: "schoolContact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveschoolcontactform.fulfilled, (state, action) => {
      //   state.schoolContact = action.payload;
    });
    builder.addCase(getschoolcontactform.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);
      state.schoolContact = action.payload;
    });
  },
});

export const selectSchoolContact = (state) => state.schoolContact.schoolContact;

export default schoolContactSlice.reducer;
