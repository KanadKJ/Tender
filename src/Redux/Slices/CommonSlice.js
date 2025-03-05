import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
};

const commonSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sibebarHandler: (state, actions) => {
      state.isSidebarOpen = actions.payload;
    },
  },
});

export const { sibebarHandler } = commonSlice.actions;
export default commonSlice.reducer;
