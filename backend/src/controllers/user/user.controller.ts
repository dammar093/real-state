import { Request, Response } from "express";
import AsyncHandler from "../../utils/asyncHandler";
import ApiError from "../../utils/errorHandler";
import { db } from "../../config/db";
import ApiResponse from "../../utils/apiRespons";

class UserController extends AsyncHandler {
  // get user
  public async getUser(req: Request, res: Response): Promise<Response> {
    const { limit = "10", page = "1" } = req.query;

    try {
      const take = parseInt(limit as string, 10) || 10;
      const currentPage = parseInt(page as string, 10) || 1;
      const skip = (currentPage - 1) * take;



      const users = await db.users.findMany({
        where: {
          role: "ADMIN"
        },
        skip,
        take,
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
            },
          },
        },
      });
      const totalUsers = await db.users.count({
        where: {
          role: "ADMIN"
        }
      });
      return res.status(200).json(
        new ApiResponse(200, {
          users,
          pagination: {
            totalUsers,
            totalPages: Math.ceil(totalUsers / take),
            currentPage,
            limit: take,
          },
        }, "Users fetched successfully")
      );
    } catch (error) {
      throw new ApiError(500, "Failed to get users");
    }
  }
  //getUserById
  public async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    try {
      const user = await db.users.findUnique({
        where: {
          id: parseInt(id)
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          userDetail: {
            select: {
              id: true,
              address: true,
              phoneNumber: true,
              profile: true,
              createdAt: true,
              updatedAt: true
            }
          }
        }
      })
      if (!user) {
        throw new ApiError(404, "User not found")
      }
      return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"))
    } catch (error) {
      throw new ApiError(500, "Failed to fetch user")
    }
  }

}


export default new UserController()