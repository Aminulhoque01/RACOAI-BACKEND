import { Schema, model, Types } from "mongoose";

export type TaskStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "SUBMITTED"
  | "ACCEPTED"
  | "REJECTED";

export interface ITask {
  projectId: Types.ObjectId;
  title: string;
  description: string;
  deadline: Date;
  status: TaskStatus;
}

const taskSchema = new Schema<ITask>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },

    status: {
      type: String,
      enum: ["PENDING", "IN_PROGRESS", "SUBMITTED", "ACCEPTED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export const Task = model<ITask>("Task", taskSchema);
