// store/slices/categorySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CategoryItem } from "@/types/category";
import { message } from "antd";
import { api, createCategories, deleteCategories, getCategories, updateCategories } from "@/api/api";

interface CategoryState {
  categories: CategoryItem[];
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

// ==================== Async Thunks ====================

// Fetch categories
export const fetchCategories = createAsyncThunk<
  { categories: CategoryItem[]; total: number; page: number },
  { page?: number; limit?: number; search?: string }
>("category/fetchCategories", async ({ page = 1, limit = 10, search = "" }, { rejectWithValue }) => {
  try {
    const response = await getCategories()
    return response.data; // { categories, total, page }
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Create category
export const createCategory = createAsyncThunk<CategoryItem, Partial<CategoryItem>>(
  "category/createCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createCategories(data as { name: string });
      message.success("Category created successfully");
      return response.data;
    } catch (error: any) {

      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update category
export const updateCategoryAsync = createAsyncThunk<CategoryItem, CategoryItem>(
  "category/updateCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateCategories(data.id, { name: data.name });
      message.success("Category updated successfully");
      return response.data;
    } catch (error: any) {
      message.error("Failed to update category");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Toggle category active/inactive
export const toggleCategory = createAsyncThunk<CategoryItem, { id: number; active: boolean }>(
  "category/toggleCategory",
  async ({ id, active }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/categories/${id}/toggle`, { active });
      message.success(`Category ${active ? "activated" : "deactivated"} successfully`);
      return response.data;
    } catch (error: any) {
      message.error("Failed to toggle category status");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete category
export const deleteCategory = createAsyncThunk<number, number>(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCategories(id);
      message.success("Category deleted successfully");
      return id;
    } catch (error: any) {
      message.error("Failed to delete category");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ==================== Slice ====================
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.page = action.payload.page;
        state.total = action.payload.total;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateCategoryAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.categories[index] = action.payload;
      })
      .addCase(updateCategoryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Toggle
      .addCase(toggleCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.categories[index] = action.payload;
      })
      .addCase(toggleCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
