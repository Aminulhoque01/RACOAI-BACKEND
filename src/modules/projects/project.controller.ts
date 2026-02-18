import { Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { ApiError } from "../../utils/ApiError.js";
import { AuthRequest } from "../../middlewares/auth.middleware.js";
import {
  assignSolverToProject,
  createProject,
  getBuyerProjects,
  getOpenProjects,
} from "./project.service.js";
import { assignSolverSchema, createProjectSchema } from "./project.validation.js";

export const createNewProject = catchAsync(async (req: AuthRequest, res: Response) => {
  const parsed = createProjectSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, parsed.error.message);

  const project = await createProject(req.user.id, parsed.data);

  res.status(201).json({
    success: true,
    message: "Project created",
    data: project,
  });
});

export const myProjects = catchAsync(async (req: AuthRequest, res: Response) => {
  const projects = await getBuyerProjects(req.user.id);

  res.status(200).json({
    success: true,
    data: projects,
  });
});

export const openProjects = catchAsync(async (req:any, res: Response) => {
  const projects = await getOpenProjects();

  res.status(200).json({
    success: true,
    data: projects,
  });
});

export const assignSolver = catchAsync(async (req: AuthRequest, res: Response) => {
  const parsed = assignSolverSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, parsed.error.message);

  const project = await assignSolverToProject(
    req.params.id as string,
    req.user.id,
    parsed.data.solverId
  );

  res.status(200).json({
    success: true,
    message: "Solver assigned successfully",
    data: project,
  });
});
