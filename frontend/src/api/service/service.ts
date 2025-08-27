import { api } from "../api";

export const getServices = async () => {
  try {
    const response = await api.get("/services");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createService = async (data: any) => {
  try {
    const response = await api.post("/services", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateService = async (id: number, data: any) => {
  try {
    const response = await api.put(`/services/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteService = async (id: number) => {
  try {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const toggleServiceStatus = async (id: number, status: boolean) => {
  try {
    const response = await api.patch(`/services/${id}/toggle`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};
