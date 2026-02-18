import { User } from "./user.model.js";
import { ApiError } from "../../utils/ApiError.js";
export const getAllUsers = async () => {
    return await User.find().select("-password");
};
export const updateUserRole = async (userId, role) => {
    const user = await User.findById(userId);
    if (!user)
        throw new ApiError(404, "User not found");
    user.role = role;
    await user.save();
    return user;
};
