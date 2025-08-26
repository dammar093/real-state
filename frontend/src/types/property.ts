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

export interface UserProfile {
  id: number;
  image: string; // profile image URL
}

export interface UserDetail {
  phoneNumber?: string;
  address?: string;
  profile?: UserProfile;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "USER";
  userDetail?: UserDetail;
}

export interface PropertyService {
  id: number;
  serviceId: number;
  propertyId: number;
  status: boolean;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  service: {
    id: number;
    name: string;
  };
}

export interface Property {
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
  images: PropertyImage[];
  services: PropertyService[];
  createdAt: string;
  updatedAt: string;
}
export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}
