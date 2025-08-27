import { Router } from "express";
import createJwt from "../../middlwares/createJwt";
import { requireRole } from "../../middlwares/requireRole";
import serviceController from "../../controllers/service/service.controller";
import { uploadServiceImage } from "../../middlwares/multer";

const serviceRouter = Router();

/**
 * @openapi
 * /api/v1/services:
 *   post:
 *     summary: Create a new service with image
 *     tags:
 *       - Service
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - image
 *     responses:
 *       201:
 *         description: Service created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
serviceRouter.post(
  "/",
  createJwt.verifyJWT,
  requireRole("SUPER_ADMIN"),
  uploadServiceImage.single("image"),
  serviceController.asyncHandler(serviceController.createService.bind(serviceController))
);

/**
 * @openapi
 * /api/v1/services:
 *   get:
 *     summary: Get all services
 *     tags:
 *       - Service
 *     responses:
 *       200:
 *         description: List of services
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
 *                   description:
 *                     type: string
 */
serviceRouter.get(
  "/",
  serviceController.asyncHandler(serviceController.getServices.bind(serviceController))
);

/**
 * @openapi
 * /api/v1/services/{id}:
 *   patch:
 *     summary: Update service by ID (including image)
 *     tags:
 *       - Service
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Service ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Service not found
 */
serviceRouter.patch(
  "/:id",
  createJwt.verifyJWT,
  requireRole("SUPER_ADMIN"),
  uploadServiceImage.single("image"),
  serviceController.asyncHandler(serviceController.updateService.bind(serviceController))
);

/**
 * @openapi
 * /api/v1/services/status/{id}:
 *   patch:
 *     summary: Update service status by ID
 *     tags:
 *       - Service
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Service ID
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
 *                 description: New status of the service
 *     responses:
 *       200:
 *         description: Service status updated successfully
 *       400:
 *         description: Invalid status value
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Service not found
 */
serviceRouter.patch(
  "/status/:id",
  createJwt.verifyJWT,
  requireRole("SUPER_ADMIN"),
  serviceController.asyncHandler(serviceController.updateServiceStatus.bind(serviceController))
);

/**
 * @openapi
 * /api/v1/services/{id}:
 *   delete:
 *     summary: Delete a service by ID
 *     tags:
 *       - Service
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Service ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Service deleted successfully (no content)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Service not found
 */
serviceRouter.delete(
  "/:id",
  createJwt.verifyJWT,
  requireRole("SUPER_ADMIN"),
  serviceController.asyncHandler(serviceController.deleteService.bind(serviceController))
);


export default serviceRouter;
