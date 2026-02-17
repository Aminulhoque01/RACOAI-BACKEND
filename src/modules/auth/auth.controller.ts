import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { loginUser, registerUser } from "./auth.service.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { ApiError } from "../../utils/ApiError.js";
import { AuthRequest } from "../../middlewares/auth.middleware.js";
import { User } from "../users/user.model.js";

export const register = catchAsync(async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, parsed.error.message);

  const user = await registerUser(parsed.data);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, parsed.error.message);

  const result = await loginUser(parsed.data);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

export const me = catchAsync(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user.id).select("-password");

  res.status(200).json({
    success: true,
    data: user,
  });
});
