import { Request, Response } from "express";
import AsyncHanler from "../../utils/asyncHandler";
import validtion from "../../utils/validtion";
import { db } from "../../config/db";
import hash from "../../utils/hash";
import ApiError from "../../utils/errorHandler";
import createJwt from "../../utils/createJwt";
import ApiResponse from "../../utils/apiRespons";
import { sendOtpEmail } from "../../utils/sendEmail";
import generateOTP from "../../utils/generateOtp";

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
      const existUser = await db.users.findUnique({
        where: {
          email,
          isVerified: true
        }
      });

      if (existUser) {
        throw new ApiError(400, "This email already exist")
      }
      const notValidUser = await db.users.findFirst({
        where: {
          email,
          isVerified: false
        }
      })
      if (notValidUser) {
        throw new ApiError(400, "Not valid email plased validate it")
      }
      const user = await db.users.create({
        data: {
          fullName: fullName,
          email: email,
          role: role,
          password: hash.hashPassword(password),
          otp: generateOTP()
        }
      })
      if (!user) {
        throw new ApiError(500, "Failed to creat user")
      }
      user.password = ""
      await sendOtpEmail(user?.email, user?.fullName, user?.otp)
      return res.status(201).send(new ApiResponse(201, user, "User created successfully"))
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
  async verifyOTP(req: Request, res: Response): Promise<Response> {
    const { email, otp } = req.body
    try {
      const user = await db.users.findFirst({
        where: {
          email,
          otp
        }
      })
      if (!user) {
        throw new ApiError(400, "Invalid Email or OTP")
      }
      if (user.otpExpires) {
        const now = Date.now();
        const expiresAt = new Date(user.otpExpires).getTime();
        const diffInMs = now - expiresAt;

        if (diffInMs > 5 * 60 * 1000) {
          throw new ApiError(400, "OTP is expired");
        }
      }

      user.password = ""
      user.otp = ""
      await db.users.update({
        where: {
          id: user?.id
        },
        data: {
          otp: "",
          isVerified: true
        }
      });

      const token = createJwt.createJWT(user?.fullName, user?.fullName, user?.role);
      return res.status(200).json(new ApiResponse(200, { token }, "User verified successfull"));
    } catch (error: any) {
      console.log(error.message)
      throw new ApiError(500, "Something went wrong")
    }
  }
  async sendOtp(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    try {
      const user = await db.users.findFirst({
        where: {
          email,
          isVerified: false
        }
      })

      if (!user) {
        throw new ApiError(400, "This email is not exist");
      }
      const updatedUser = await db.users.update({
        where: {
          id: user?.id
        },
        data: {
          otp: generateOTP(),
          otpExpires: new Date(user.otpExpires)
        }
      })
      updatedUser.password = ""
      sendOtpEmail(updatedUser?.email, updatedUser?.fullName, updatedUser?.otp)
      return res.status(200).json(new ApiResponse(200, updatedUser, "OTP sent successfully"))

    } catch (error) {
      throw new ApiError(500, "Failed to send OTP")
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
