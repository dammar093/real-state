import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ApiError from "./errorHandler";
import { db } from "../config/db";

interface JwtPayload {
  id: number;
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

class TokenService {
  public createJWT(id: number, name: string, email: string, role: string): string {
    const payload = { id, name, email, role };
    const secret = process.env.JWT_SECRET!;
    const options = {
      expiresIn: "7d", // token valid for 7 days
    };

    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: 10 * 24 * 60 * 60
    });
  }

  public async verifyJWT(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.token || req.header("Authorization")?.replace("Breare", "");
      if (!token) {
        throw new ApiError(401, "Access token is required");
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      if (!decodedToken?.id) {
        throw new ApiError(401, "Invalid token payload");
      }

      const user = await db.users.findUnique({
        where: {
          id: decodedToken.id,
        },
      });
      if (!user) {
        throw new ApiError(401, "Invalid Access Token");
      }
      req.user = user;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new ApiError(401, "Invalid access token");
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new ApiError(401, "Token has expired");
      }
      throw new ApiError(500, "An error occurred while verifying the token");
    }
  }
}


export default new TokenService();
