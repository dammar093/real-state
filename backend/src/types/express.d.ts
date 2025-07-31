// src/types/express.d.ts
import { Users } from "@prisma/client"; // or your custom User type

declare global {
  namespace Express {
    interface Request {
      user?: Users;
    }
  }
}
