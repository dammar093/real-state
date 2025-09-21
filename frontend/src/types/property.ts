import { User } from "./user";

export interface PropertyImage {
  id: number;
  image: string;
}

export interface PropertyCategory {
  id: number;
  name: string;
  isActive: boolean;
  isDelete: boolean;
}

export interface PropertyItem {
  id: number;
  title: string;
  price: number;
  location: string;
  description: string;
  map: string;
  userId: number;
  user?: User;
  categoryId: number;
  category?: PropertyCategory;
  type: "SELL" | "RENT";
  status: boolean;
  isDelete: boolean;
  isHotel: boolean;
  duration: number;
  durationType: "NIGHT" | "DAY" | "MONTH" | "YEAR" | "LIFE_TIME";
  images: PropertyImage[]; // Array of property images
  createdAt: string;
  updatedAt: string;
  Services: string[]
}
