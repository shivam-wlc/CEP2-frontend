import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import FetchApi from "../../client";
import { config } from "../../config/config";
import { notify } from "./alertSlice";

const inviteCollaborator = createAsyncThunk("invite/inviteCollaborator", async (payload) => {
  return FetchApi.fetch(`${config.api}/api/collaborator/invite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
});

const inviteSlice = createSlice({
  name: "invite",
  initialState: {},
  reducers: {},
  extraReducers(builder) {
    builder.addCase(inviteCollaborator.fulfilled, (state, { payload }) => {
      notify({ type: "success", message: payload.message });
    });
  },
});

export default inviteSlice.reducer;
export { inviteCollaborator };
