import { Request, Response } from "express";
import AsyncHandler from "../../utils/asyncHandler";
import ApiError from "../../utils/errorHandler";
import { db } from "../../config/db";
import { uploadImage } from "../../utils/cloudinary";
import ApiResponse from "../../utils/apiRespons";

class ServiceController extends AsyncHandler {
  async createService(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const userId = req.user?.id;

    if (!name || name.trim().length < 2) {
      throw new ApiError(400, "Service name must be at least 2 characters");
    }

    const imageFile = req.file;
    if (!imageFile) {
      throw new ApiError(400, "Service image is required");
    }

    try {
      // Check if service already exists
      const existing = await db.services.findFirst({
        where: {
          name: name.trim().toLowerCase(),
          isDelete: false,
        },
      });

      if (existing) {
        throw new ApiError(409, "Service with this name already exists");
      }

      // Upload image to cloud/local storage
      const imageUrl = await uploadImage(imageFile.path);

      // Create image record first
      const savedImage = await db.images.create({
        data: {
          image: imageUrl,
        },
      });

      // Now create the service and link the image
      const newService = await db.services.create({
        data: {
          name: name.trim(),
          userId,
          image: {
            connect: { id: savedImage.id },
          },
        },
        include: { image: true },
      });

      // Update the image record to link serviceId (optional if not already required)
      await db.images.update({
        where: { id: savedImage.id },
        data: { serviceId: newService.id },
      });

      return res.status(201).json(
        new ApiResponse(201, newService, "Service created successfully")
      );
    } catch (error: any) {
      console.error(error);
      throw new ApiError(500, "Failed to create service");
    }
  }
  //get all services 
  async getServices(req: Request, res: Response): Promise<Response> {
    try {
      const { page = 1, limit = 10, search = "" } = req.query;

      const currentPage = parseInt(page as string, 10) || 1;
      const pageSize = parseInt(limit as string, 10) || 10;
      const skip = (currentPage - 1) * pageSize;

      const [services, total] = await Promise.all([
        db.services.findMany({
          where: {
            isDelete: false,
            name: {
              contains: search as string,
              mode: "insensitive",
            },
          },
          skip,
          take: pageSize,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            image: true,
          },
        }),
        db.services.count({
          where: {
            isDelete: false,
            name: {
              contains: search as string,
              mode: "insensitive",
            },
          },
        }),
      ]);

      return res.status(200).json(
        new ApiResponse(200, {
          services,
          pagination: {
            total,
            page: currentPage,
            limit: pageSize,
            totalPages: Math.ceil(total / pageSize),
          },
        }, "Services fetched successfully")
      );
    } catch (error: any) {
      console.error(error);
      throw new ApiError(500, "Internal server error: " + error.message);
    }
  }
  //delete service
  async deleteService(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const serviceId = parseInt(id, 10);

      if (isNaN(serviceId)) {
        throw new ApiError(400, "Invalid service ID");
      }

      // Check if service exists and is not already deleted
      const existingService = await db.services.findFirst({
        where: {
          id: serviceId,
          isDelete: false,
        },
      });

      if (!existingService) {
        throw new ApiError(404, "Service not found or already deleted");
      }

      // Soft delete the service
      const deletedService = await db.services.update({
        where: { id: serviceId },
        data: {
          isDelete: true,
        },
      });

      return res.status(200).json(
        new ApiResponse(200, deletedService, "Service deleted successfully")
      );
    } catch (error: any) {
      console.error(error);
      throw new ApiError(500, "Failed to delete service: " + error.message);
    }
  }


}
export default new ServiceController()