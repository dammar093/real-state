import { Router } from "express";
import propertyController from "../../controllers/property/property.controller";
import createJwt from "../../middlwares/createJwt";
import { requireRole } from "../../middlwares/requireRole";
import { uploadServiceImage } from "../../middlwares/multer";

const propertyRouter = Router()

propertyRouter.post("/", createJwt.verifyJWT, requireRole("ADMIN"), uploadServiceImage.array("image"), propertyController.asyncHandler(propertyController.createProperty.bind(propertyController)));
propertyRouter.get("/", propertyController.asyncHandler(propertyController.getAllProperty.bind(propertyController)));
propertyRouter.delete("/:id", createJwt.verifyJWT, requireRole("ADMIN"), propertyController.asyncHandler(propertyController.deleteProperty.bind(propertyController)));
propertyRouter.patch("/:id", createJwt.verifyJWT, requireRole("ADMIN"), propertyController.asyncHandler(propertyController.editProperty.bind(propertyController)));
propertyRouter.patch("/status/:id", createJwt.verifyJWT, requireRole("ADMIN"), propertyController.asyncHandler(propertyController.updatePropertyStatus.bind(propertyController)));

export default propertyRouter;