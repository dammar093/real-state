import { Router } from "express";
import wishlistController from "../../controllers/whishlist/wishlist.controller";
import createJwt from "../../middlwares/createJwt";
import { requireRole } from "../../middlwares/requireRole";

const wishlistRouter = Router();

/**
 * @openapi
 * /api/v1/wishlist:
 *   post:
 *     summary: Create a new wishlist item (authenticated users only)
 *     tags:
 *       - Wishlist
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyId:
 *                 type: string
 *             required:
 *               - propertyId
 *     responses:
 *       201:
 *         description: Wishlist item created successfully
 *       401:
 *         description: Unauthorized
 */
wishlistRouter.post(
  "/",
  createJwt.verifyJWT,
  wishlistController.asyncHandler(wishlistController.createWishlist.bind(wishlistController))
);

/**
 * @openapi
 * /api/v1/wishlist:
 *   get:
 *     summary: Get wishlist items (public access)
 *     tags:
 *       - Wishlist
 *     responses:
 *       200:
 *         description: List of wishlist items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   propertyId:
 *                     type: string
 */
wishlistRouter.get(
  "/",
  wishlistController.asyncHandler(wishlistController.getWishlist.bind(wishlistController))
);

/**
 * @openapi
 * /api/v1/wishlist/{id}:
 *   delete:
 *     summary: Delete a wishlist item by ID (authenticated users only)
 *     tags:
 *       - Wishlist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Wishlist item ID to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Wishlist item deleted successfully (no content)
 *       401:
 *         description: Unauthorized
 */
wishlistRouter.delete(
  "/:id",
  createJwt.verifyJWT,
  wishlistController.asyncHandler(wishlistController.deleteWishlist.bind(wishlistController))
);

export default wishlistRouter;
