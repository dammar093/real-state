import { Router } from "express";
import createJwt from "../../middlwares/createJwt";
import { requireRole } from "../../middlwares/requireRole";
import serviceController from "../../controllers/service/service.controller";
import { uploadServiceImage } from "../../middlwares/multer";

const serviceRouter = Router()
serviceRouter.post(
  "/",
  createJwt.verifyJWT,
  requireRole("SUPER_ADMIN"),
  uploadServiceImage.single("image"),
  serviceController.asyncHandler(serviceController.createService.bind(serviceController))
);
serviceRouter.get("/", serviceController.asyncHandler(serviceController.getServices.bind(serviceController))
);
serviceRouter.patch("/:id", createJwt.verifyJWT,
  requireRole("SUPER_ADMIN"),
  uploadServiceImage.single("image"),
  serviceController.asyncHandler(serviceController.getServices.bind(serviceController))
);
serviceRouter.patch("/:id/status", createJwt.verifyJWT,
  requireRole("SUPER_ADMIN"),
  uploadServiceImage.single("image"),
  serviceController.asyncHandler(serviceController.getServices.bind(serviceController))
);

export default serviceRouter