// === Categories API ===

import { api } from "./api";

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
    const response = await api.patch(`/categories/${id}/toggle`, {
      isActive: !isActive,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update category
export const updateCategories = async (id: number, data: { name: string }) => {
  try {
    const response = await api.patch(`/categories/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete category
export const deleteCategories = async (id: number) => {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get category by ID
export const getCategoryById = async (id: number) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getActiveCategories = async () => {
  try {
    const response = await api.get("/categories/active");
    return response.data;
  } catch (error) {
    throw error;
  }
};