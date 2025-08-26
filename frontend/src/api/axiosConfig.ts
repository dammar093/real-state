import axios from "axios";

// Function to create axios instance with token from localStorage
const createAPI = () => {
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") as string;
  }

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

export default createAPI;
