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
          role: "ADMIN",
          isDelete: false
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
          userDetail: {
            select: {
              id: true,
              address: true,
              phoneNumber: true,
              profile: true,
              createdAt: true,
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
      const user = await db.users.findFirst({
        where: {
          AND: [
            { id: parseInt(id) },
            { isDelete: false }
          ]
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          createdAt: true,
          userDetail: {
            select: {
              id: true,
              address: true,
              phoneNumber: true,
              profile: true,
              createdAt: true
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
  // delete user
  public async deleteUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const existingUser = await db.users.findFirst({
        where: {
          id: parseInt(id),
          isDelete: true
        }
      });

      if (existingUser) {
        throw new ApiError(404, "User not found or already deleted");
      }

      const user = await db.users.update({
        where: {
          id: parseInt(id)
        },
        data: {
          isDelete: true
        },
        select: {
          id: true,
          email: true,
          fullName: true,
          role: true,
          createdAt: true,
          userDetail: {
            select: {
              id: true,
              profile: true,
              address: true,
              phoneNumber: true,
              createdAt: true
            }
          }
        }
      });

      return res
        .status(200)
        .json(new ApiResponse(200, user, "User deleted successfully"));
    } catch (error) {
      throw new ApiError(500, "Failed to delete user");
    }
  }

}


export default new UserController()