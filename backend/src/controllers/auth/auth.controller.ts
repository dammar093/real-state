import { Request, Response } from "express";
import AsyncHanler from "../../utils/asyncHandler";
import validtion from "../../utils/validtion";
import { db } from "../../config/db";
import hash from "../../utils/hash";
import ApiError from "../../utils/errorHandler";
import createJwt from "../../utils/createJwt";
import ApiResponse from "../../utils/apiRespons";

class AuthController extends AsyncHanler {
  private userTypes: string[] = ["USER", "ADMIN", "SUPER_ADMIN"]
  //method for createuser
  async registerUser(req: Request, res: Response): Promise<Response> {
    const { fullName, email, password, role } = req.body
    try {
      validtion.emailValidation(email);
      validtion.fullNameValidation(fullName);
      validtion.passwordValidation(password);
      if (!this.userTypes.includes(role)) {
        throw new ApiError(400, "Role must be USER or ADMIN");
      }
      const user = await db.users.create({
        data: {
          fullName: fullName,
          email: email,
          role: role,
          password: hash.hashPassword(password)
        }
      })
      if (!user) {
        throw new ApiError(500, "Failed to creat user")
      }
      user.password = ""
      const token = createJwt.createJWT(user?.fullName, user?.fullName, user?.role);
      return res.cookie("token", token).send(new ApiResponse(201, user, "User created successfully"))
    } catch (error) {
      throw new ApiError(500, "Failed to create user")
    }
  }

  //method for authenticate user
  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      // Your logic here
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  //method for verify otp
  async verifyOTP(req: Request, res: Response): Promise<void> {
    try {

    } catch (error) {

    }
  }
  //method for forgot passwrod
  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {

    } catch (error) {

    }
  }
}

export default new AuthController();
