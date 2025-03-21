import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ScrpApiTenders } from "../../Api/SCPAPI";

const initialState = {
  tenderData: [],
  tenderIsLoading: false,
  tenderDetails: [],
  error: "",
};
export const GetTenderList = createAsyncThunk(
  "tender/GetTenderList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await ScrpApiTenders.get("/tenders/");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const GetTenderListWithFilters = createAsyncThunk(
  "tender/GetTenderListWithFilters",
  async (params, { rejectWithValue }) => {
    try {
      const res = await ScrpApiTenders.get(`/tenders/?${params}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tenders"
      );
    }
  }
);
export const GetTenderDetails = createAsyncThunk(
  "tender/GetTenderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await ScrpApiTenders.get(`/tenders/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
const tenderSlice = createSlice({
  name: "tender",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(GetTenderList.pending, (state) => {
        state.tenderIsLoading = true;
        state.error = null;
      })
      .addCase(GetTenderList.fulfilled, (state, action) => {
        state.tenderIsLoading = false;
        state.tenderData = action.payload;
        state.error = null;
      })
      .addCase(GetTenderList.rejected, (state, action) => {
        state.tenderIsLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(GetTenderListWithFilters.pending, (state) => {
        state.tenderIsLoading = true;
        state.error = null;
      })
      .addCase(GetTenderListWithFilters.fulfilled, (state, action) => {
        state.tenderIsLoading = false;
        state.tenderData = action.payload;
        state.error = null;
      })
      .addCase(GetTenderListWithFilters.rejected, (state, action) => {
        state.tenderIsLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetTenderDetails
      .addCase(GetTenderDetails.pending, (state) => {
        state.tenderIsLoading = true;
        state.error = null;
      })
      .addCase(GetTenderDetails.fulfilled, (state, action) => {
        state.tenderIsLoading = false;
        state.tenderDetails = action.payload;
        state.error = null;
      })
      .addCase(GetTenderDetails.rejected, (state, action) => {
        state.tenderIsLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// export const { userData } = authSlice.actions;
export default tenderSlice.reducer;
