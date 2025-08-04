import { Router } from "express";
import wishlistController from "../../controllers/whishlist/wishlist.controller";
import createJwt from "../../middlwares/createJwt";
import { requireRole } from "../../middlwares/requireRole";

const wishlistRouter = Router()

wishlistRouter.post("/", createJwt.verifyJWT, wishlistController.asyncHandler(wishlistController.createWishlist.bind(wishlistController)));
wishlistRouter.get("/", wishlistController.asyncHandler(wishlistController.getWishlist.bind(wishlistController)));
wishlistRouter.delete("/:id", createJwt.verifyJWT, wishlistController.asyncHandler(wishlistController.deleteWishlist.bind(wishlistController)));


export default wishlistRouter;