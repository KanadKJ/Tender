import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TMGetUserDetails } from "../../Api/TMAPI";

const initialState = {
  userData: null, // Should be an object, not an array
  authIsLoading: false,
  error: null, // Consistent with rejection
};

export const GetUserDetails = createAsyncThunk(
  "auth/GetUserDetails", // Corrected action type
  async (data, { rejectWithValue }) => {
    try {
      const response = await TMGetUserDetails.post(`/GetUserDetails`, data);

      if (!response?.data?.value?.length) {
        return rejectWithValue("Invalid Email or Password");
      }

      const user = response.data.value[0]; // Store only the user object
      localStorage.setItem("user", JSON.stringify(user));

      console.log(user);
      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
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
    },
    setData: (state, action) => {
      state.userData = action.payload;
      console.log(action.payload);
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
        state.error = null;
      })
      .addCase(GetUserDetails.rejected, (state, action) => {
        state.authIsLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logout, setData } = authSlice.actions; // Export logout action
export default authSlice.reducer;
