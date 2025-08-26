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
