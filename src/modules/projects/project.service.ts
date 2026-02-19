import { Project } from "./project.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { RequestModel } from "../requests/request.model.js";
 

export const createProject = async (buyerId: string, payload: any) => {
  return await Project.create({
    buyerId,
    title: payload.title,
    description: payload.description,
    status: "OPEN",
  });
};

export const getBuyerProjects = async (buyerId: string) => {
  return await Project.find({ buyerId }).populate("assignedSolverId", "name email role");
};

export const getOpenProjects = async () => {
  return await Project.find({ status: "OPEN" }).populate("buyerId", "name email");
};
export const getallProjects = async () => {
  return await Project.find().populate("buyerId", "name email");
};

export const assignSolverToProject = async (
  projectId: string,
  buyerId: string,
  solverId: string
) => {
  const project = await Project.findById(projectId);

  if (!project) throw new ApiError(404, "Project not found");
  if (project.buyerId.toString() !== buyerId) throw new ApiError(403, "Not your project");
  if (project.status !== "OPEN") throw new ApiError(400, "Project is not open");

  project.assignedSolverId = solverId as any;
  project.status = "ASSIGNED";
  await project.save();

  // approve selected request
  await RequestModel.updateMany(
    { projectId },
    { status: "REJECTED" }
  );

  await RequestModel.findOneAndUpdate(
    { projectId, solverId },
    { status: "APPROVED" }
  );

  return project;
};
