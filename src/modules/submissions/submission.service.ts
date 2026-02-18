import { ApiError } from "../../utils/ApiError.js";
import { Task } from "../tasks/task.model.js";
import { Submission } from "./submission.model.js";

export const submitTaskZip = async (
  taskId: string,
  solverId: string,
  zipUrl: string
) => {
  const task = await Task.findById(taskId);
  if (!task) throw new ApiError(404, "Task not found");

  task.status = "SUBMITTED";
  await task.save();

  const submission = await Submission.create({
    taskId,
    solverId,
    zipUrl,
  });

  return submission;
};
