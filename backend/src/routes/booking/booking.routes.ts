import { Router } from "express";
import { requireRole } from "../../middlwares/requireRole";

const bookingRouter = Router();
import createJwt from "../../middlwares/createJwt";
import bookingController from "../../controllers/booking/booking.controller";

bookingRouter.post("/", createJwt.verifyJWT, bookingController.createBooking);
bookingRouter.get("/user", createJwt.verifyJWT, bookingController.getUserBookings);
bookingRouter.get(
  "/property/:propertyId",
  createJwt.verifyJWT,
  bookingController.getBookingByPropertyId
);
bookingRouter.get("/owner", createJwt.verifyJWT, requireRole(["ADMIN", "SUPER_ADMIN"]), bookingController.getOwnerBookings);

export default bookingRouter;