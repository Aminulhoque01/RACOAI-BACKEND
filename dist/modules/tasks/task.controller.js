import { catchAsync } from "../../utils/catchAsync.js";
import { createTask, getTasksByProject } from "./task.service.js";
export const addTask = catchAsync(async (req, res) => {
    const task = await createTask(req.params.projectId, req.user.id, req.body);
    res.status(201).json({
        success: true,
        message: "Task created",
        data: task,
    });
});
export const getProjectTasks = catchAsync(async (req, res) => {
    const tasks = await getTasksByProject(req.params.projectId);
    res.status(200).json({
        success: true,
        data: tasks,
    });
});
