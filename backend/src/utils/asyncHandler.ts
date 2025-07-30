import { NextFunction, Request, Response } from "express";

class AsyncHandler {
  public asyncHandler(fn: Function) {
    if (typeof fn !== "function") {
      throw new Error("Expected a function argument");
    }
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}

export default AsyncHandler;
