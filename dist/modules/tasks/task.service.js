import { ApiError } from "../../utils/ApiError.js";
import { Project } from "../projects/project.model.js";
import { Task } from "./task.model.js";
export const createTask = async (projectId, solverId, payload) => {
    const project = await Project.findById(projectId);
    if (!project)
        throw new ApiError(404, "Project not found");
    if (!project.assignedSolverId)
        throw new ApiError(400, "Project not assigned");
    if (project.assignedSolverId.toString() !== solverId) {
        throw new ApiError(403, "You are not assigned to this project");
    }
    if (project.status === "ASSIGNED") {
        project.status = "IN_PROGRESS";
        await project.save();
    }
    return await Task.create({
        projectId,
        title: payload.title,
        description: payload.description,
        deadline: payload.deadline,
    });
};
export const getTasksByProject = async (projectId) => {
    return await Task.find({ projectId });
};
