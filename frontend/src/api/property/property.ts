import { api } from "../api";

interface GetPropertiesParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: "asc" | "desc";
}

export const getProperties = async (params: GetPropertiesParams = {}) => {
  try {
    const response = await api.get("/properties", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPropertiesByCategory = async (
  category: string,
  { page, limit }: GetPropertiesParams = {}
) => {
  try {
    const response = await api.get(`/properties/category/${category}`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get property by id 
export const getPropertyById = async (id: string) => {
  try {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getPropertiesByUserId = async (
  userId: number,
  { page, limit, search, sort }: GetPropertiesParams = {}
) => {
  console.log("id", userId);
  try {
    const response = await api.get(`/properties/users/${userId}`, {
      params: { page, limit, search, sort },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete property
export const deleteProperty = async (id: number) => {
  try {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update property
export const updateProperty = async (id: number, data: any) => {
  try {
    const response = await api.patch(`/properties/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//create property
export const createProperty = async (data: any) => {
  try {
    const response = await api.post("/properties", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
