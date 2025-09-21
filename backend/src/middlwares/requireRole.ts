import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/errorHandler";

export function requireRole(requiredRoles: string | string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

    if (!req.user || !roles.includes(req.user.role)) {
      throw new ApiError(403, "Forbidden: Access is denied");
    }
    next();
  };
}
