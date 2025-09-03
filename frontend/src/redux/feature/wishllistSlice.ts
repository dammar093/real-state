// store/slices/categorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Wishlist from "@/types/wishlist";

interface WishlistState {
  wishlist: Wishlist[];
}

const initialState: WishlistState = {
  wishlist: [],

};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist(state, action) {
      state.wishlist = action.payload
    },
    addWishlist(state, action: PayloadAction<Wishlist>) {
      const existing = state.wishlist?.find(item => item?.property.id === action.payload?.property?.id)
      if (existing) return
      state.wishlist.push(action.payload);
    },
    removeWishlist(state, action: PayloadAction<number>) {
      state.wishlist = state.wishlist.filter(cat => cat.id !== action.payload);
    },

  },
});

export const {
  setWishlist,
  addWishlist,
  removeWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
