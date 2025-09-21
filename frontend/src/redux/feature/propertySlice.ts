import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PropertyItem } from "@/types/property";
import { getProperties, deleteProperty, togglePropertyStatus } from "@/api/property/property";
import { Meta, Params } from "@/types/utils";
import { message } from "antd";

// Fetch properties async thunk
export const fetchProperties = createAsyncThunk<
  { properties: PropertyItem[]; meta: Meta },
  Params,
  { rejectValue: string }
>("property/fetchProperties", async (params, { rejectWithValue }) => {
  try {
    const res = await getProperties(params);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch properties");
  }
});

//  Toggle property status async thunk
export const togglePropertyStatusById = createAsyncThunk<
  PropertyItem,
  { id: number, status: boolean },
  { rejectValue: string }
>("property/togglePropertyStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const res = await togglePropertyStatus(id, status);
    message.success("Property status toggled successfully");
    return res.data;
  } catch (err: any) {
    message.error(err.message || "Failed to toggle status");
    return rejectWithValue(err.message || "Failed to toggle status");
  }
});

// Delete property async thunk
export const deletePropertyById = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("property/deleteProperty", async (id, { rejectWithValue }) => {
  try {
    await deleteProperty(id);
    message.success("Property deleted successfully");
    return id;
  } catch (err: any) {
    message.error(err.message || "Failed to delete property");
    return rejectWithValue(err.message || "Failed to delete property");
  }
});

// Slice state
interface PropertyState {
  properties: PropertyItem[];
  loading: boolean;
  error: string | null;
  meta: {
    page: number;
    total: number;
    limit: number;
    pages?: number;
  };
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
  },
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.properties = action.payload.properties;
        state.meta = action.payload.meta;
        state.loading = false;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch properties";
        state.loading = false;
      })

      // Toggle
      .addCase(togglePropertyStatusById.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.properties.findIndex((p) => p.id === updated.id);
        if (index !== -1) {
          state.properties[index] = updated;
        }
      })
      .addCase(togglePropertyStatusById.rejected, (state, action) => {
        state.error = action.payload || "Failed to toggle status";
      })

      // Delete
      .addCase(deletePropertyById.fulfilled, (state, action) => {
        state.properties = state.properties.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePropertyById.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete property";
      });
  },
});

export default propertySlice.reducer;
