import { createSlice } from "@reduxjs/toolkit";

let nextId = 1;

const toastSlice = createSlice({
  name: "toast",
  initialState: [],
  reducers: {
    showToast: {
      reducer: (state, action) => {
        state.push(action.payload);
        // Keep the stack short so it never covers the page.
        if (state.length > 3) state.shift();
      },
      prepare: ({ message, type = "info", description, duration = 4000 }) => ({
        payload: { id: nextId++, message, type, description, duration },
      }),
    },
    hideToast: (state, action) => state.filter((t) => t.id !== action.payload),
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
