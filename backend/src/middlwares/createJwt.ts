import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../utils/errorHandler";
import { db } from "../config/db";

export enum Role {
  SUPER_ADMIN,
  ADMIN,
  User
}
interface JwtPayload {
  id: number;
  email?: string;
  role?: Role;
  iat?: number;
  exp?: number;
}

class TokenService {
  public createJWT(id: number, name: string, email: string, role: string): string {
    const payload = { id, name, email, role };
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: 10 * 24 * 60 * 60
    });
  }

  public async verifyJWT(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token =
        req.cookies?.token ||
        req.header("Authorization")?.replace("Bearer ", "").trim();

      if (!token) {
        return next(new ApiError(401, "Access token is required"));
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      if (!decodedToken?.id) {
        return next(new ApiError(401, "Invalid token payload"));
      }

      const user = await db.users.findUnique({
        where: { id: decodedToken?.id },
      });

      if (!user) {
        return next(new ApiError(401, "Invalid access token"));
      }

      req.user = user; // Ensure you've extended Express.Request as shown earlier

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return next(new ApiError(401, "Token has expired"));
      }
      if (error instanceof jwt.JsonWebTokenError) {
        return next(new ApiError(401, "Invalid access token"));
      }
      return next(new ApiError(500, "Error verifying token"));
    }
  }

}


export default new TokenService();
