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
      const imageUrl = await uploadImage(imageFile.path); // Make sure this returns a string

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
      throw new ApiError(500, "Failed to create service: " + error.message);
    }
  }


}
export default new ServiceController()