import { router as authRouter } from "../../app";
import authController from "../../controllers/auth/auth.controller";

authRouter.post("/register", authController.registerUser)
authRouter.post("/login", authController.loginUser)
authRouter.post("/verify-otp", authController.verifyOTP)
authRouter.post("/forgot-password", authController.forgotPassword)

export default authRouter;