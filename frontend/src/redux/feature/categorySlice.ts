// store/slices/categorySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CategoryItem } from "@/types/category";
import { message } from "antd";
import { createCategory, deleteCategories, getCategories, getCategoryById, toggleCategoryStatus, updateCategories } from "@/api/category";

interface CategoryState {
  categories: CategoryItem[];
  loading: boolean;
  error: string | null;
  category: CategoryItem | null;
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
};

// ==================== Async Thunks ====================

// Fetch categories
export const fetchCategories = createAsyncThunk<
  { categories: CategoryItem[]; total: number; page: number },
  void
>("category/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await getCategories()
    return response.data; // { categories, total, page }
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Create category
export const createCategoryThunk = createAsyncThunk<
  CategoryItem,
  { name: string } // argument type
>(
  "category/createCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createCategory(data);
      message.success("Category created successfully");
      return response.data;
    } catch (error: any) {
      message.error("Failed to create category");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateCategoryThunk = createAsyncThunk<CategoryItem, { id: number; name: string }>(
  "category/updateCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateCategories(data.id, { name: data.name });
      console.log(response, "sfsdfsf")
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// Toggle category active/inactive
export const toggleCategory = createAsyncThunk<CategoryItem, { id: number; active: boolean }>(
  "category/toggleCategory",
  async ({ id, active }, { rejectWithValue }) => {
    try {
      const response = await toggleCategoryStatus(id, active);
      message.success(`Category ${active ? "activated" : "deactivated"} successfully`);
      return response.data;
    } catch (error: any) {
      message.error("Failed to toggle category status");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

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
//get category by id
export const getCategoryByIdThunk = createAsyncThunk<CategoryItem, number>(
  "category/getCategoryById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getCategoryById(id);
      // console.log("sdfsdf", response)
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
      // Fetch
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;

      })
      .addCase(fetchCategories.rejected, (state, action) => {
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
        const index = state.categories.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.categories[index] = action.payload;
      })
      .addCase(updateCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Toggle
      .addCase(toggleCategory.pending, (state) => {
        // state.loading = true;
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
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    //get by id
    builder
      .addCase(getCategoryByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryByIdThunk.fulfilled, (state, action: PayloadAction<CategoryItem>) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getCategoryByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
