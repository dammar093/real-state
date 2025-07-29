import { Request, Response } from "express";

class AuthController {
  //method for createuser
  async registerUser(req: Request, res: Response): Promise<void> {
    try {

    } catch (error) {

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
