import { Request, Response } from "express";
import AsyncHandler from "../../utils/asyncHandler";
import ApiError from "../../utils/errorHandler";
import ApiResponse from "../../utils/apiRespons";
import { db } from "../../config/db";

class BookingController extends AsyncHandler {
  async createBooking(req: Request, res: Response): Promise<Response> {
    const { transaction_uuid, total_amount } = req.body;

    console.log(req.body);
    try {
      const existingBooking = await db.booking.findFirst({
        where: { paymentId: transaction_uuid.split("=")[1] },
      });
      if (existingBooking) {
        return res
          .status(400)
          .send(new ApiResponse(400, null, "Booking already exists"));
      }
      const property = await db.booking.findFirst({
        where: {
          propertyId: parseInt(transaction_uuid.split("=")[0]),
        },
        include: {
          property: true
        }
      });
      const now = new Date();
      let bookingEnd;
      if (property?.property.durationType === "DAY") {
        bookingEnd = property.createdAt.getTime() + property?.property.duration * 24 * 60 * 60 * 1000;
      } else if (property?.property.durationType === "MONTH") {
        bookingEnd = property.createdAt.getTime() + property?.property.duration * 30 * 24 * 60 * 60 * 1000;
      }

      if (bookingEnd) {
        return res
          .status(400)
          .send(new ApiResponse(400, null, "User has already booked this property"));
      }
      const booking = await db.booking.create({
        data: {
          propertyId: parseInt(transaction_uuid.split("=")[0]),
          userId: req.user.id,
          amount: parseInt(total_amount),
          paymentId: transaction_uuid,
          status: "SUCCESS",
        },
      });

      return res
        .status(201)
        .send(new ApiResponse(201, booking, "Booking created successfully"));
    } catch (error) {
      throw new ApiError(400, "Booking creation failed");
    }
  }

  async getUserBookings(req: Request, res: Response): Promise<Response> {
    try {
      const bookings = await db.booking.findMany({
        where: { userId: req.user.id },
        include: {
          property: {
            include: {
              images: true
            }
          },
        },
      });
      return res
        .status(200)
        .send(new ApiResponse(200, bookings, "User bookings retrieved successfully"));
    } catch (error) {
      throw new ApiError(400, "Failed to retrieve user bookings");
    }
  }
  async getOwnerBookings(req: Request, res: Response): Promise<Response> {
    try {
      const bookings = await db.booking.findMany({
        where: {
          property: {
            userId: req.user.id,
          },
        },
        include: {
          property: {
            include: {
              images: true
            }
          },
          user: {
            include: {
              userDetail: true
            }
          }
        },

      });
      return res
        .status(200)
        .send(new ApiResponse(200, bookings, "Owner bookings retrieved successfully"));
    } catch (error) {
      throw new ApiError(400, "Failed to retrieve owner bookings");
    }
  }
  async getBookingByPropertyId(req: Request, res: Response): Promise<Response> {
    const propertyId = parseInt(req.params.propertyId);

    try {
      const booking = await db.booking.findFirst({
        where: { propertyId },
        include: {
          property: true,

        },

        orderBy: {
          createdAt: "desc", // 👈 get the latest booking
        },
      });

      if (!booking) {
        throw new ApiError(404, "Booking not found for the given property ID");
      }

      return res.status(200).send(
        new ApiResponse(200, booking, "Latest booking retrieved successfully")
      );
    } catch (error) {
      throw new ApiError(400, "Failed to retrieve booking");
    }
  }

}
export default new BookingController();
