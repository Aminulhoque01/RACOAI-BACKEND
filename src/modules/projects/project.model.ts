import { Schema, model, Types } from "mongoose";

export type ProjectStatus = "OPEN" | "ASSIGNED" | "IN_PROGRESS" | "COMPLETED";

export interface IProject {
  buyerId: Types.ObjectId;
  title: string;
  description: string;
  status: ProjectStatus;
  assignedSolverId?: Types.ObjectId;
}

const projectSchema = new Schema<IProject>(
  {
    buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },

    status: {
      type: String,
      enum: ["OPEN", "ASSIGNED", "IN_PROGRESS", "COMPLETED"],
      default: "OPEN",
    },

    assignedSolverId: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

export const Project = model<IProject>("Project", projectSchema);


