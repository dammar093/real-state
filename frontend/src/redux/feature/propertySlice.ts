import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PropertyItem } from "@/types/property";
import { getProperties } from "@/api/property/property";
import { Meta, Params } from "@/types/utils";

// Fetch properties async thunk
export const fetchProperties = createAsyncThunk<
  { properties: PropertyItem[]; meta: Meta },
  Params,
  { rejectValue: string }
>("property/fetchProperties", async (params, { rejectWithValue }) => {
  try {
    const res = await getProperties(params);
    console.log("res", res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch properties");
  }
});

interface PropertyState {
  properties: PropertyItem[];
  loading: boolean;
  error: string | null;
  meta: {
    page: number;
    total: number;
    limit: number;
    pages?: number;
  }
}

const initialState: PropertyState = {
  properties: [],
  loading: false,
  error: null,
  meta: {
    page: 1,
    total: 0,
    limit: 10,
    pages: 0,
  }
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProperties.fulfilled,
        (state, action: PayloadAction<{ properties: PropertyItem[]; meta: Meta }>) => {
          state.properties = action.payload.properties;
          state.meta = action.payload.meta;
          state.loading = false;
        }
      )
      .addCase(fetchProperties.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch properties";
        state.loading = false;
      });
  },
});

export default propertySlice.reducer;
