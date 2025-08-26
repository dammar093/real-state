import createAPI from "./axiosConfig";

const api = createAPI();


// === auth api ====

export async function loginUser(data: any) {
  try {
    const response = await api.post("/auth/login", data);
    console.log(response.data.data)
    localStorage.setItem("token", response.data.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// === categories ===
export const createCategory = async (data: { name: string }) => {
  try {
    const response = await api.post("/categories", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const toggleCategoryStatus = async (id: number, isActive: boolean) => {
  try {
    const response = await api.patch(`/categories/${id}/toggle`, { isActive: !isActive });
    return response.data;
  } catch (error) {
    throw error;
  }
}
