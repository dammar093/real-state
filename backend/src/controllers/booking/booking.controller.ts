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
}

export default new BookingController();
