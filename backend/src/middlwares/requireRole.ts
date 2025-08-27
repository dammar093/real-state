import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/errorHandler";

export function requireRole(requiredRole: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user.role)
    if (!req.user || req.user.role !== requiredRole) {
      throw new ApiError(403, "Forbidden: Access is denied");
    }
    next();
  };
}
