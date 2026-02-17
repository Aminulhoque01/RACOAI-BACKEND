import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware.js";
import { ApiError } from "../utils/ApiError.js";

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");

    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Forbidden: insufficient permissions");
    }

    next();
  };
};
