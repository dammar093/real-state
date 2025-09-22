// store/slices/categorySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CategoryItem } from "@/types/category";
import { message } from "antd";
import {
  createCategory,
  deleteCategories,
  getCategories,
  getCategoryById,
  toggleCategoryStatus,
  updateCategories,
  getActiveCategories,
} from "@/api/category";
import { Meta } from "@/types/utils";

// ==================== State ====================
interface CategoryState {
  categories: CategoryItem[];
  activeCategories: CategoryItem[];
  loading: boolean;
  error: string | null;
  category: CategoryItem | null;
  meta: Meta;
}

const initialState: CategoryState = {
  categories: [],
  activeCategories: [],
  category: null,
  loading: false,
  error: null,
  meta: {
    total: 0,
    limit: 10,
    page: 1,
    pages: 1,
  },
};

// ==================== Async Thunks ====================

// Fetch all categories (with pagination/search)
export const fetchCategories = createAsyncThunk<
  { categories: CategoryItem[]; total: number; page: number },
  void
>("category/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await getCategories();
    return response.data; // { categories, total, page }
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Fetch only active categories
export const fetchActiveCategories = createAsyncThunk<
  { categories: CategoryItem[] },
  void
>("category/fetchActiveCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await getActiveCategories();
    console.log("res", response)
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Create category
export const createCategoryThunk = createAsyncThunk<
  CategoryItem,
  { name: string }
>("category/createCategory", async (data, { rejectWithValue }) => {
  try {
    const response = await createCategory(data);
    message.success("Category created successfully");
    return response.data;
  } catch (error: any) {
    message.error("Failed to create category");
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Update category
export const updateCategoryThunk = createAsyncThunk<
  CategoryItem,
  { id: number; name: string }
>("category/updateCategory", async (data, { rejectWithValue }) => {
  try {
    const response = await updateCategories(data.id, { name: data.name });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Toggle category active/inactive
export const toggleCategory = createAsyncThunk<
  CategoryItem,
  { id: number; active: boolean }
>("category/toggleCategory", async ({ id, active }, { rejectWithValue }) => {
  try {
    const response = await toggleCategoryStatus(id, active);
    message.success(
      `Category ${active ? "activated" : "deactivated"} successfully`
    );
    return response.data;
  } catch (error: any) {
    message.error("Failed to toggle category status");
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Delete category
export const deleteCategoryThunk = createAsyncThunk<number, number>(
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

// Get category by ID
export const getCategoryByIdThunk = createAsyncThunk<CategoryItem, number>(
  "category/getCategoryById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getCategoryById(id);
      return response.data;
    } catch (error: any) {
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
      // Fetch all
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        // state.meta = action.payload?
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch active
      .addCase(fetchActiveCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.activeCategories = action.payload.categories;
      })
      .addCase(fetchActiveCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create
      .addCase(createCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) state.categories[index] = action.payload;
      })
      .addCase(updateCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Toggle
      .addCase(toggleCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) state.categories[index] = action.payload;
      })
      .addCase(toggleCategory.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get by ID
      .addCase(getCategoryByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCategoryByIdThunk.fulfilled,
        (state, action: PayloadAction<CategoryItem>) => {
          state.loading = false;
          state.category = action.payload;
        }
      )
      .addCase(getCategoryByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
