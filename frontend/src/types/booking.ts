import { PropertyItem } from "./property";

export interface BookingItem {
  id: number;
  paymentId: string;
  amount: number;
  paymentMethod: "ESEWA" | "KHALTI" | "STRIPE" | "PAYPAL" | "CASH"; // add methods as needed
  status: "PENDING" | "SUCCESS" | "FAILED"; // enum-like string types
  userId: number;
  propertyId: number;
  property: PropertyItem;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}