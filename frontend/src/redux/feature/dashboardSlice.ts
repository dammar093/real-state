import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  totalProperty: number;
  totalBooking: number;
  totalEarnings: number;
}

const initialState: DashboardState = {
  totalProperty: 0,
  totalBooking: 0,
  totalEarnings: 0,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardStats: (
      state,
      action: PayloadAction<Partial<DashboardState>>
    ) => {
      state.totalProperty = action.payload.totalProperty ?? state.totalProperty;
      state.totalBooking = action.payload.totalBooking ?? state.totalBooking;
      state.totalEarnings = action.payload.totalEarnings ?? state.totalEarnings;
    },
    resetDashboardStats: (state) => {
      state.totalProperty = 0;
      state.totalBooking = 0;
      state.totalEarnings = 0;
    },
  },
});

export const { setDashboardStats, resetDashboardStats } = dashboardSlice.actions;
export default dashboardSlice.reducer;
