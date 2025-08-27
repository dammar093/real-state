import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PropertyService } from "@/types/property";

interface ServiceState {
  services: PropertyService[];
  loading: boolean;
  error: string | null;
  page: number;
  total: number;
}

const initialState: ServiceState = {
  services: [],
  loading: false,
  error: null,
  page: 1,
  total: 0,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    fetchServicesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchServicesSuccess(
      state,
      action: PayloadAction<{ services: PropertyService[]; total: number; page: number }>
    ) {
      state.services = action.payload.services;
      state.loading = false;
      state.error = null;
      state.total = action.payload.total;
      state.page = action.payload.page;
    },
    fetchServicesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addService(state, action: PayloadAction<PropertyService>) {
      state.services.push(action.payload);
    },
    updateService(state, action: PayloadAction<PropertyService>) {
      const index = state.services.findIndex(s => s.id === action.payload.id);
      if (index !== -1) state.services[index] = action.payload;
    },
    removeService(state, action: PayloadAction<number>) {
      state.services = state.services.filter(s => s.id !== action.payload);
    },
  },
});

export const {
  fetchServicesStart,
  fetchServicesSuccess,
  fetchServicesFailure,
  addService,
  updateService,
  removeService,
} = serviceSlice.actions;

export default serviceSlice.reducer;
