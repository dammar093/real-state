import { Router } from "express";
import categoryController from "../../controllers/category/category.controller";
import createJwt from "../../middlwares/createJwt";
import { requireRole } from "../../middlwares/requireRole";

const categoryRouter = Router();

/**
 * @openapi
 * /api/v1/categories:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Category created successfully
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       403:
 *         description: Forbidden (insufficient permissions)
 */
categoryRouter.post("/", createJwt.verifyJWT, requireRole("SUPER_ADMIN"), categoryController.asyncHandler(categoryController.createCategory.bind(categoryController)));

/**
 * @openapi
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
categoryRouter.get("/", categoryController.asyncHandler(categoryController.getAllCategory.bind(categoryController)));

/**
 * @openapi
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Category ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Category deleted successfully (no content)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 */
categoryRouter.delete("/:id", createJwt.verifyJWT, requireRole("SUPER_ADMIN"), categoryController.asyncHandler(categoryController.deleteCategory.bind(categoryController)));

/**
 * @openapi
 * /api/v1/categories/{id}:
 *   patch:
 *     summary: Update a category by ID
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Category ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 */
categoryRouter.patch("/:id", createJwt.verifyJWT, requireRole("SUPER_ADMIN"), categoryController.asyncHandler(categoryController.editCategory.bind(categoryController)));
categoryRouter.patch("/:id/toggle", createJwt.verifyJWT, requireRole("SUPER_ADMIN"), categoryController.asyncHandler(categoryController.toggleCategoryStatus.bind(categoryController)));

export default categoryRouter;
