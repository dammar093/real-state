import { Router } from "express";
import propertyController from "../../controllers/property/property.controller";
import createJwt from "../../middlwares/createJwt";
import { requireRole } from "../../middlwares/requireRole";
import { uploadServiceImage } from "../../middlwares/multer";

const propertyRouter = Router();

/**
 * @openapi
 * /api/v1/properties:
 *   post:
 *     summary: Create a new property with images
 *     tags:
 *       - Property
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - title
 *               - description
 *               - images
 *     responses:
 *       201:
 *         description: Property created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
propertyRouter.post(
  "/",
  createJwt.verifyJWT,
  requireRole("ADMIN"),
  uploadServiceImage.array("image"),
  propertyController.asyncHandler(propertyController.createProperty.bind(propertyController))
);

/**
 * @openapi
 * /api/v1/properties:
 *   get:
 *     summary: Get all properties
 *     tags:
 *       - Property
 *     responses:
 *       200:
 *         description: List of properties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 */
propertyRouter.get(
  "/",
  propertyController.asyncHandler(propertyController.getAllProperty.bind(propertyController))
);

/**
 * @openapi
 * /api/v1/properties/{id}:
 *   delete:
 *     summary: Delete a property by ID
 *     tags:
 *       - Property
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Property ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Property deleted successfully (no content)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Property not found
 */
propertyRouter.delete(
  "/:id",
  createJwt.verifyJWT,
  requireRole("ADMIN"),
  propertyController.asyncHandler(propertyController.deleteProperty.bind(propertyController))
);

/**
 * @openapi
 * /api/v1/properties/{id}:
 *   patch:
 *     summary: Update a property by ID
 *     tags:
 *       - Property
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Property ID
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Property updated successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Property not found
 */
propertyRouter.patch(
  "/:id",
  createJwt.verifyJWT,
  requireRole("ADMIN"),
  propertyController.asyncHandler(propertyController.editProperty.bind(propertyController))
);

/**
 * @openapi
 * /api/v1/properties/status/{id}:
 *   patch:
 *     summary: Update status of a property by ID
 *     tags:
 *       - Property
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Property ID
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
 *               status:
 *                 type: string
 *                 description: New status of the property
 *     responses:
 *       200:
 *         description: Property status updated successfully
 *       400:
 *         description: Invalid status value
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Property not found
 */
propertyRouter.patch(
  "/status/:id",
  createJwt.verifyJWT,
  requireRole("ADMIN"),
  propertyController.asyncHandler(propertyController.updatePropertyStatus.bind(propertyController))
);
// Get properties by categoryId
propertyRouter.get(
  "/category/:category",
  propertyController.asyncHandler(
    propertyController.getPropertyByCategory.bind(propertyController)
  )
);
propertyRouter.get(
  "/:id",
  propertyController.asyncHandler(
    propertyController.getPropertyById.bind(propertyController)
  )
);



export default propertyRouter;
