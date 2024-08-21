import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FetchApi from "../../client.js";
import { config } from "../../config/config";

const initialState = {
  users: [],
  creators: [],
  generalData: {},
};

export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async ({ token, search = "", page = 1, limit = 10 }) => {
    const queryParams = new URLSearchParams({
      search,
      page: page.toString(),
      limit: limit.toString(),
    });

    return FetchApi.fetch(
      `${config.api}/api/admin/all-users-data?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
);

export const getAllCreators = createAsyncThunk(
  "admin/getAllCreators",
  async ({ token, search = "", page = 1, limit = 10 }) => {
    const queryParams = new URLSearchParams({
      search,
      page: page.toString(),
      limit: limit.toString(),
    });

    return FetchApi.fetch(
      `${config.api}/api/admin/all-creators-data?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
);

export const getGeneralUserData = createAsyncThunk(
  "admin/getGeneralUserData",
  async ({ token }) => {
    return FetchApi.fetch(`${config.api}/api/admin/getgeneralinformation`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
);

export const updateActiveStatus = createAsyncThunk(
  "admin/updateActiveStatus",
  async ({ userId, status, token }) => {
    return FetchApi.fetch(`${config.api}/api/admin/updateStatus/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getAllCreators.fulfilled, (state, action) => {
      state.creators = action.payload;
    });
    builder.addCase(getGeneralUserData.fulfilled, (state, action) => {
      state.generalData = action.payload;
    });

    builder.addCase(updateActiveStatus.fulfilled, (state, action) => {
      console.log("action", action.payload);
      const { user } = action.payload;
      console.log("user", user);

      // Helper function to update user status in an array
      const updateUserStatus = (array) =>
        array.map((item) =>
          item._id === user._id ? { ...item, status: user.status } : item
        );

      // Check if user exists in `users` and update if found
      if (state.users.some((item) => item._id === user._id)) {
        state.users = updateUserStatus(state.users);
      }

      // Check if user exists in `creators` and update if found
      if (state.creators.some((item) => item._id === user._id)) {
        state.creators = updateUserStatus(state.creators);
      }
    });
  },
});

export const selectUsersData = (state) => state.admin.users;
export const selectCreatorsData = (state) => state.admin.creators;
export const selectGeneralData = (state) => state.admin.generalData;

export default adminSlice.reducer;
