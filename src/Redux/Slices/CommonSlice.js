import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ScrpApiTendersMetadata } from "../../Api/SCPAPI";
import { TMGetApi } from "../../Api/TMAPI";
import { toast } from "react-toastify";
import { TMGetApiNoAuth } from "../../Api/NoAuthTMApi";

const initialState = {
  isDistrictCallLoading: false,
  isSidebarOpen: false,
  districtsData: [],
  statesData: [],
  orgData: [],
  drpData: [],
  divData: [],
  subDivData: [],
  sectionsData: [],
  unitData: [],
  planData: [],
  userList: [],
  filtersBasedOnUsers: [],
  userManagementUserDataWithPlan: [],
  contactQueriesList: [],
};

export const GetUserList = createAsyncThunk(
  "common/GetUserList",
  async (params, { rejectWithValue }) => {
    try {
      const res = await TMGetApi.get(`/GetUserList`);
      return res.data?.value;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const GetFiltersBasedOnUserId = createAsyncThunk(
  "common/GetFiltersBasedOnUserId",
  async (params, { rejectWithValue }) => {
    if (params?.length === 0 || params === "") return [];
    try {
      const res = await TMGetApi.get(`/GetFilterJson/${params}`);

      let result = {
        filterJson: JSON.parse(res.data?.value[0]?.filterJson),
        planid: res.data?.value[0]?.planId,
      };
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const GetPlanList = createAsyncThunk(
  "common/GetPlanList",
  async (params, { rejectWithValue }) => {
    try {
      const res = await TMGetApi.get(`/GetPlanList`);
      return res.data?.value;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
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
export const GetDrpList = createAsyncThunk(
  "common/GetDrpList",
  async (params, { rejectWithValue }) => {
    const organizationIds = params?.map((item) => item.id);
    const queryString = organizationIds
      ?.map((id) => `organisation_id=${id}`)
      .join("&");

    if (params?.length === 0) return [];

    try {
      const res = await ScrpApiTendersMetadata.get(
        `/departments/?${queryString}`
      );
      return res.data?.results;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const GetDivList = createAsyncThunk(
  "common/GetDivList",
  async (params, { rejectWithValue }) => {
    const Ids = params?.map((item) => item.id);
    const queryString = Ids?.map((id) => `department_id=${id}`).join("&");

    try {
      const res = await ScrpApiTendersMetadata.get(
        `/divisions/?${queryString}`
      );
      return res.data?.results;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const GetSubDivList = createAsyncThunk(
  "common/GetSubDivList",
  async (params, { rejectWithValue }) => {
    const Ids = params?.map((item) => item.id);
    const queryString = Ids?.map((id) => `division_id=${id}`).join("&");

    try {
      const res = await ScrpApiTendersMetadata.get(
        `/sub_divisions/?${queryString}`
      );
      return res.data?.results;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const GetSectionList = createAsyncThunk(
  "common/GetSectionList",
  async (params, { rejectWithValue }) => {
    const Ids = params?.map((item) => item.id);
    const queryString = Ids?.map((id) => `sub_division_id=${id}`).join("&");

    try {
      const res = await ScrpApiTendersMetadata.get(`/sections/?${queryString}`);
      return res.data?.results;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const GetUnitList = createAsyncThunk(
  "common/GetUnitList",
  async (params, { rejectWithValue }) => {
    const Ids = params?.map((item) => item.id);
    const queryString = Ids?.map((id) => `section_id=${id}`).join("&");
    try {
      const res = await ScrpApiTendersMetadata.get(`/units/?${queryString}`);
      return res.data?.results;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const GetUserDetailsWithPlan = createAsyncThunk(
  "common/GetUserDetailsWithPlan",
  async (params, { rejectWithValue }) => {
    try {
      const res = await TMGetApi.get(`/GetUserDetailsWithPlan?${params}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const ToggleUserStatus = createAsyncThunk(
  "common/ToggleUserStatus",
  async ({ uid, statusOfUser }, { rejectWithValue }) => {
    try {
      const res = await TMGetApi.post(
        `/ToggleUserStatus?userId=${uid}&isActive=${statusOfUser}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const InsertContactQueries = createAsyncThunk(
  "common/InsertContactQueries",
  async (params, { rejectWithValue }) => {
    try {
      const res = await TMGetApiNoAuth.post(`/InsertContactQuery`, params);
      return res.data?.value;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const GetContactQueries = createAsyncThunk(
  "common/GetContactQueries",
  async (params, { rejectWithValue }) => {
    try {
      const res = await TMGetApiNoAuth.post(`/GetContactQueries`, params);
      return res.data?.value;
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
    cleanUpFilterBasedOnUser: (state) => {
      state.filtersBasedOnUsers = [];
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
      })
      // GetDrpList
      .addCase(GetDrpList.pending, (state) => {
        state.isDistrictCallLoading = true;
        state.error = null;
      })
      .addCase(GetDrpList.fulfilled, (state, action) => {
        state.isDistrictCallLoading = false;
        state.drpData = action.payload;
        state.error = null;
      })
      .addCase(GetDrpList.rejected, (state, action) => {
        state.isDistrictCallLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetDivList
      .addCase(GetDivList.pending, (state) => {
        state.isDistrictCallLoading = true;
        state.error = null;
      })
      .addCase(GetDivList.fulfilled, (state, action) => {
        state.isDistrictCallLoading = false;
        state.divData = action.payload;
        state.error = null;
      })
      .addCase(GetDivList.rejected, (state, action) => {
        state.isDistrictCallLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetSubDivList
      .addCase(GetSubDivList.pending, (state) => {
        state.isDistrictCallLoading = true;
        state.error = null;
      })
      .addCase(GetSubDivList.fulfilled, (state, action) => {
        state.isDistrictCallLoading = false;
        state.subDivData = action.payload;
        state.error = null;
      })
      .addCase(GetSubDivList.rejected, (state, action) => {
        state.isDistrictCallLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetSectionsList
      .addCase(GetSectionList.pending, (state) => {
        state.isDistrictCallLoading = true;
        state.error = null;
      })
      .addCase(GetSectionList.fulfilled, (state, action) => {
        state.isDistrictCallLoading = false;
        state.sectionsData = action.payload;
        state.error = null;
      })
      .addCase(GetSectionList.rejected, (state, action) => {
        state.isDistrictCallLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetUnitList
      .addCase(GetUnitList.pending, (state) => {
        state.isDistrictCallLoading = true;
        state.error = null;
      })
      .addCase(GetUnitList.fulfilled, (state, action) => {
        state.isDistrictCallLoading = false;
        state.unitData = action.payload;
        state.error = null;
      })
      .addCase(GetUnitList.rejected, (state, action) => {
        state.isDistrictCallLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetPlanList
      .addCase(GetPlanList.pending, (state) => {
        state.isDistrictCallLoading = true;
        state.error = null;
      })
      .addCase(GetPlanList.fulfilled, (state, action) => {
        state.isDistrictCallLoading = false;
        state.planData = action.payload;
        state.error = null;
      })
      .addCase(GetPlanList.rejected, (state, action) => {
        state.isDistrictCallLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetUserList
      .addCase(GetUserList.pending, (state) => {
        state.isDistrictCallLoading = true;
        state.error = null;
      })
      .addCase(GetUserList.fulfilled, (state, action) => {
        state.isDistrictCallLoading = false;
        state.userList = action.payload;
        state.error = null;
      })
      .addCase(GetUserList.rejected, (state, action) => {
        state.isDistrictCallLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetFiltersBasedOnUserId
      .addCase(GetFiltersBasedOnUserId.pending, (state) => {
        state.isDistrictCallLoading = true;
        state.error = null;
      })
      .addCase(GetFiltersBasedOnUserId.fulfilled, (state, action) => {
        state.isDistrictCallLoading = false;
        state.filtersBasedOnUsers = action.payload;
        state.error = null;
      })
      .addCase(GetFiltersBasedOnUserId.rejected, (state, action) => {
        state.isDistrictCallLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetUserDetailsWithPlan
      .addCase(GetUserDetailsWithPlan.pending, (state) => {
        state.isDistrictCallLoading = true;
        state.error = null;
      })
      .addCase(GetUserDetailsWithPlan.fulfilled, (state, action) => {
        state.isDistrictCallLoading = false;
        state.userManagementUserDataWithPlan = action.payload;
        state.error = null;
      })
      .addCase(GetUserDetailsWithPlan.rejected, (state, action) => {
        state.isDistrictCallLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // ToggleUserStatus
      .addCase(ToggleUserStatus.pending, (state) => {
        state.isDistrictCallLoading = true;
        state.error = null;
      })
      .addCase(ToggleUserStatus.fulfilled, (state, action) => {
        state.isDistrictCallLoading = false;
        state.error = null;
        if (action.payload?.message === "User status updated successfully.") {
          toast.success("User status updated successfully.");
        }
      })
      .addCase(ToggleUserStatus.rejected, (state, action) => {
        state.isDistrictCallLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // InsertContactQueries
      .addCase(InsertContactQueries.pending, (state) => {
        state.isDistrictCallLoading = true;
        state.error = null;
      })
      .addCase(InsertContactQueries.fulfilled, (state, action) => {
        state.isDistrictCallLoading = false;
        state.error = null;

        if (action?.payload[0] === "Query submitted successfully.") {
          toast.success("Query submitted successfully.");
        }
      })
      .addCase(InsertContactQueries.rejected, (state, action) => {
        state.isDistrictCallLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetContactQueries
      .addCase(GetContactQueries.pending, (state) => {
        state.isDistrictCallLoading = true;
        state.error = null;
      })
      .addCase(GetContactQueries.fulfilled, (state, action) => {
        state.isDistrictCallLoading = false;
        state.error = null;
        state.contactQueriesList = action.payload;
      })
      .addCase(GetContactQueries.rejected, (state, action) => {
        state.isDistrictCallLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { sibebarHandler, cleanUpFilterBasedOnUser } = commonSlice.actions;
export default commonSlice.reducer;
