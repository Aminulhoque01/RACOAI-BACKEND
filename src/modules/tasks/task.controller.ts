import { Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { AuthRequest } from "../../middlewares/auth.middleware.js";
import { createTask, getTasksByProject } from "./task.service.js";

export const addTask = catchAsync(async (req: AuthRequest, res: Response) => {
  const task = await createTask(req.params.projectId as string, req.user.id, req.body);

  res.status(201).json({
    success: true,
    message: "Task created",
    data: task,
  });
});

export const getProjectTasks = catchAsync(async (req:any, res: Response) => {
  const tasks = await getTasksByProject(req.params.projectId);

  res.status(200).json({
    success: true,
    data: tasks,
  });
});
