import { router as authRouter } from "../../app";
import authController from "../../controllers/auth/auth.controller";

// Use the asyncHandler from AuthController (inherited)
authRouter.post("/register", authController.asyncHandler(authController.registerUser.bind(authController)));
authRouter.post("/login", authController.asyncHandler(authController.loginUser.bind(authController)));
authRouter.post("/verify-otp", authController.asyncHandler(authController.verifyOTP.bind(authController)))
authRouter.post("/forgot-password", authController.asyncHandler(authController.forgotPassword.bind(authController)))

export default authRouter;