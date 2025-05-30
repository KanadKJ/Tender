import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TMGetApi } from "../../Api/TMAPI";
import { toast } from "react-toastify";
import { setEncryptedItem } from "../../Utils/CommonUtils";

const initialState = {
  userData: null, // Should be an object, not an array
  authIsLoading: false,
  error: null, // Consistent with rejection
  userFilters: null,
  companyDetailsData: null,
  addressDetailsData: null,
  
};
//GetOtp
export const GetOtp = createAsyncThunk(
  "auth/GetOtp",
  async (data, { rejectWithValue }) => {
    let obj = {
      mobileNumber: `91${data}`,
      param1: "",
      param2: "",
      param3: "",
    };
    try {
      const response = await TMGetApi.post(`/send-otp`, obj);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
//ValidateOtp
// InsertFilterJson
export const InsertFilterJson = createAsyncThunk(
  "auth/InsertFilterJson",
  async (
    { adminFilters, userDetails, plan, userData },
    { rejectWithValue }
  ) => {
    const planid = plan?.planId;
    const userid = userDetails?.id;
    if (!planid || !userid) {
      toast.warn("Please select user and plans");
      return null;
    }
    // Convert filterjson to a JSON string
    const filterjson = JSON.stringify(adminFilters);

    try {
      const res = await TMGetApi.post(
        `/InsertFilterJson`,
        {
          filterjson,
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

export const GetUserDetailsForLoginAsUser = createAsyncThunk(
  "auth/GetUserDetailsForLoginAsUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await TMGetApi.post(
        `/GetUserDetailsForLoginAsUser/`,
        data
      );
      return response?.data?.value[0];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const GetUserDetails = createAsyncThunk(
  "auth/GetUserDetails", // Corrected action type
  async (data, { rejectWithValue }) => {
    console.log(data, "auth slice ");

    try {
      const response = await TMGetApi.post(`/verify-otp-and-get-user`, data);

      // if (!response?.data?.value?.length) {
      //   return rejectWithValue("Failed, OTP did not match");
      // }

      if (response?.data?.statusCode === 401) {
        return rejectWithValue(response?.data?.errors);
      }
      if (response?.data?.statusCode === 404) {
        return rejectWithValue(response?.data?.errors);
      }
      if (response?.data?.value[0]?.isLoggedIn) {
        return rejectWithValue(["User already logged in"]);
      }
      const user = response.data.value[0]; // Store only the user object

      const obj = {
        user,
        data,
        valid: true,
      };
      return obj;
    } catch (error) {
      return rejectWithValue(console.log(error));
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
export const InsertUpdateCompany = createAsyncThunk(
  "auth/InsertUpdateCompany",
  async (data, { rejectWithValue }) => {
    try {
      const response = await TMGetApi.post(`/insertupdatecompany`, data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Please fill valid data or try again later"
      );
    }
  }
);
export const InsertUpdateAddressData = createAsyncThunk(
  "auth/InsertUpdateAddressData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await TMGetApi.post(`/insertupdateaddressData`, data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Please fill valid data or try again later"
      );
    }
  }
);
export const GetCompanyDetails = createAsyncThunk(
  "auth/GetCompanyDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await TMGetApi.get(`/GetCompanyDetails?userId=${id}`);
      return response?.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const GetAddressDetails = createAsyncThunk(
  "auth/GetAddressDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await TMGetApi.get(`/GetAddressDetails?userId=${id}`);
      return response?.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const LogoutUser = createAsyncThunk(
  "auth/LogoutUser",
  async (data, { rejectWithValue }) => {
    toast.success("Logged out successfully!");
    try {
      const response = await TMGetApi.post(`LogoutUser?userid=${data}`);
      return response?.data;
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
      // GetUserDetails
      .addCase(GetUserDetails.pending, (state) => {
        state.authIsLoading = true;
        state.error = null;
      })
      .addCase(GetUserDetails.fulfilled, (state, action) => {
        const { user, data } = action.payload;

        state.authIsLoading = false;
        state.userData = user;
        state.userFilters = JSON.parse(user?.filterjson);
        if (user?.userType === 1) {
          const encrypted = setEncryptedItem(JSON.stringify(data));
          localStorage.setItem("controller", encrypted);
        }
        localStorage.setItem("user", JSON.stringify(user));

        state.error = null;
      })
      .addCase(GetUserDetails.rejected, (state, action) => {
        state.authIsLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetUserDetailsForLoginAsUser
      .addCase(GetUserDetailsForLoginAsUser.pending, (state) => {
        state.authIsLoading = true;
        state.error = null;
      })
      .addCase(GetUserDetailsForLoginAsUser.fulfilled, (state, action) => {
        state.authIsLoading = false;
        state.userData = action.payload;
        state.userFilters = JSON.parse(action.payload?.filterjson);
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("sessionInControl", "true");
      })
      .addCase(GetUserDetailsForLoginAsUser.rejected, (state, action) => {
        state.authIsLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // SignUpUser
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
      })
      // InsertFilterJson
      .addCase(InsertFilterJson.pending, (state) => {
        state.authIsLoading = true;
        state.error = null;
      })
      .addCase(InsertFilterJson.fulfilled, (state, action) => {
        state.authIsLoading = false;
        state.error = null;
        console.log(action.payload[0]);

        if (action?.payload[0] === "Updated successfully") {
          toast.success("User updated successfully!");
        }
      })
      .addCase(InsertFilterJson.rejected, (state, action) => {
        state.authIsLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // LogoutUser
      .addCase(LogoutUser.pending, (state) => {
        // state.authIsLoading = true;
        state.error = null;
      })
      .addCase(LogoutUser.fulfilled, (state, action) => {
        state.authIsLoading = false;
        state.error = null;
        console.log(action.payload);

        if (action?.payload?.message === "User logged out successfully") {
          state.userData = null;
          localStorage.removeItem("user");
          localStorage.removeItem("controller");
          localStorage.removeItem("sessionInControl");
          state.userFilters = null;
        }
      })
      .addCase(LogoutUser.rejected, (state, action) => {
        state.authIsLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      //InsertUpdateCompany
      .addCase(InsertUpdateCompany.pending, (state) => {
        state.authIsLoading = true;
        state.error = null;
      })
      .addCase(InsertUpdateCompany.fulfilled, (state, action) => {
        state.authIsLoading = false;
        state.error = null;

        if (
          action?.payload?.message === "Company details saved successfully."
        ) {
          toast.success("Company details saved successfully.");
        }
      })
      .addCase(InsertUpdateCompany.rejected, (state, action) => {
        state.authIsLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      //InsertUpdateAddressData
      .addCase(InsertUpdateAddressData.pending, (state) => {
        state.authIsLoading = true;
        state.error = null;
      })
      .addCase(InsertUpdateAddressData.fulfilled, (state, action) => {
        state.authIsLoading = false;
        state.error = null;

        if (
          action?.payload?.message === "Address details saved successfully."
        ) {
          toast.success("Address details saved successfully.");
        }
      })
      .addCase(InsertUpdateAddressData.rejected, (state, action) => {
        state.authIsLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetCompanyDetails
      .addCase(GetCompanyDetails.pending, (state) => {
        state.authIsLoading = true;
        state.error = null;
      })
      .addCase(GetCompanyDetails.fulfilled, (state, action) => {
        state.authIsLoading = false;
        state.error = null;
        state.companyDetailsData = action.payload[0];
      })
      .addCase(GetCompanyDetails.rejected, (state, action) => {
        state.authIsLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetAddressDetails
      .addCase(GetAddressDetails.pending, (state) => {
        state.authIsLoading = true;
        state.error = null;
      })
      .addCase(GetAddressDetails.fulfilled, (state, action) => {
        state.authIsLoading = false;
        state.error = null;
        state.addressDetailsData = action.payload[0];
      })
      .addCase(GetAddressDetails.rejected, (state, action) => {
        state.authIsLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // getOtp
      .addCase(GetOtp.pending, (state) => {
        // state.authIsLoading = true;
        state.error = null;
      })
      .addCase(GetOtp.fulfilled, (state, action) => {
        // state.authIsLoading = false;
        state.error = null;
      })
      .addCase(GetOtp.rejected, (state, action) => {
        // state.authIsLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logout, setData } = authSlice.actions; // Export logout action
export default authSlice.reducer;
