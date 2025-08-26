// store/slices/categorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "@/types/category";

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  page: number;
  total: number;
}

const initialState: CategoryState = {
  categories: [],
  page: 0,
  total: 0,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    fetchCategoriesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess(state, action: PayloadAction<{ categories: Category[]; total: number; page: number }>) {
      state.categories = action.payload.categories;
      state.loading = false;
      state.error = null;
      state.page = action.payload.page;
      state.total = action.payload.total;
    },
    fetchCategoriesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addCategory(state, action: PayloadAction<Category>) {
      state.categories.push(action.payload);
    },
    removeCategory(state, action: PayloadAction<number>) {
      state.categories = state.categories.filter(cat => cat.id !== action.payload);
    },
    updateCategory(state, action: PayloadAction<Category>) {
      const index = state.categories.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    }
  },
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  addCategory,
  removeCategory,
  updateCategory
} = categorySlice.actions;

export default categorySlice.reducer;
