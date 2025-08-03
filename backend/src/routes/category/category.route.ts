import { Router } from "express";
import categoryController from "../../controllers/category/category.controller";
import createJwt from "../../middlwares/createJwt";
import { requireRole } from "../../middlwares/requireRole";

const categoryRouter = Router()

categoryRouter.post("/", createJwt.verifyJWT, requireRole("SUPER_ADMIN"), categoryController.asyncHandler(categoryController.createCategory.bind(categoryController)));
categoryRouter.get("/", createJwt.verifyJWT, requireRole("SUPER_ADMIN"), categoryController.asyncHandler(categoryController.getAllCategory.bind(categoryController)));
categoryRouter.delete("/:id", createJwt.verifyJWT, requireRole("SUPER_ADMIN"), categoryController.asyncHandler(categoryController.deleteCategory.bind(categoryController)));
categoryRouter.patch("/:id", createJwt.verifyJWT, requireRole("SUPER_ADMIN"), categoryController.asyncHandler(categoryController.editCategory.bind(categoryController)));

export default categoryRouter;