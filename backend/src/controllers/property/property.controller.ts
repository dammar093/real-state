import { Request, Response } from "express";
import AsyncHandler from "../../utils/asyncHandler";
import { db } from "../../config/db";
import ApiError from "../../utils/errorHandler";
import ApiResponse from "../../utils/apiRespons";
import { uploadImage } from "../../utils/cloudinary";


class PropertyController extends AsyncHandler {
  // Create property - Admin or Super Admin only
  async createProperty(req: Request, res: Response): Promise<Response> {
    try {
      const { user } = req as any;
      if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
        throw new ApiError(403, "Access denied");
      }

      const {
        title,
        price,
        location,
        description,
        latitude,
        longitude,
        categoryId,
        serviceIds,
        duration,
        durationType,
        services
      } = req.body;
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        throw new ApiError(400, "At least one property image is required");
      }
      // console.log(req.body)
      // Validate required fields
      if (!title || !price || !location || !categoryId || !duration || !durationType || !description || !longitude || !longitude) {
        throw new ApiError(400, "Missing required fields");
      }

      // Ensure serviceIds is an array
      let serviceData = undefined;
      if (serviceIds && Array.isArray(serviceIds)) {
        serviceData = {
          create: serviceIds.map((sid: string | number) => ({
            serviceId: Number(sid),
          })),
        };
      }

      // Create the property
      const property = await db.properties.create({
        data: {
          title,
          price: Number(price),
          location,
          description,
          latitude: Number(latitude),
          longitude: Number(longitude),
          categoryId: Number(categoryId),
          duration: parseInt(duration),
          durationType,
          userId: user.id,
          ...(serviceData && { services: serviceData }),
          Services: services
        },
      });
      // Upload and link all images
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const imageUrl = await uploadImage(file.path);
          return db.images.create({
            data: {
              image: imageUrl,
              propertyId: property.id,
            },
          });
        })
      );
      const updatedProperty = await db.properties.findUnique({
        where: {
          id: property?.id,
        },
        include: {
          images: true, // 👈 includes related images
          category: true, // optional: include category if needed
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
        },
      });

      return res
        .status(201)
        .json(new ApiResponse(201, updatedProperty, "Property created successfully"));

    } catch (error) {
      console.error(error);
      throw new ApiError(500, "Internal server error");
    }
  }



  // Edit property - No image update
  async editProperty(req: Request, res: Response): Promise<Response> {
    console.log(req.body, "shjdfbskfnl")
    try {
      const { id } = req.params;
      let {
        title,
        price,
        location,
        description,
        latitude,
        longitude,
        duration,
        categoryId,
        Services,
        durationType,
      } = req.body;

      // find existing property
      const existing = await db.properties.findFirst({
        where: { id: +id, isDelete: false },
      });
      if (!existing) throw new ApiError(404, "Property not found");


      // update property
      const updatedProperty = await db.properties.update({
        where: { id: +id },
        data: {
          title,
          price,
          location,
          description,
          latitude: Number(latitude),
          longitude: Number(longitude),
          categoryId,
          duration,
          durationType,
          Services,
        },
        include: {
          category: true,
          user: true,
          images: true,
        },
      });


      return res
        .status(200)
        .json(new ApiResponse(200, updatedProperty, "Property updated successfully"));
    } catch (error) {
      console.error("Update property error:", error); // logs real error
      throw new ApiError(500, "Internal server error");
    }
  }



  // Update only property status
  async updatePropertyStatus(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const property = await db.properties.update({
        where: { id: +id },
        data: { status },
        include: { images: true, category: true, user: true },

      });

      return res.status(200).json(new ApiResponse(200, property, "Propety status updated successfully"));
    } catch (error) {
      throw new ApiError(500, "Internal server error");
    }
  }

  // Soft delete property
  async deleteProperty(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const property = await db.properties.update({
        where: { id: +id },
        data: { isDelete: true },
      });

      return res.status(200).json(new ApiResponse(200, property, "Property deleted successfully"));
    } catch (error) {
      throw new ApiError(500, "Internal server error");
    }
  }

  // Get all property with search, pagination, and optional price sorting
  async getAllProperty(req: Request, res: Response): Promise<Response> {
    try {
      const {
        page = 1,
        limit = 10,
        search = "",
        sort, // 'asc' | 'desc'
      } = req.query;

      const skip = (Number(page) - 1) * Number(limit);

      const properties = await db.properties.findMany({
        where: {
          isDelete: false,
          OR: [
            { location: { contains: String(search), mode: "insensitive" } },
            { title: { contains: String(search), mode: "insensitive" } },

          ],
        },
        include: {
          category: true,
          images: true,
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              role: true,
              userDetail: {
                select: {
                  phoneNumber: true,
                  address: true,
                  profile: {
                    select: {
                      id: true,
                      image: true, // profile image URL
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: sort
          ? {
            price: sort === "asc" ? "asc" : "desc",
          }
          : undefined,
        skip,
        take: Number(limit),
      });

      const total = await db.properties.count({
        where: {
          isDelete: false,
          status: true,
          OR: [
            { location: { contains: String(search), mode: "insensitive" } },
            { title: { contains: String(search), mode: "insensitive" } },
          ],
        },
      });

      return res.status(200).json(
        new ApiResponse(
          200,
          {
            properties,
            pagination: {
              total,
              page: Number(page),
              limit: Number(limit),
              pages: Math.ceil(total / Number(limit)),
            },
          },
          "Properties fetched successfully"
        )
      );
    } catch (error) {
      console.error(error);
      throw new ApiError(500, "Internal server error");
    }
  }
  // Get all property with search, pagination, and optional price sorting
  async getActiveProperties(req: Request, res: Response): Promise<Response> {
    try {
      const {
        page = 1,
        limit = 10,
        search = "",
        sort, // 'asc' | 'desc'
      } = req.query;

      const skip = (Number(page) - 1) * Number(limit);

      const properties = await db.properties.findMany({
        where: {
          isDelete: false,
          status: true,
          OR: [
            { location: { contains: String(search), mode: "insensitive" } },
            { title: { contains: String(search), mode: "insensitive" } },

          ],
        },
        include: {
          category: true,
          images: true,
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              role: true,
              userDetail: {
                select: {
                  phoneNumber: true,
                  address: true,
                  profile: {
                    select: {
                      id: true,
                      image: true, // profile image URL
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: sort
          ? {
            price: sort === "asc" ? "asc" : "desc",
          }
          : undefined,
        skip,
        take: Number(limit),
      });

      const total = await db.properties.count({
        where: {
          isDelete: false,
          status: true,
          OR: [
            { location: { contains: String(search), mode: "insensitive" } },
            { title: { contains: String(search), mode: "insensitive" } },
          ],
        },
      });

      return res.status(200).json(
        new ApiResponse(
          200,
          {
            properties,
            pagination: {
              total,
              page: Number(page),
              limit: Number(limit),
              pages: Math.ceil(total / Number(limit)),
            },
          },
          "Properties fetched successfully"
        )
      );
    } catch (error) {
      console.error(error);
      throw new ApiError(500, "Internal server error");
    }
  }
  // Get properties by category with search, pagination, and optional price sorting
  // propertyController.ts
  async getPropertyByCategory(req: Request, res: Response): Promise<Response> {
    try {
      const { page = 1, limit = 10, search = "", sort } = req.query;
      const { category } = req.params;

      if (!category) throw new ApiError(400, "Category is required");
      const skip = (Number(page) - 1) * Number(limit);

      const properties = await db.properties.findMany({
        where: {
          isDelete: false,
          status: true,
          category: {
            name: { contains: String(category), mode: "insensitive" },
          },
          OR: [
            { location: { contains: String(search), mode: "insensitive" } },
            { title: { contains: String(search), mode: "insensitive" } },

          ],
        },
        include: {
          category: true,
          images: true,
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              role: true,
              userDetail: {
                select: {
                  phoneNumber: true,
                  address: true,
                  profile: { select: { id: true, image: true } },
                },
              },
            },
          },
        },
        orderBy: sort ? { price: sort === "asc" ? "asc" : "desc" } : undefined,
        skip,
        take: Number(limit),
      });

      const total = await db.properties.count({
        where: {
          isDelete: false,
          status: true,
          category: {
            name: { contains: String(category), mode: "insensitive" },
          },
          OR: [
            { location: { contains: String(search), mode: "insensitive" } },
            { title: { contains: String(search), mode: "insensitive" } },
          ],
        },
      });

      return res.status(200).json(
        new ApiResponse(
          200,
          {
            properties,
            pagination: {
              total,
              page: Number(page),
              limit: Number(limit),
              pages: Math.ceil(total / Number(limit)),
            },
          },
          "Properties fetched successfully by category"
        )
      );
    } catch (error) {
      console.error(error);
      throw new ApiError(500, "Internal server error");
    }
  }
  async getPropertyById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) throw new ApiError(400, "Property ID is required");

      const property = await db.properties.findFirst({
        where: {
          id: Number(id),
          isDelete: false,
          status: true,
        },
        include: {
          category: true,
          images: { select: { id: true, image: true } },
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              role: true,
              createdAt: true,
              userDetail: {
                select: {
                  phoneNumber: true,
                  address: true,
                  profile: { select: { id: true, image: true } },
                },
              },
            },
          },
        },
      });

      if (!property) throw new ApiError(404, "Property not found");

      return res
        .status(200)
        .json(new ApiResponse(200, property, "Property fetched successfully"));
    } catch (error) {
      console.error(error);
      throw new ApiError(500, "Internal server error");
    }
  }

  async getPropertiesByUserId(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      // Validate ID
      const userId = parseInt(id);
      if (!id || isNaN(userId)) {
        throw new ApiError(400, "Invalid User ID");
      }

      // Query params
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const search = String(req.query.search || "");

      // Total count with search
      const total = await db.properties.count({
        where: {
          userId: userId,
          isDelete: false,
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { location: { contains: search, mode: "insensitive" } },
          ],
        },
      });

      // Paginated data with search
      const properties = await db.properties.findMany({
        where: {
          userId: userId,
          isDelete: false,
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { location: { contains: search, mode: "insensitive" } },
          ],
        },
        skip,
        take: limit,
        include: {
          category: true,
          images: { select: { id: true, image: true } },
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              role: true,
              createdAt: true,
              userDetail: {
                select: {
                  phoneNumber: true,
                  address: true,
                  profile: { select: { id: true, image: true } },
                },
              },
            },
          },
        },
      });

      // Pagination metadata
      const meta = {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      };

      return res.status(200).json(
        new ApiResponse(200, { properties, meta }, "Properties fetched successfully")
      );
    } catch (error) {
      console.error(error);
      throw new ApiError(500, "Internal server error");
    }
  }

}

export default new PropertyController();
