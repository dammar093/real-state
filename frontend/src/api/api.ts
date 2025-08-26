import createAPI from "./axiosConfig";

const api = createAPI();

// === Auth API ===
export async function loginUser(data: any) {
  try {
    const response = await api.post("/auth/login", data);
    console.log(response.data.data);
    localStorage.setItem("token", response.data.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// === Categories API ===

// Create category
export const createCategory = async (data: { name: string }) => {
  try {
    const response = await api.post("/categories", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all categories
export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Toggle category status
export const toggleCategoryStatus = async (id: number, isActive: boolean) => {
  try {
    const response = await api.patch(`/categories/${id}/toggle`, { isActive: !isActive });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update category
export const updateCategory = async (id: number, data: { name: string }) => {
  try {
    const response = await api.patch(`/categories/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete category
export const deleteCategory = async (id: number) => {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
