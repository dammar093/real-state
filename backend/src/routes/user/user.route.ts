import { Router } from "express";
import userController from "../../controllers/user/user.controller";
import createJwt from "../../utils/createJwt";

const userRouter = Router()
userRouter.get("/users", userController.asyncHandler(userController.getUser.bind(userController)));
userRouter.get("/users/:id", createJwt.verifyJWT, userController.asyncHandler(userController.getUserById.bind(userController)));

export default userRouter;