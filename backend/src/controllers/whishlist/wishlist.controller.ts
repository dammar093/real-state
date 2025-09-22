import { Request, Response } from "express";
import AsyncHandler from "../../utils/asyncHandler";

import ApiError from "../../utils/errorHandler";
import { db } from "../../config/db";
import ApiResponse from "../../utils/apiRespons";

class WishListController extends AsyncHandler {
  // Create Wishlist
  async createWishlist(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      const { propertyId } = req.body;

      if (!userId) throw new ApiError(401, "Unauthorized");
      if (!propertyId || isNaN(Number(propertyId))) {
        throw new ApiError(400, "Invalid property ID");
      }

      const property = await db.properties.findFirst({
        where: { id: Number(propertyId), isDelete: false },
      });
      if (!property) throw new ApiError(404, "Property not found");

      const existing = await db.wishList.findFirst({
        where: {
          userId,
          propertyId: Number(propertyId),
          isDelete: false,
        },
      });

      if (existing) {
        throw new ApiError(409, "Property already in wishlist");
      }

      const wishlist = await db.wishList.create({
        data: { userId, propertyId: Number(propertyId) },
        include: {
          property: {
            include: {
              images: true,
              category: true,

            },
          },
        },
      });

      return res.status(201).json(
        new ApiResponse(201, wishlist, "Property added to wishlist")
      );
    } catch (error) {
      throw new ApiError(500, "Internal server error");
    }
  }

  // Delete (Soft) Wishlist
  async deleteWishlist(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      const { id } = req.params;

      if (!userId) throw new ApiError(401, "Unauthorized");
      if (!id || isNaN(Number(id))) {
        throw new ApiError(400, "Invalid wishlist ID");
      }

      const wishlist = await db.wishList.findFirst({
        where: {
          id: Number(id),
          userId,
          isDelete: false,
        },
      });

      if (!wishlist) {
        throw new ApiError(404, "Wishlist not found");
      }

      const updated = await db.wishList.update({
        where: { id: Number(id) },
        data: { isDelete: true },
        include: {
          property: {
            include: {
              images: true,
              category: true,

            },
          },
        },
      });

      return res
        .status(200)
        .json(new ApiResponse(200, updated, "Wishlist removed successfully"));
    } catch (error) {
      throw new ApiError(500, "Internal server error");
    }
  }

  // Get Wishlist
  async getWishlist(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      if (!userId) throw new ApiError(401, "Unauthorized");

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        db.wishList.findMany({
          where: {
            userId,
            isDelete: false,
            property: {
              isDelete: false,
            },
          },
          skip,
          take: limit,
          include: {
            property: {
              include: {
                images: true,
                category: true,
              },
            },
          },
        }),
        db.wishList.count({
          where: {
            userId,
            isDelete: false,
            property: {
              isDelete: false,
            },
          },
        }),
      ]);

      return res.status(200).json(
        new ApiResponse(
          200,
          {
            total,
            page,
            limit,
            data,
          },
          "Wishlist fetched successfully"
        )
      );
    } catch (error) {
      throw new ApiError(500, "Internal server error");
    }
  }
}

export default new WishListController();
