import { ApiError } from "../../utils/ApiError.js";
import { Project } from "../projects/project.model.js";
import { RequestModel } from "./request.model.js";

export const createRequest = async (projectId: string, solverId: string) => {
  const project = await Project.findById(projectId);
  if (!project) throw new ApiError(404, "Project not found");

  if (project.status !== "OPEN") throw new ApiError(400, "Project is not open");

  const existing = await RequestModel.findOne({ projectId, solverId });
  if (existing) throw new ApiError(400, "Already requested");

  return await RequestModel.create({ projectId, solverId });
};

export const getProjectRequests = async (projectId: string, buyerId: string) => {
  const project = await Project.findById(projectId);
  if (!project) throw new ApiError(404, "Project not found");

  if (project.buyerId.toString() !== buyerId) {
    throw new ApiError(403, "Not your project");
  }

  return await RequestModel.find({ projectId }).populate("solverId", "name email");
};
