import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ScrpApiTendersMetadata } from "../../Api/SCPAPI";

const initialState = {
  isDistrictCallLoading: false,
  isSidebarOpen: false,
  districtsData: [],
  statesData: [],
  orgData: [],
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
export const GetStatesList = createAsyncThunk(
  "common/GetStatesList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await ScrpApiTendersMetadata.get(
        `/states/?search=west bengal`
      );
      return res.data?.results;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const GetOrgList = createAsyncThunk(
  "common/GetOrgList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await ScrpApiTendersMetadata.get(`/organisations/`);
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
      })
      // GetStatesList
      .addCase(GetStatesList.pending, (state) => {
        state.isDistrictCallLoading = true;
        state.error = null;
      })
      .addCase(GetStatesList.fulfilled, (state, action) => {
        state.isDistrictCallLoading = false;
        state.statesData = action.payload;
        state.error = null;
      })
      .addCase(GetStatesList.rejected, (state, action) => {
        state.isDistrictCallLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetOrgList
      .addCase(GetOrgList.pending, (state) => {
        state.isDistrictCallLoading = true;
        state.error = null;
      })
      .addCase(GetOrgList.fulfilled, (state, action) => {
        state.isDistrictCallLoading = false;
        state.orgData = action.payload;
        state.error = null;
      })
      .addCase(GetOrgList.rejected, (state, action) => {
        state.isDistrictCallLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { sibebarHandler } = commonSlice.actions;
export default commonSlice.reducer;
