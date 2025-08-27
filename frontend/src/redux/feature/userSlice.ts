// store/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/property"; // adjust path if needed

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  page: number;
  total: number;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  page: 0,
  total: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess(
      state,
      action: PayloadAction<{ users: User[]; total: number; page: number }>
    ) {
      state.users = action.payload.users;
      state.loading = false;
      state.error = null;
      state.page = action.payload.page;
      state.total = action.payload.total;
    },
    fetchUsersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    removeUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
});

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUser,
  removeUser,
  updateUser,
} = userSlice.actions;

export default userSlice.reducer;
