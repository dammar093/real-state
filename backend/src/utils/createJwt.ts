import jwt from "jsonwebtoken";

class TokenService {
  public createJWT(name: string, email: string, role: string): string {
    const payload = { name, email, role };
    const secret = process.env.JWT_SECRET!;
    const options = {
      expiresIn: "7d", // token valid for 7 days
    };

    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: 10 * 24 * 60 * 60
    });
  }
}

export default new TokenService();
