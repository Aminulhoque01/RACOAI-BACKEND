import { catchAsync } from "../../utils/catchAsync.js";
import { getAllUsers, updateUserRole } from "./user.service.js";
export const getUsers = catchAsync(async (req, res) => {
    const users = await getAllUsers();
    res.status(200).json({
        success: true,
        data: users,
    });
});
export const changeRole = catchAsync(async (req, res) => {
    const { role } = req.body;
    const userId = req.params.id;
    const updated = await updateUserRole(userId, role);
    res.status(200).json({
        success: true,
        message: "Role updated",
        data: updated,
    });
});
