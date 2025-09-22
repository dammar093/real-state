import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PropertyItem } from "@/types/property";
import {
  getProperties,
  deleteProperty,
  togglePropertyStatus,
  getPropertiesByUserId,
  createProperty,
  updateProperty,
  getPropertyById,
  getActiveProperties, // <- make sure this API exists
} from "@/api/property";
import { Meta, Params } from "@/types/utils";
import { message } from "antd";

// ----------------- Async Thunks -----------------

// Fetch all properties
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
// Fetch all properties
export const fetchActiveProperties = createAsyncThunk<
  { properties: PropertyItem[]; meta: Meta },
  Params,
  { rejectValue: string }
>("property/fetchActiveProperties", async (params, { rejectWithValue }) => {
  try {
    const res = await getActiveProperties(params);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch properties");
  }
});

// Fetch properties by user ID
export const fetchPropertiesUserId = createAsyncThunk<
  { properties: PropertyItem[]; meta: Meta },
  { id: number; params: Params },
  { rejectValue: string }
>("property/fetchPropertiesUserId", async ({ id, params }, { rejectWithValue }) => {
  try {
    const res = await getPropertiesByUserId(id, params);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch user properties");
  }
});

// Get property by ID
export const getPropertyByIdThunk = createAsyncThunk<
  PropertyItem,
  number,
  { rejectValue: string }
>("property/getPropertyById", async (id, { rejectWithValue }) => {
  try {
    const res = await getPropertyById(id);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch property");
  }
});

// Toggle property status
export const togglePropertyStatusById = createAsyncThunk<
  PropertyItem,
  { id: number; status: boolean },
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

// Delete property
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

// Create property
export const createPropertyThunk = createAsyncThunk<
  PropertyItem,
  Partial<PropertyItem>,
  { rejectValue: string }
>("property/createProperty", async (data, { rejectWithValue }) => {
  try {
    const res = await createProperty(data);
    message.success("Property created successfully");
    return res.data;
  } catch (err: any) {
    message.error(err.message || "Failed to create property");
    return rejectWithValue(err.message || "Failed to create property");
  }
});

// Update property
export const updatePropertyThunk = createAsyncThunk<
  PropertyItem,
  { id: number; data: Partial<PropertyItem> },
  { rejectValue: string }
>("property/updateProperty", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await updateProperty(id, data);
    message.success("Property updated successfully");
    return res.data;
  } catch (err: any) {
    message.error(err.message || "Failed to update property");
    return rejectWithValue(err.message || "Failed to update property");
  }
});

// ----------------- Slice State -----------------

interface PropertyState {
  all: {
    properties: PropertyItem[];
    meta: Meta;
  };
  user: {
    properties: PropertyItem[];
    meta: Meta;
  };
  active: {
    properties: PropertyItem[];
    meta: Meta;
  };
  singleProperty: PropertyItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  all: {
    properties: [],
    meta: { page: 1, total: 0, limit: 10, pages: 0 },
  },
  user: {
    properties: [],
    meta: { page: 1, total: 0, limit: 10, pages: 0 },
  },
  active: {
    properties: [],
    meta: { page: 1, total: 0, limit: 10, pages: 0 },
  },
  singleProperty: null,
  loading: false,
  error: null,
};

// ----------------- Slice -----------------

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- Fetch All ---
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.all.properties = action.payload.properties;
        state.all.meta = action.payload.meta;
        state.loading = false;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch properties";
        state.loading = false;
      });
    // --- Fetch active ---
    builder
      .addCase(fetchActiveProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveProperties.fulfilled, (state, action) => {
        state.active.properties = action.payload.properties;
        state.active.meta = action.payload.meta;
        state.loading = false;
      })
      .addCase(fetchActiveProperties.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch properties";
        state.loading = false;
      });

    // --- Fetch by User ---
    builder
      .addCase(fetchPropertiesUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertiesUserId.fulfilled, (state, action) => {
        state.user.properties = action.payload.properties;
        state.user.meta = action.payload.meta;
        state.loading = false;
      })
      .addCase(fetchPropertiesUserId.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch user properties";
        state.loading = false;
      });

    // --- Get by ID ---
    builder
      .addCase(getPropertyByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPropertyByIdThunk.fulfilled, (state, action) => {
        state.singleProperty = action.payload;
        state.loading = false;
      })
      .addCase(getPropertyByIdThunk.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch property";
        state.loading = false;
      });

    // --- Toggle ---
    builder
      .addCase(togglePropertyStatusById.fulfilled, (state, action) => {
        const updated = action.payload;

        const indexAll = state.all.properties.findIndex((p) => p.id === updated.id);
        if (indexAll !== -1) state.all.properties[indexAll] = updated;

        const indexUser = state.user.properties.findIndex((p) => p.id === updated.id);
        if (indexUser !== -1) state.user.properties[indexUser] = updated;
      })
      .addCase(togglePropertyStatusById.rejected, (state, action) => {
        state.error = action.payload || "Failed to toggle status";
      });

    // --- Delete ---
    builder
      .addCase(deletePropertyById.fulfilled, (state, action) => {
        state.all.properties = state.all.properties.filter((p) => p.id !== action.payload);
        state.user.properties = state.user.properties.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePropertyById.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete property";
      });

    // --- Create ---
    builder
      .addCase(createPropertyThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(createPropertyThunk.fulfilled, (state, action) => {
        state.all.properties.unshift(action.payload);
        state.user.properties.unshift(action.payload);
      })
      .addCase(createPropertyThunk.rejected, (state, action) => {
        state.error = action.payload || "Failed to create property";
      });

    // --- Update ---
    builder
      .addCase(updatePropertyThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(updatePropertyThunk.fulfilled, (state, action) => {
        const updated = action.payload;

        const indexAll = state.all.properties.findIndex((p) => p.id === updated.id);
        if (indexAll !== -1) state.all.properties[indexAll] = updated;

        const indexUser = state.user.properties.findIndex((p) => p.id === updated.id);
        if (indexUser !== -1) state.user.properties[indexUser] = updated;

        if (state.singleProperty?.id === updated.id) {
          state.singleProperty = updated;
        }
      })
      .addCase(updatePropertyThunk.rejected, (state, action) => {
        state.error = action.payload || "Failed to update property";
      });
  },
});

export default propertySlice.reducer;
