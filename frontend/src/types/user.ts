export interface Image {
  id: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDetail {
  id: number;
  phoneNumber?: string;
  address?: string;
  profile?: Image;
  about?: string
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "USER";
  createdAt?: Date;
  updatedAt?: Date;
  userDetail?: UserDetail;
}
