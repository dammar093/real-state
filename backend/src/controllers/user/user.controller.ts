import { Request, Response } from "express";
import AsyncHandler from "../../utils/asyncHandler";
import ApiError from "../../utils/errorHandler";
import { db } from "../../config/db";
import ApiResponse from "../../utils/apiRespons";
import { Role } from "../../../generated/prisma";
import { uploadServiceImage } from "../../middlwares/multer";
import { uploadImage } from "../../utils/cloudinary";

class UserController extends AsyncHandler {
  // get user
  public async getUser(req: Request, res: Response): Promise<Response> {
    const {
      limit = "10",
      page = "1",
      name = "",
      email = "",
      role = "ADMIN",
    } = req.query;

    try {
      const take = parseInt(limit as string, 10) || 10;
      const currentPage = parseInt(page as string, 10) || 1;
      const skip = (currentPage - 1) * take;

      const users = await db.users.findMany({
        where: {
          isDelete: false,
          fullName: {
            contains: name as string,
            mode: "insensitive",
          },
          email: {
            contains: email as string,
            mode: "insensitive",
          },
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
          isDelete: false,
          fullName: {
            contains: name as string,
            mode: "insensitive",
          },
          email: {
            contains: email as string,
            mode: "insensitive",
          },
        },
      });

      return res.status(200).json(
        new ApiResponse(
          200,
          {
            users,
            pagination: {
              totalUsers,
              totalPages: Math.ceil(totalUsers / take),
              currentPage,
              limit: take,
            },
          },
          "Users fetched successfully"
        )
      );
    } catch (error) {
      console.error("Error fetching users:", error);
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

  public async updateUserDetails(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      fullName,
      phoneNumber,
      address,
      about,
      facebook,
      instagram,
      linkedin,
      twitter
    } = req.body;

    const profileFile = req.file; // single file upload

    try {
      // Fetch existing user with details
      const existingUser = await db.users.findUnique({
        where: { id: parseInt(id) },
        include: { userDetail: { include: { profile: true } } },
      });

      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      let profileImageData;

      if (profileFile) {
        const imageUrl = await uploadImage(profileFile.path); // Cloudinary or S3
        if (existingUser.userDetail?.profile) {
          // Update existing profile image
          profileImageData = await db.images.update({
            where: { id: existingUser.userDetail.profile.id },
            data: { image: imageUrl },
          });
        } else {
          // Create new profile image
          profileImageData = await db.images.create({
            data: {
              image: imageUrl,
              profilePic: { connect: { id: existingUser.userDetail?.id } },
            },
          });
        }
      }

      // Update user and details
      const updatedUser = await db.users.update({
        where: { id: parseInt(id) },
        data: {
          fullName,
          userDetail: {
            upsert: {
              create: {
                phoneNumber,
                address,
                about,
                facebook,
                instagram,
                twitter,
                linkedin,
                profile: profileImageData
                  ? { connect: { id: profileImageData.id } }
                  : undefined,
              },
              update: {
                phoneNumber,
                address,
                about,
                facebook,
                instagram,
                twitter,
                linkedin,
                profile: profileImageData
                  ? { connect: { id: profileImageData.id } }
                  : undefined,
              },
            },
          },
        },
        include: { userDetail: { include: { profile: true } } },
      });

      return res
        .status(200)
        .json({ message: "Profile updated successfully", data: updatedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to update profile" });
    }
  }


}


export default new UserController()