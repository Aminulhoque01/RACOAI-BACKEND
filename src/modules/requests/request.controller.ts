import { Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { AuthRequest } from "../../middlewares/auth.middleware.js";
import { createRequest, getProjectRequests } from "./request.service.js";
 

export const requestProject = catchAsync(async (req: AuthRequest, res: Response) => {
  const request = await createRequest(req.params.projectId as string, req.user.id);

  res.status(201).json({
    success: true,
    message: "Request submitted",
    data: request,
  });
});

export const viewProjectRequests = catchAsync(async (req: AuthRequest, res: Response) => {
  const requests = await getProjectRequests(req.params.projectId as string, req.user.id);

  res.status(200).json({
    success: true,
    data: requests,
  });
});
