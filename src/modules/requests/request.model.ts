import { Schema, model, Types } from "mongoose";

export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface IRequest {
  projectId: Types.ObjectId;
  solverId: Types.ObjectId;
  status: RequestStatus;
}

const requestSchema = new Schema<IRequest>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    solverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export const RequestModel = model<IRequest>("ProjectRequest", requestSchema);
