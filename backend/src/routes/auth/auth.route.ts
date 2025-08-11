import { Router } from "express";
import authController from "../../controllers/auth/auth.controller";
import createJwt from "../../middlwares/createJwt";

const authRouter = Router();

/**
 * @openapi
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - name
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input data
 */
authRouter.post("/register", authController.asyncHandler(authController.registerUser.bind(authController)));

/**
 * @openapi
 * /api/v1/login:
 *   post:
 *     summary: Login user and return JWT token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
authRouter.post("/login", authController.asyncHandler(authController.loginUser.bind(authController)));

/**
 * @openapi
 * /api/v1/verify-otp:
 *   post:
 *     summary: Verify OTP code
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *             required:
 *               - email
 *               - otp
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid or expired OTP
 */
authRouter.post("/verify-otp", authController.asyncHandler(authController.verifyOTP.bind(authController)));

/**
 * @openapi
 * /api/v1/send-otp:
 *   post:
 *     summary: Send OTP to user email
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Invalid email address
 */
authRouter.post("/send-otp", authController.asyncHandler(authController.sendOtp.bind(authController)));

/**
 * @openapi
 * /api/v1/forgot-password:
 *   post:
 *     summary: Request password reset via email
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Password reset link sent
 *       400:
 *         description: Invalid email address
 */
authRouter.post("/forgot-password", authController.asyncHandler(authController.forgotPassword.bind(authController)));

/**
 * @openapi
 * /api/v1/update-password:
 *   patch:
 *     summary: Update user password
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Password reset token
 *               newPassword:
 *                 type: string
 *             required:
 *               - token
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid token or new password
 */
authRouter.patch("/update-password", authController.asyncHandler(authController.updatePassword.bind(authController)));

/**
 * @openapi
 * /api/v1/logout:
 *   get:
 *     summary: Logout user and invalidate token
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized
 */
authRouter.get("/logout", createJwt.verifyJWT, authController.asyncHandler(authController.logoutUser.bind(authController)));

export default authRouter;
