import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ScrpApiTenders } from "../../Api/SCPAPI";
import { queryBuilder } from "../../Utils/CommonUtils";
const initialState = {
  tenderData: [],
  tenderIsLoading: false,
  error: "",
};
export const GetTenderList = createAsyncThunk(
  "tender/GetTenderList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await ScrpApiTenders.get("/tenders");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const GetTenderListWithFilters = createAsyncThunk(
  "tender/GetTenderListWithFilters",
  async (params, { rejectWithValue }) => {
    console.log(queryBuilder(params));

    try {
      const res = await ScrpApiTenders.get(`/tenders?${queryBuilder(params)}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tenders"
      );
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
      });
  },
});

// export const { userData } = authSlice.actions;
export default tenderSlice.reducer;
