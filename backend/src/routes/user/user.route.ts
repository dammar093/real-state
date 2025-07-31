import { Router } from "express";
import userController from "../../controllers/user/user.controller";
import createJwt from "../../utils/createJwt";

const userRouter = Router()
userRouter.get("/users", createJwt.verifyJWT, userController.asyncHandler(userController.getUser.bind(userController)));

export default userRouter;