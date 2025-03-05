import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Utils/CommonUtils";
import { TMGetUserDetails } from "../../Api/TMAPI";
const initialState = {
  userData: [],
  authIsLoading: false,
  error: "",
};
export const GetUserDetails = createAsyncThunk(
  "auth",
  async (data, { rejectWithValue }) => {
    try {
      const response = await TMGetUserDetails.post(`/GetUserDetails`, data);
      if (response?.data?.value?.length === 0) {
        return rejectWithValue("Invalid Email or Password");
      }
      localStorage.setItem("user", JSON.stringify(response?.data?.value));
      return response.data.value;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,

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

// export const { userData } = authSlice.actions;
export default authSlice.reducer;
