import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import FetchApi from "../../client";
import { config } from "../../config/config";

const initialState = {
  counts: { activePage: 1, totalPage: null },
  questions: [],
  result: [],
  jobSuggestionBasedOnResult: [],
  careersByPrepration: null,
  careerInfo: null,
  detailedCareerData: [],
};

const getQuestions = createAsyncThunk("onet/getQuestions", async (payload) => {
  return FetchApi.fetch(`${config.api}/api/onet/browsequestionjobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.token}`,
    },
    body: JSON.stringify(payload),
  });
});

const getResultAndJob = createAsyncThunk("onet/getResultAndJob", async ({ answers, token, userId }) => {
  return FetchApi.fetch(`${config.api}/api/onet/resultmatchingcareers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ answers, userId }),
  });
});

const getCareerByPrepration = createAsyncThunk("onet/getCareerByPrepration", async (payload) => {
  return FetchApi.fetch(`${config.api}/api/onet/browsecareersortedbyjobpreparation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.token}`,
    },
    body: JSON.stringify(payload),
  });
});

const getCareerInfo = createAsyncThunk("onet/getCareerInfo", async (payload) => {
  return FetchApi.fetch(`${config.api}/api/onet/getcareerinfo/${payload.careercode}/${payload.topic}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.token}`,
    },
  });
});

const generateDeatiledDataOfCareers = createAsyncThunk(
  "onet/generateDeatiledDataOfCareers",
  async ({ userId, token }) => {
    console.log("shivam", userId, "token", token);
    return FetchApi.fetch(`${config.api}/api/onet/generateresult/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
);

const onetSlice = createSlice({
  name: "onet",
  initialState,
  reducers: {
    handlePagiation(state, { payload: { activePage } }) {
      state.counts.activePage = activePage;
    },
  },
  extraReducers(builder) {
    builder.addCase(getQuestions.fulfilled, (state, { payload }) => {
      state.questions = payload.question;
    });
    builder.addCase(getResultAndJob.fulfilled, (state, { payload }) => {
      if (payload.results && payload.careers) {
        console.log("payload shivam", payload);
        state.result = payload.results.result;
        state.jobSuggestionBasedOnResult = payload.careers.career;
      }
    });
    builder.addCase(getCareerByPrepration.fulfilled, (state, { payload }) => {
      state.careersByPrepration = payload.career;
      state.counts.totalPage = Math.ceil(payload.total / 20);
    });
    builder.addCase(getCareerInfo.fulfilled, (state, { payload }) => {
      state.careerInfo = payload;
    });

    builder.addCase(generateDeatiledDataOfCareers.fulfilled, (state, { payload }) => {
      console.log("payload", payload);
      state.detailedCareerData = payload.totalData;
    });
  },
});

const selectOnet = (state) => state.onet;
const { saveAnswer } = onetSlice.actions;
const selectDetailedCareerData = (state) => state.onet.detailedCareerData;
export {
  selectOnet,
  selectDetailedCareerData,
  saveAnswer,
  getQuestions,
  getResultAndJob,
  getCareerByPrepration,
  getCareerInfo,
  generateDeatiledDataOfCareers,
};

export default onetSlice.reducer;
