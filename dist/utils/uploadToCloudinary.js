import cloudinary from "../config/cloudinary.js";
export const uploadZipToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({
            resource_type: "raw",
            folder: "racoai-submissions",
            format: "zip",
        }, (error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        })
            .end(fileBuffer);
    });
};
