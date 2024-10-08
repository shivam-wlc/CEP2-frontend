import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import FetchApi from "../../client.js";
import { config } from "../../config/config.js";

const initialState = {
  universities: [],
};

export const getUniversityByName = createAsyncThunk("zyla/getUniversityByName", async ({ name }) => {
  console.log("Searching univerisity", name);
  return FetchApi.fetch(`${config.api}/api/zyla/universitybyname?name=${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
});

export const getUniversityByCountry = createAsyncThunk("zyla/getUniversityByCountry", async (payload) => {
  return FetchApi.fetch(`${config.api}/api/zyla/universitybycountry?country=${payload.country}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
});

export const getTopUniversity = createAsyncThunk("zyla/getTopUniversity", async (payload) => {
  console.log("payload check ", payload);
  return FetchApi.fetch(`${config.api}/api/zyla/topuniversity?number_of_records=50`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
});

const zylaSlice = createSlice({
  name: "zyla",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopUniversity.fulfilled, (state, { payload }) => {
      state.universities = payload.university;
      console.log("payload", payload);
    });
    builder.addCase(getUniversityByName.fulfilled, (state, { payload }) => {
      // state.universities = payload.university;
      console.log("getuniversity by name", payload);
      state.universities = payload.university;
    });
    builder.addCase(getUniversityByCountry.fulfilled, (state, { payload }) => {
      // state.universities = payload.university;
      console.log("getuniversity by country", payload);
      state.universities = payload.university;
    });
  },
});

export const selectUniversities = (state) => state.zyla.universities;

export default zylaSlice.reducer;
