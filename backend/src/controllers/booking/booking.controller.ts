import { Request, Response } from "express";
import AsyncHandler from "../../utils/asyncHandler";
import ApiError from "../../utils/errorHandler";
import ApiResponse from "../../utils/apiRespons";
import { db } from "../../config/db";

class BookingController extends AsyncHandler {
  /**
   * @desc Create a new booking
   * @route POST /api/bookings
   * @access Authenticated Users
   */
  async createBooking(req: Request, res: Response): Promise<Response> {
    const { transaction_uuid, total_amount } = req.body;

    try {
      if (!transaction_uuid || !total_amount) {
        throw new ApiError(400, "Missing required fields");
      }

      const [propertyIdStr, paymentIdPart] = transaction_uuid.split("=");
      const propertyId = parseInt(propertyIdStr);
      const paymentId = paymentIdPart;

      const existingBooking = await db.booking.findFirst({
        where: { paymentId },
      });

      if (existingBooking) {
        return res
          .status(400)
          .send(new ApiResponse(400, null, "Booking already exists"));
      }

      const property = await db.properties.findUnique({
        where: { id: propertyId },
      });

      const duration = Date.now() + (property?.durationType === "DAY" ? property.duration * 24 * 60 * 60 * 1000 : property?.durationType === "MONTH" ? property.duration * 30 * 24 * 60 * 60 * 1000 : 0);

      if (duration > Date.now()) {
        throw new ApiError(400, "The property duration is already booked out");
      }

      if (!property) {
        throw new ApiError(404, "Property not found");
      }

      const booking = await db.booking.create({
        data: {
          propertyId,
          userId: req.user.id,
          amount: parseInt(total_amount),
          paymentId: transaction_uuid,
          status: "SUCCESS",
        },
      });

      return res
        .status(201)
        .send(new ApiResponse(201, booking, "Booking created successfully"));
    } catch (error: any) {
      console.error("Booking creation error:", error);
      throw new ApiError(400, error.message || "Booking creation failed");
    }
  }

  /**
   * @desc Get all bookings for the logged-in user
   * @route GET /api/bookings/user
   * @access Authenticated Users
   */
  async getUserBookings(req: Request, res: Response): Promise<Response> {
    try {
      const { page = 1, limit = 10 } = req.query;

      const bookings = await db.booking.findMany({
        where: { userId: req.user.id },
        include: {
          property: {
            select: { id: true, title: true, price: true, images: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      });

      const total = await db.booking.count({ where: { userId: req.user.id } });

      return res.status(200).send(
        new ApiResponse(200, {
          bookings,
          pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / Number(limit)),
          },
        })
      );
    } catch (error: any) {
      throw new ApiError(400, error.message || "Failed to fetch user bookings");
    }
  }

  /**
   * @desc Get all bookings for properties owned by the logged-in owner
   * @route GET /api/bookings/owner
   * @access Property Owners / Admin
   */
  async getOwnerBookings(req: Request, res: Response): Promise<Response> {
    try {
      const { page = 1, limit = 10 } = req.query;

      const properties = await db.booking.findMany({
        where: { userId: req.user.id },
        select: { id: true },
      });

      const propertyIds = properties.map((p) => p.id);

      const bookings = await db.booking.findMany({
        where: { propertyId: { in: propertyIds } },
        include: {
          property: { select: { id: true, title: true, price: true } },
          user: { select: { id: true, fullName: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      });

      const total = await db.booking.count({
        where: { propertyId: { in: propertyIds } },
      });

      return res.status(200).send(
        new ApiResponse(200, {
          bookings,
          pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / Number(limit)),
          },
        })
      );
    } catch (error: any) {
      throw new ApiError(400, error.message || "Failed to fetch owner bookings");
    }
  }
}

export default new BookingController();
