import multer from "multer";
import { ApiError } from "../../utils/ApiError.js";
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (file.mimetype !== "application/zip" &&
        file.mimetype !== "application/x-zip-compressed") {
        return cb(new ApiError(400, "Only ZIP files allowed"), false);
    }
    cb(null, true);
};
export const uploadZip = multer({
    storage,
    fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
});
