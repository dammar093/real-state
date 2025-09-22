import { PropertyItem } from "./property";


interface Wishlist {
  id: number;
  userId: number;
  propertyId: number;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  property: PropertyItem;

}

export default Wishlist
