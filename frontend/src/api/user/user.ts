import { api } from "../api";


export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    console.log("sdnfsd,m.")
    return response.data;
  } catch (error) {
    throw error;
  }
};
