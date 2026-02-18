import { catchAsync } from "../../utils/catchAsync.js";
import { ApiError } from "../../utils/ApiError.js";
import { assignSolverToProject, createProject, getBuyerProjects, getOpenProjects, } from "./project.service.js";
import { assignSolverSchema, createProjectSchema } from "./project.validation.js";
export const createNewProject = catchAsync(async (req, res) => {
    const parsed = createProjectSchema.safeParse(req.body);
    if (!parsed.success)
        throw new ApiError(400, parsed.error.message);
    const project = await createProject(req.user.id, parsed.data);
    res.status(201).json({
        success: true,
        message: "Project created",
        data: project,
    });
});
export const myProjects = catchAsync(async (req, res) => {
    const projects = await getBuyerProjects(req.user.id);
    res.status(200).json({
        success: true,
        data: projects,
    });
});
export const openProjects = catchAsync(async (req, res) => {
    const projects = await getOpenProjects();
    res.status(200).json({
        success: true,
        data: projects,
    });
});
export const assignSolver = catchAsync(async (req, res) => {
    const parsed = assignSolverSchema.safeParse(req.body);
    if (!parsed.success)
        throw new ApiError(400, parsed.error.message);
    const project = await assignSolverToProject(req.params.id, req.user.id, parsed.data.solverId);
    res.status(200).json({
        success: true,
        message: "Solver assigned successfully",
        data: project,
    });
});
