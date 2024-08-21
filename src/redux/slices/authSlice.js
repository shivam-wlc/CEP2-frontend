import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../config/config.js";
import FetchApi from "../../client.js";

const login = createAsyncThunk("auth/login", async (credentials) => {
  return FetchApi.fetch(`${config.api}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
});

const signup = createAsyncThunk("auth/signup", async (payload) => {
  return FetchApi.fetch(`${config.api}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
});

const forgetPass = createAsyncThunk("auth/forgetPass", async (payload) => {
  return FetchApi.fetch(`${config.api}/api/auth/forget`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
});

const forgetPassVerify = createAsyncThunk(
  "auth/forgetPassVerify",
  async (payload) => {
    return FetchApi.fetch(
      `${config.api}/api/auth/verifypassword?userId=${payload.userId}&token=${payload.token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          password: payload.password,
          confirmPassword: payload.confirmPassword,
        },
      }
    );
  }
);

// Define a slice of state for authentication
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: "",
    userId: "",
  },
  reducers: {
    logout(state) {
      state.user = "";
      state.isAuthenticated = false;
      state.token = "";
      state.userId = "";
    },
    setIsAuthenticated(state, { payload }) {
      state.isAuthenticated = payload.isAuthenticated;
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isAuthenticated = true;
      state.token = payload.token;
      state.userId = payload.userId;
    });
    builder.addCase(signup.fulfilled, (state, { payload }) => {});
    builder.addCase(forgetPass.fulfilled, (state, { payload }) => {
      //   alert(payload.message);
    });
    builder.addCase(forgetPassVerify.fulfilled, (state, { payload }) => {
      //   alert(payload.message);
    });
  },
});

const selectAuthenticated = (state) => state.auth.isAuthenticated;
const selectAuthData = (state) => state.auth;
const selectToken = (state) => state.auth.token;
const selectUserId = (state) => state.auth.userId;
const { setIsAuthenticated, logout } = authSlice.actions;

export {
  selectAuthenticated,
  selectAuthData,
  selectToken,
  selectUserId,
  login,
  signup,
  forgetPass,
  forgetPassVerify,
  setIsAuthenticated,
  logout,
};
export default authSlice.reducer;
