import { Router } from "express";
import userController from "../../controllers/user/user.controller";
import createJwt from "../../middlwares/createJwt";
import { requireRole } from "../../middlwares/requireRole";
import { uploadServiceImage } from "../../middlwares/multer";

const userRouter = Router();

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     summary: Get current authenticated user's info
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *       401:
 *         description: Unauthorized (if user not logged in)
 */
userRouter.get(
  "/",
  userController.asyncHandler(userController.getUser.bind(userController))
);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID (admin only)
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User info retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 *       404:
 *         description: User not found
 */
userRouter.get(
  "/:id",
  createJwt.verifyJWT,
  requireRole("SUPER_ADMIN"),
  userController.asyncHandler(userController.getUserById.bind(userController))
);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user by ID (admin only)
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully (no content)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 *       404:
 *         description: User not found
 */
userRouter.delete(
  "/:id",
  createJwt.verifyJWT,
  requireRole("SUPER_ADMIN"),
  userController.asyncHandler(userController.deleteUserById.bind(userController))
);
userRouter.patch(
  "/:id",
  createJwt.verifyJWT,
  uploadServiceImage.single("profileImage"),
  userController.asyncHandler(userController.updateUserDetails.bind(userController))
);

export default userRouter;
