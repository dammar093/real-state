import { Router } from "express";
import userController from "../../controllers/user/user.controller";
import createJwt from "../../middlwares/createJwt";
import { requireRole } from "../../middlwares/requireRole";

const userRouter = Router()
userRouter.get("/users", userController.asyncHandler(userController.getUser.bind(userController)));
userRouter.get("/users/:id", createJwt.verifyJWT, requireRole("SUPER_ADMIN"), userController.asyncHandler(userController.getUserById.bind(userController)));

export default userRouter;