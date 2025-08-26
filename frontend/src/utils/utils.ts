import { jwtDecode } from "jwt-decode";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}


export interface DecodedToken {
  id: number;
  email: string;
  role: Role;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
