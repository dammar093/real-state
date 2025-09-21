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


export const getTimeSince = (dateString?: Date) => {
  if (!dateString) return "Unknown";

  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime(); // difference in milliseconds

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return `${seconds} seconds`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} days`;

  const months = Math.floor(days / 30); // approximate
  if (months < 12) return `${months} months`;

  const years = Math.floor(days / 365); // approximate
  return `${years} years`;
};

export const dateFormatter = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}