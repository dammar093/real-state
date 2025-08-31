import createAPI from "./axiosConfig";

export const api = createAPI();

// === Auth API ===

// Login
export async function loginUser(data: { email: string; password: string }) {
  try {
    const response = await api.post("/auth/login", data);
    console.log(response.data.data);
    localStorage.setItem("token", response.data.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Register (Sign Up)
export async function registerUser(data: { fullName: string; email: string; password: string }) {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Verify OTP
export async function verifyOtp(data: { email: string; otp: string }) {
  try {
    const response = await api.post("/auth/verify-otp", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Resend OTP
export async function resendOtp(data: { email: string }) {
  try {
    const response = await api.post("/auth/send-otp", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const getLoggedInUser = async (id: number) => {
  try {
    const response = await api.get(`/auth/${id}`);
    console.log(response.data, "response")
    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};
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
    const response = await api.patch(`/categories/${id}/toggle`, {
      isActive: !isActive,
    });
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
