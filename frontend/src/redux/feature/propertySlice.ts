import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Property } from "@/types/property";

interface PropertyState {
  properties: Property[];
  loading: boolean;
  error: string | null;
  page: number;
  total: number;
  limit: number;
  search: string;
  sort?: "asc" | "desc";
}

const initialState: PropertyState = {
  properties: [],
  loading: false,
  error: null,
  page: 1,
  total: 0,
  limit: 10,
  search: "",
  sort: undefined,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setProperties(state, action: PayloadAction<Property[]>) {
      state.properties = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setSort(state, action: PayloadAction<"asc" | "desc" | undefined>) {
      state.sort = action.payload;
    },
  },
});

export const {
  setProperties,
  setLoading,
  setError,
  setPage,
  setTotal,
  setLimit,
  setSearch,
  setSort,
} = propertySlice.actions;

export default propertySlice.reducer;
