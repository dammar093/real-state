// propertySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryProperties {
  properties: any[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  error: string | null;
}

interface PropertyState {
  propertiesByCategory: Record<string, CategoryProperties>;
}

const initialState: PropertyState = {
  propertiesByCategory: {},
};

const propertyCategorySlice = createSlice({
  name: "propertyCategory",
  initialState,
  reducers: {
    setCategoryLoading: (state, action: PayloadAction<{ category: string; loading: boolean }>) => {
      const { category, loading } = action.payload;
      if (!state.propertiesByCategory[category]) {
        state.propertiesByCategory[category] = {
          properties: [],
          total: 0,
          page: 1,
          limit: 10,
          loading,
          error: null,
        };
      } else {
        state.propertiesByCategory[category].loading = loading;
      }
    },
    setCategoryProperties: (
      state,
      action: PayloadAction<{ category: string; data: CategoryProperties }>
    ) => {
      const { category, data } = action.payload;
      state.propertiesByCategory[category] = data;
    },
    setCategoryError: (state, action: PayloadAction<{ category: string; error: string }>) => {
      const { category, error } = action.payload;
      if (!state.propertiesByCategory[category]) {
        state.propertiesByCategory[category] = {
          properties: [],
          total: 0,
          page: 1,
          limit: 10,
          loading: false,
          error,
        };
      } else {
        state.propertiesByCategory[category].loading = false;
        state.propertiesByCategory[category].error = error;
      }
    },
  },
});

export const { setCategoryLoading, setCategoryProperties, setCategoryError } = propertyCategorySlice.actions;
export default propertyCategorySlice.reducer;