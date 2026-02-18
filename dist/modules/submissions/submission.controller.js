import { catchAsync } from "../../utils/catchAsync.js";
import { ApiError } from "../../utils/ApiError.js";
import { submitTaskZip } from "./submission.service.js";
import { uploadZipToCloudinary } from "../../utils/uploadToCloudinary.js";
export const submitZip = catchAsync(async (req, res) => {
    if (!req.file)
        throw new ApiError(400, "ZIP file required");
    const cloudinaryResult = await uploadZipToCloudinary(req.file.buffer);
    const zipUrl = cloudinaryResult.secure_url;
    const submission = await submitTaskZip(req.params.taskId, req.user.id, zipUrl);
    res.status(201).json({
        success: true,
        message: "Submission uploaded successfully",
        data: submission,
    });
});
