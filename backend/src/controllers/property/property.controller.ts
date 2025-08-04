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
        map,
        categoryId,
        serviceIds,
        type,
        isHotel,
      } = req.body;

      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        throw new ApiError(400, "At least one property image is required");
      }

      // Create property first
      const property = await db.properties.create({
        data: {
          title,
          price: +price,
          location,
          description,
          map,
          categoryId: +categoryId,
          type,
          isHotel: isHotel === "true" || isHotel === true,
          userId: user.id,
          services: {
            create: serviceIds.map((sid: number) => ({
              serviceId: sid,
            })),
          },
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

      // Final response
      const fullProperty = await db.properties.findUnique({
        where: { id: property.id },
        include: {
          images: true,
          services: {
            include: { service: true },
          },
          category: true,
        },
      });

      return res
        .status(201)
        .json(
          new ApiResponse(201, fullProperty, "Property created successfully")
        );
    } catch (error) {
      console.error(error);
      throw new ApiError(500, "Internal server error");
    }
  }


  // Edit property - No image update
  async editProperty(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { title, price, location, description, map, categoryId, serviceIds, type, isHotel } = req.body;

      const existing = await db.properties.findFirst({ where: { id: +id, isDelete: false } });
      if (!existing) throw new ApiError(404, "Property not found");

      const updatedProperty = await db.properties.update({
        where: { id: +id },
        data: {
          title,
          price,
          location,
          description,
          map,
          categoryId,
          type,
          isHotel,
          services: {
            deleteMany: {}, // clear old services
            create: serviceIds.map((sid: number) => ({
              serviceId: sid,
            })),
          },
        },
      });

      return res.status(200).json(new ApiResponse(200, updatedProperty, "Property updated successfully"));
    } catch (error) {
      throw new ApiError(500, "Inertnal server error");
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
            {
              services: {
                some: {
                  service: {
                    name: { contains: String(search), mode: "insensitive" },
                  },
                },
              },
            },
          ],
        },
        include: {
          category: true,
          services: {
            include: { service: true },
          },
          images: true,
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
          OR: [
            { location: { contains: String(search), mode: "insensitive" } },
            { title: { contains: String(search), mode: "insensitive" } },
            {
              services: {
                some: {
                  service: {
                    name: { contains: String(search), mode: "insensitive" },
                  },
                },
              },
            },
          ],
        },
      });

      return res.status(200).json(new ApiResponse(200, {
        properties,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / Number(limit)),
        },
      }, "Propertis fetched successfully"));
    } catch (error) {
      throw new ApiError(500, "Internal server error");
    }
  }
}

export default new PropertyController();
