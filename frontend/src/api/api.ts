import { Role } from "@/utils/utils";
import createAPI from "./axiosConfig";

export const api = createAPI();

// === Auth API ===

// Login
export async function loginUser(data: { email: string; password: string }) {
  try {
    const response = await api.post("/auth/login", data);
    localStorage.setItem("token", response.data.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Register (Sign Up)
export async function registerUser(data: { fullName: string; email: string; password: string, role: Role }) {
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

export const resetPassword = async (data: { email: string; password: string, otp: string }) => {
  return await api.post("/api/auth/reset-password", data);
};
export const getLoggedInUser = async (id: number) => {
  try {
    const response = await api.get(`/auth/${id}`);
    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};


// Update user details
export const updateUserDetails = async (data: any, id: number) => {
  const response = await api.patch(`/users/${id}`, data);
  return response.data;
};
