import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FetchApi from "../../client.js";
import { config } from "../../config/config.js";

const initialState = {
  universities: [],
};

export const getUniversity = createAsyncThunk(
  "university/getUniversity",
  async ({ page, country, name }) => {
    let url = `${config.api}/api/university/getuniversitydata?page=${page}`;
    if (name) {
      url += `&name=${encodeURIComponent(name)}`;
    }
    if (country) {
      url += `&country=${encodeURIComponent(country)}`;
    }

    return FetchApi.fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
);

const universitySlice = createSlice({
  name: "university",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUniversity.fulfilled, (state, action) => {
      state.universities = action.payload;
      console.log("university", action.payload);
    });
  },
});

export const selectUniversity = (state) => state.university.universities;
export default universitySlice.reducer;
