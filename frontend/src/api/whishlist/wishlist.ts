import { api } from "../api";

class Wishlist {
  async createWishlist(propertyId: number) {
    try {
      const res = await api.post("/wishlist", { propertyId })
      return res.data

    } catch (error) {
      throw error
    }
  }
  async getWishlist() {
    try {
      const res = await api.get("/wishlist")
      return res.data

    } catch (error) {
      throw error
    }
  }
}

export default new Wishlist()
