import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    message: null,
    type: "info", // info, success, error, warning
    isVisible: false,
  },
  reducers: {
    showToast: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || "info";
      state.isVisible = true;
    },
    hideToast: (state) => {
      state.isVisible = false;
      // We don't clear message immediately to allow fade out animation
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
