import { User } from "./user";

// Images Interface
export interface Image {
  id: number;
  image: string;
  serviceId?: number | null;
  propertyId?: number | null;
  userDetailId?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

// Property Interface
export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  description: string;
  map: string;
  userId: number;
  type: "SELL" | "RENT";
  status: boolean;
  isDelete: boolean;
  isHotel: boolean;
  duration: number;
  durationType: "NIGHT" | "DAY" | "MONTH" | "YEAR" | "LIFE_TIME";
  createdAt: Date;
  updatedAt: Date;
}

// Service Interface
export interface Service {
  id: number;
  name: string;
  image?: Image | null;
  userId: number;
  user: User;
  status: boolean;
  isDelete: boolean;
  properties: PropertyService[]; // join table
  createdAt: Date;
  updatedAt: Date;
}

// Unified PropertyService Interface
export interface PropertyService {
  id: number;
  propertyId?: number;
  serviceId?: number;
  status: boolean;
  isDelete: boolean;
  property?: Property;
  service?: Service;
  createdAt: Date;
  updatedAt: Date;
}
