import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
export const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        throw new ApiError(401, "Not authorized, token missing");
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        throw new ApiError(401, "Invalid token");
    }
};
