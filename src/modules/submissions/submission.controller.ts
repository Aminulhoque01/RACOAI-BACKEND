import { Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { AuthRequest } from "../../middlewares/auth.middleware.js";
import { ApiError } from "../../utils/ApiError.js";
import { submitTaskZip } from "./submission.service.js";
import { uploadZipToCloudinary } from "../../utils/uploadToCloudinary.js";

export const submitZip = catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.file) throw new ApiError(400, "ZIP file required");

  const cloudinaryResult: any = await uploadZipToCloudinary(req.file.buffer);

  const zipUrl = cloudinaryResult.secure_url;

  const submission = await submitTaskZip(req.params.taskId as string, req.user.id, zipUrl);

  res.status(201).json({
    success: true,
    message: "Submission uploaded successfully",
    data: submission,
  });
});
