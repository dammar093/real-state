import { Params } from "@/types/utils";
import { api } from "../api";



export const getProperties = async (params: Params = {}) => {
  try {
    const response = await api.get("/properties", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPropertiesByCategory = async (
  category: string,
  { page, limit }: Params = {}
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
  { page, limit, search }: Params = {}
) => {
  console.log("id", userId);
  try {
    const response = await api.get(`/properties/users/${userId}`, {
      params: { page, limit, search },
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
  console.log(data, "data");
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

//toggle property
export const togglePropertyStatus = async (id: number, status: boolean) => {
  try {
    const response = await api.patch(`/properties/status/${id}`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};


