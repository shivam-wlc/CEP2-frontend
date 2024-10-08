import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: null,
  message: "",
  reRender: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    notify(state, { payload: { type, message } }) {
      state.type = type;
      state.message = message;
      state.reRender = state.reRender ? false : true;
    },
    clearNotification(state) {
      state.type = null;
      state.message = "";
    },
  },
});

const selectAlert = (state) => state.alert;
const { notify, clearNotification } = alertSlice.actions;
export { selectAlert, notify, clearNotification };
export default alertSlice.reducer;
