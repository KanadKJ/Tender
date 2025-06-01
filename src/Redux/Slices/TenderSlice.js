import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ScrpApiTenders } from "../../Api/SCPAPI";
import { toast } from "react-toastify";
import { TMGetApi } from "../../Api/TMAPI";

const initialState = {
  tenderData: [],
  tenderIsLoading: false,
  tenderDetails: [],
  userSaverTemplates: [],
  paymentDetails: [],
  usersWishlist: [],
  tenderDataOfWishlist: [],
  documentURL: "",
  error: "",
};
export const GetDocumentURL = createAsyncThunk(
  "tender/GetDocumentURL",
  async ({ id, t, c }, { rejectWithValue }) => {
    let url;
    console.log(id, t, c);

    if (
      (t?.toLowerCase() === "pdf" ||
        t?.toLowerCase() === "xls" ||
        t?.toLowerCase() === "html") &&
      c === "default"
    )
      url = `/tenders/document_url/${id}/`;
    if (t?.toLowerCase() === "xls" && c === "converted")
      url = `/tenders/document_pdf_url/${id}/`;
    if (t === "3") url = `/tenders/export/?${id}`;
    try {
      const res = await ScrpApiTenders.get(`${url}`);
      return res.data?.url;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
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
let tenderAbortController;

export const GetTenderListWithFilters = createAsyncThunk(
  "tender/GetTenderListWithFilters",
  async (params, { rejectWithValue }) => {
    try {
      // Abort
      if (tenderAbortController) {
        tenderAbortController.abort();
      }
      tenderAbortController = new AbortController();
      const res = await ScrpApiTenders.get(`/tenders/?${params}`, {
        signal: tenderAbortController.signal,
      });

      return res.data;
    } catch (error) {
      if (error.name === "CanceledError" || error.name === "AbortError") {
        console.warn("Previous tender fetch request cancelled");
        return;
      }
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
export const InsertTemplate = createAsyncThunk(
  "tender/InsertTemplate",
  async (data, { rejectWithValue }) => {
    try {
      const res = await TMGetApi.post(`/InsertTemplate`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const GetTemplateDetails = createAsyncThunk(
  "tender/GetTemplateDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await TMGetApi.get(`/GetTemplateDetails?userid=${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const GetOrInsertTenderWishlist = createAsyncThunk(
  "tender/GetOrInsertTenderWishlist",
  async ({ id, userId, tenderId }, { rejectWithValue }) => {
    try {
      const res = await TMGetApi.get(
        `/GetOrInsertTenderWishlist?id=${id}&userId=${userId}&tenderId=${tenderId}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

//this is to get the meta data of wishlist from TM api
export const GetTenderWishlist = createAsyncThunk(
  "tender/GetTenderWishlist",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await TMGetApi.get(
        `/GetTenderWishlistByUser?userId=${userId}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// here we call the tenders with the uid of the tenders from the wishlist
export const GetTenderWishlistDetails = createAsyncThunk(
  "tender/GetTenderWishlistDetails",
  async (params, { rejectWithValue }) => {
    try {
      const res = await ScrpApiTenders.get(`/?uid=${params}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const GetPaymentDetails = createAsyncThunk(
  "tender/GetPaymentDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await TMGetApi.get(`/GetPaymentDetails?userId=${id}`);
      return res.data?.value;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const DeleteTemplate = createAsyncThunk(
  "tender/DeleteTemplate",
  async (id, { rejectWithValue }) => {
    try {
      const res = await TMGetApi.post(`/DeleteTemplate/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
const tenderSlice = createSlice({
  name: "tender",
  initialState,
  reducers: {
    cleanUpUserFilters: (state) => {
      state.userSaverTemplates = [];
    },
  },
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
        state.tenderData = action.payload;
        state.tenderIsLoading = false;
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
      })
      // InsertTemplate
      .addCase(InsertTemplate.pending, (state) => {
        state.tenderIsLoading = true;
        state.error = null;
      })
      .addCase(InsertTemplate.fulfilled, (state, action) => {
        state.tenderIsLoading = false;
        state.error = null;
        if (action.payload.message === "Template inserted successfully") {
          toast.success("Template added successfully");
        }
      })
      .addCase(InsertTemplate.rejected, (state, action) => {
        state.tenderIsLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetTemplateDetails
      .addCase(GetTemplateDetails.pending, (state) => {
        state.tenderIsLoading = true;
        state.error = null;
      })
      .addCase(GetTemplateDetails.fulfilled, (state, action) => {
        state.tenderIsLoading = false;
        state.error = null;
        state.userSaverTemplates = action.payload?.value;
      })
      .addCase(GetTemplateDetails.rejected, (state, action) => {
        state.tenderIsLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetOrInsertTenderWishlist
      .addCase(GetOrInsertTenderWishlist.pending, (state) => {
        // state.tenderIsLoading = true;
        state.error = null;
      })
      .addCase(GetOrInsertTenderWishlist.fulfilled, (state, action) => {
        state.tenderIsLoading = false;
        state.error = null;
      })
      .addCase(GetOrInsertTenderWishlist.rejected, (state, action) => {
        state.tenderIsLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // DeleteTemplate
      .addCase(DeleteTemplate.pending, (state) => {
        // state.tenderIsLoading = true;
        state.error = null;
      })
      .addCase(DeleteTemplate.fulfilled, (state, action) => {
        state.tenderIsLoading = false;
        state.error = null;
        if (action.payload.message === "Template deleted successfully") {
          toast.success("Template deleted successfully");
        }
      })
      .addCase(DeleteTemplate.rejected, (state, action) => {
        state.tenderIsLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetPaymentDetails
      .addCase(GetPaymentDetails.pending, (state) => {
        state.tenderIsLoading = true;
        state.error = null;
      })
      .addCase(GetPaymentDetails.fulfilled, (state, action) => {
        state.tenderIsLoading = false;
        state.error = null;
        state.paymentDetails = action.payload;
      })
      .addCase(GetPaymentDetails.rejected, (state, action) => {
        state.tenderIsLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetDocumentURL
      .addCase(GetDocumentURL.pending, (state) => {
        state.tenderIsLoading = true;
        state.error = null;
      })
      .addCase(GetDocumentURL.fulfilled, (state, action) => {
        state.tenderIsLoading = false;
        state.error = null;
        state.documentURL = action.payload;
      })
      .addCase(GetDocumentURL.rejected, (state, action) => {
        state.tenderIsLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetTenderWishlist
      .addCase(GetTenderWishlist.pending, (state) => {
        state.tenderIsLoading = true;
        state.error = null;
      })
      .addCase(GetTenderWishlist.fulfilled, (state, action) => {
        state.tenderIsLoading = false;
        state.error = null;
        state.usersWishlist = action.payload;
      })
      .addCase(GetTenderWishlist.rejected, (state, action) => {
        state.tenderIsLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // GetTenderWishlistDetails
      .addCase(GetTenderWishlistDetails.pending, (state) => {
        state.tenderIsLoading = true;
        state.error = null;
      })
      .addCase(GetTenderWishlistDetails.fulfilled, (state, action) => {
        state.tenderIsLoading = false;
        state.error = null;
        state.tenderDataOfWishlist = action.payload;
      })
      .addCase(GetTenderWishlistDetails.rejected, (state, action) => {
        state.tenderIsLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { cleanUpUserFilters } = tenderSlice.actions;
export default tenderSlice.reducer;
