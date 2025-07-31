import { router as authRouter } from "../../app";
import authController from "../../controllers/auth/auth.controller";
import createJwt from "../../utils/createJwt";

// Use the asyncHandler from AuthController (inherited)
authRouter.post("/register", authController.asyncHandler(authController.registerUser.bind(authController)));
authRouter.post("/login", authController.asyncHandler(authController.loginUser.bind(authController)));
authRouter.post("/verify-otp", authController.asyncHandler(authController.verifyOTP.bind(authController)))
authRouter.post("/send-otp", authController.asyncHandler(authController.sendOtp.bind(authController)))
authRouter.post("/forgot-password", authController.asyncHandler(authController.forgotPassword.bind(authController)))
authRouter.patch("/update-password", authController.asyncHandler(authController.updatePassword.bind(authController)))
authRouter.get("/logout", createJwt.verifyJWT, authController.asyncHandler(authController.logoutUser.bind(authController)))

export default authRouter;