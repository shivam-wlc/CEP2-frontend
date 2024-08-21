import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FetchApi from "../../client.js";
import { config } from "../../config/config.js";

const initialState = {
  survey: [],
  clusterData: [],
};

export const saveSurveyData = createAsyncThunk(
  "survey/saveSurveyData",
  async ({ formData, userId, token }) => {
    return FetchApi.fetch(
      `${config.api}/api/survey/savesurveyform1/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );
  }
);

export const getSurveyData = createAsyncThunk(
  "survey/getSurveyData",
  async ({ userId, token }) => {
    return FetchApi.fetch(`${config.api}/api/survey/getsurveyform1/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
);

export const getCareerClusterOptions = createAsyncThunk(
  "survey/getCareerClusterOptions",
  async ({ token }) => {
    return FetchApi.fetch(`${config.api}/api/survey/getcareerclusteroptions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
);

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveSurveyData.fulfilled, (state, action) => {
      //   state.surveys = action.payload;
      console.log("survey", action.payload);
    });

    builder.addCase(getSurveyData.fulfilled, (state, action) => {
      state.survey = action.payload.surveyData;
    });

    builder.addCase(getCareerClusterOptions.fulfilled, (state, action) => {
      state.clusterData = action.payload.clusterData;
    });
  },
});

export const selectSurvey = (state) => state.survey.survey;
export const selectClusterData = (state) => state.survey.clusterData;
export default surveySlice.reducer;
