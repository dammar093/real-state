import { Router } from "express";
import { requireRole } from "../../middlwares/requireRole";

const bookingRouter = Router();
import createJwt from "../../middlwares/createJwt";
import bookingController from "../../controllers/booking/booking.controller";

bookingRouter.post("/", createJwt.verifyJWT, bookingController.createBooking);

export default bookingRouter;