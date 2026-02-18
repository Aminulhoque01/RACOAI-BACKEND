import { catchAsync } from "../../utils/catchAsync.js";
import { createRequest, getProjectRequests } from "./request.service.js";
export const requestProject = catchAsync(async (req, res) => {
    const request = await createRequest(req.params.projectId, req.user.id);
    res.status(201).json({
        success: true,
        message: "Request submitted",
        data: request,
    });
});
export const viewProjectRequests = catchAsync(async (req, res) => {
    const requests = await getProjectRequests(req.params.projectId, req.user.id);
    res.status(200).json({
        success: true,
        data: requests,
    });
});
