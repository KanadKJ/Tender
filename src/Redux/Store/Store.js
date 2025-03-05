import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Slices/AuthSlice";
import CommonSlice from "../Slices/CommonSlice";
import tenderSlice from "../Slices/TenderSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    common: CommonSlice,
    tender: tenderSlice,
  },
});
export default store;
