import { Request, Response } from "express";
import AsyncHandler from "../../utils/asyncHandler";
import ApiError from "../../utils/errorHandler";
import { db } from "../../config/db";
import ApiResponse from "../../utils/apiRespons";
import { name } from "ejs";

class CategoryController extends AsyncHandler {
  //create category
  async createCategory(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    if ((name.trim().length <= 3)) {
      throw new ApiError(400, "Service name is required");
    }
    try {
      const existCategory = await db.category.findFirst({
        where: {
          name: {
            equals: name,
            mode: "insensitive",
          },
          isDelete: false,
        },
      })
      if (existCategory) {
        throw new ApiError(400, "Category already exist")
      }
      const cateory = await db.category.create({
        data: {
          name
        }
      });
      if (!cateory) {
        throw new ApiError(404, "Category not found")
      }

      return res.status(201).json(new ApiResponse(20, cateory, "Category created successfully"));
    } catch (error) {
      throw new ApiError(500, "Failed to create category");
    }
  }
  //get category -> must have pagination 

  async getAllCategory(req: Request, res: Response): Promise<Response> {
    const { name = "" } = req.query;
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;

    try {
      const categories = await db.category.findMany({
        where: {
          isDelete: false,
          name: {
            contains: name as string,
            mode: "insensitive",
          },
        },
        skip,
        take: limit,
      });

      const total = await db.category.count({
        where: {
          isDelete: false,
          name: {
            contains: name as string,
            mode: "insensitive",
          },
        },
      });

      return res.status(200).json(
        new ApiResponse(200, {
          categories,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        }, "Categories fetched successfully",)
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new ApiError(500, "Failed to fetch categories");
    }
  }

  //edit category 
  async editCategory(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name } = req.body;
    if (name.trim().length <= 2) {
      throw new ApiError(400, "Service name is required");
    }
    try {
      const category = await db.category.update({
        where: {
          id: parseInt(id),
          isDelete: false
        },
        data: {
          name
        }
      })
      return res.status(200).json(new ApiResponse(200, category, "Category edited sucessfully"));
    } catch (error) {
      throw new ApiError(500, "Failed to update category");
    }
  }
  //delete category 
  async deleteCategory(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    try {
      const category = await db.category.update({
        where: {
          id: parseInt(id)
        },
        data: {
          isDelete: true
        }
      })
      if (!category) {
        throw new ApiError(404, "Category not found");
      }
      return res.status(200).json(new ApiResponse(200, category, "Category deleted successfully"));
    } catch (error) {
      throw new ApiError(500, "Failed to delete category");
    }
  }

}

export default new CategoryController()