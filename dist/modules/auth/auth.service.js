import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../users/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
export const registerUser = async (payload) => {
    const { name, email, password, role } = payload;
    const existing = await User.findOne({ email });
    if (existing)
        throw new ApiError(400, "Email already exists");
    const hashed = await bcrypt.hash(password, 10);
    const allowedRoles = ["ADMIN", "BUYER", "SOLVER"];
    if (role && !allowedRoles.includes(role)) {
        throw new ApiError(400, "Invalid role");
    }
    const user = await User.create({
        name,
        email,
        password: hashed,
        role: role || "SOLVER",
    });
    return user;
};
export const loginUser = async (payload) => {
    const { email, password } = payload;
    const user = await User.findOne({ email });
    if (!user)
        throw new ApiError(404, "User not found");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        throw new ApiError(401, "Invalid credentials");
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    if (!process.env.JWT_EXPIRES_IN) {
        throw new Error("JWT_EXPIRES_IN is not defined");
    }
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return { token, user };
};
