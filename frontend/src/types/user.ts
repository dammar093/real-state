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
  profilePic?: string;
  facebook?: string;
  instagram?: string
  about?: string
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "USER";
  isVerified: boolean;
  createdAt?: string | Date | undefined | number;
  updatedAt?: string | Date | undefined | number;
  userDetail?: UserDetail;
}
