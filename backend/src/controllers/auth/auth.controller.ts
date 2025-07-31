import bycryptjs from "bcryptjs"
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
  async loginUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    validtion.emailValidation(email)
    validtion.passwordValidation(password)
    try {
      const notVerifiedUser = await db.users.findFirst({
        where: {
          email,
          isVerified: false
        }
      })
      if (notVerifiedUser) {
        throw new ApiError(401, "Please verified your email")
      }
      const user = await db.users.findFirst({
        where: {
          email,
          isVerified: true
        }
      })
      if (!user?.password) {
        throw new ApiError(400, "Invalid email or password")
      }
      const isMatch = await bycryptjs.compare(password, user?.password)
      if (!isMatch) {
        throw new ApiError(400, "Invalid email or password")
      }
      if (!user) {
        throw new ApiError(401, "Invalid email or password");
      }
      const token = createJwt.createJWT(user?.fullName, user?.email, user?.role);
      if (!token) {
        throw new ApiError(500, "fialed to create token");
      }
      return res.status(200).cookie("token", token, {
        httpOnly: true,
        secure: true,
      }).json(new ApiResponse(200, token, "User logged in successfully"));
    } catch (error) {
      throw new ApiError(500, "Fialed to loging")
    }
  }
  //method for verify otp
  async verifyOTP(req: Request, res: Response): Promise<Response> {
    const { email, otp } = req.body
    validtion.emailValidation(email)
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
      if (!token) {
        throw new ApiError(500, "fialed to create token");
      }
      return res.status(200).cookie("token", token, {
        httpOnly: true,
        secure: true,
      }).json(new ApiResponse(200, { token }, "User verified successfull"));
    } catch (error: any) {
      console.log(error.message)
      throw new ApiError(500, "Something went wrong")
    }
  }
  async sendOtp(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    validtion.emailValidation(email)
    try {
      const user = await db.users.findFirst({
        where: {
          email,
          isVerified: true
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
  async forgotPassword(req: Request, res: Response): Promise<Response> {
    const { email } = req.body
    validtion.emailValidation(email)
    try {
      const existUser = await db.users.findFirst({
        where: {
          email: email
        }
      })
      if (!existUser) {
        throw new ApiError(400, "This email is not exist");
      }

      const updatedUser = await db.users.update({
        where: {
          id: existUser?.id
        },
        data: {
          otp: generateOTP(),
          otpExpires: new Date(existUser.otpExpires)
        }
      })
      sendOtpEmail(updatedUser?.email, updatedUser?.fullName, updatedUser?.otp);
      updatedUser.password = ""
      return res.status(200).json(new ApiResponse(200, updatedUser, "OTP sent successfully"))
    } catch (error) {
      throw new ApiError(500, "Failed to send OTP")
    }
  }

  // method for change password
  async updatePassword(req: Request, res: Response): Promise<Response> {
    const { email, password, otp } = req.body
    validtion.emailValidation(email)
    validtion.passwordValidation(password)
    try {
      const existUser = await db.users.findFirst({
        where: {
          email: email
        }
      })
      if (!existUser) {
        throw new ApiError(400, "This email is not exist");
      }

      const validOTP = await db.users.findFirst({
        where: {
          otp
        }
      })
      if (!validOTP) {
        throw new ApiError(400, "Invalid OTP")
      }

      const updatedUser = await db.users.update({
        where: {
          id: validOTP?.id
        },
        data: {
          password: hash.hashPassword(password),
          otp: ""
        }
      })
      updatedUser.password = ""
      const token = createJwt.createJWT(updatedUser?.fullName, updatedUser?.email, updatedUser?.role);
      if (!token) {
        throw new ApiError(500, "Failed to create token")
      }
      return res.status(200).cookie("token", token, {
        httpOnly: true,
        secure: true,
      }).json(new ApiResponse(200, token, "Password updated successfully"))
    } catch (error) {
      throw new ApiError(500, "Failed to update password")
    }
  }

  // method for logout
  async logoutUser(req: Request, res: Response): Promise<Response> {

    try {

      return res.status(200).clearCookie("token", {
        secure: true,
        httpOnly: true
      }).json(new ApiResponse(200, null, "Logout successfully"))
    } catch (error) {
      throw new ApiError(500, "Failed to logout")
    }
  }

}

export default new AuthController();
