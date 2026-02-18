import dotenv from "dotenv";
dotenv.config();
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
if (!JWT_SECRET)
    throw new Error("JWT_SECRET missing");
if (!JWT_EXPIRES_IN)
    throw new Error("JWT_EXPIRES_IN missing");
