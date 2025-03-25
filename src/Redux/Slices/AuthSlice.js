import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TMGetApi } from "../../Api/TMAPI";

const initialState = {
  userData: null, // Should be an object, not an array
  authIsLoading: false,
  error: null, // Consistent with rejection
  userFilters: null,
};
// InsertFilterJson
export const InsertFilterJson = createAsyncThunk(
  "auth/InsertFilterJson",
  async (
    { adminFilters, userDetails, plan, userData },
    { rejectWithValue }
  ) => {
    const planid = plan?.planId;
    const userid = userDetails?.id;

    // Convert filterjson to a JSON string
    const filterjson = JSON.stringify(adminFilters);

    try {
      const res = await TMGetApi.post(
        `/InsertFilterJson`,
        {
          filterjson, // This is now a string
          userid,
          planid,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure correct content type
          },
        }
      );

      return res.data?.value;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const GetUserDetails = createAsyncThunk(
  "auth/GetUserDetails", // Corrected action type
  async (data, { rejectWithValue }) => {
    try {
      const response = await TMGetApi.post(`/GetUserDetails/`, data);

      if (!response?.data?.value?.length) {
        return rejectWithValue("Invalid Email or Password");
      }

      const user = response.data.value[0]; // Store only the user object
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
export const SignUpUser = createAsyncThunk(
  "auth/SignUpUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await TMGetApi.post(`/SignupUser/`, data);

      if (response?.data?.status === 400) {
        return rejectWithValue("Please fill valid data");
      }
      if (response?.data?.value[0] === "User already exists") {
        return rejectWithValue(
          "User already exists with this details,Please try to login"
        );
      }
      return response?.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Please fill valid data or try again later"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = null;
      localStorage.removeItem("user");
      state.userFilters = null;
    },
    setData: (state, action) => {
      state.userData = action.payload;
      state.userFilters = JSON.parse(action.payload?.filterjson);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetUserDetails.pending, (state) => {
        state.authIsLoading = true;
        state.error = null;
      })
      .addCase(GetUserDetails.fulfilled, (state, action) => {
        state.authIsLoading = false;
        state.userData = action.payload;
        state.userFilters = JSON.parse(action.payload?.filterjson);
        state.error = null;
      })
      .addCase(GetUserDetails.rejected, (state, action) => {
        state.authIsLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(SignUpUser.pending, (state) => {
        state.authIsLoading = true;
        state.error = null;
      })
      .addCase(SignUpUser.fulfilled, (state, action) => {
        state.authIsLoading = false;
        state.error = null;
      })
      .addCase(SignUpUser.rejected, (state, action) => {
        state.authIsLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logout, setData } = authSlice.actions; // Export logout action
export default authSlice.reducer;
