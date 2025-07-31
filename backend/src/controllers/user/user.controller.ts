import { Request, Response } from "express";
import AsyncHandler from "../../utils/asyncHandler";
import ApiError from "../../utils/errorHandler";
import { db } from "../../config/db";
import ApiResponse from "../../utils/apiRespons";

class UserController extends AsyncHandler {
  public async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const users = await db.users.findMany({
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          isVerified: true,
          createdAt: true,
          updatedAt: true,
          userDetail: {
            select: {
              id: true,
              address: true,
              phoneNumber: true,
              profile: true,
              createdAt: true,
              updatedAt: true,
            }
          }
        }
      });

      // Get total user count
      const totalUsers = await db.users.count();

      return res.status(200).json(
        new ApiResponse(200, { users, totalUsers }, "Users fetched successfully")
      );
    } catch (error) {
      throw new ApiError(500, "Failed to get users");
    }
  }
}


export default new UserController()