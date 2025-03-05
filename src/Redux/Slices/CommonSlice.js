import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ScrpApiTendersMetadata } from "../../Api/SCPAPI";

const initialState = {
  isDistrictCallLoading: false,
  isSidebarOpen: false,
  districtsData: [],
};
export const GetDistrictsList = createAsyncThunk(
  "common/GetDistrictsList",
  async (params, { rejectWithValue }) => {
    try {
      const res = await ScrpApiTendersMetadata.get(
        `/districts/?state_id=${params}`
      );
      return res.data?.results;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    sibebarHandler: (state, actions) => {
      state.isSidebarOpen = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetDistrictsList.pending, (state) => {
        state.isDistrictCallLoading = true;
        state.error = null;
      })
      .addCase(GetDistrictsList.fulfilled, (state, action) => {
        state.isDistrictCallLoading = false;
        state.districtsData = action.payload;
        state.error = null;
      })
      .addCase(GetDistrictsList.rejected, (state, action) => {
        state.isDistrictCallLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { sibebarHandler } = commonSlice.actions;
export default commonSlice.reducer;
