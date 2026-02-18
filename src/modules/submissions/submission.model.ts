import { Schema, model, Types } from "mongoose";

export interface ISubmission {
  taskId: Types.ObjectId;
  solverId: Types.ObjectId;
  zipUrl: string;
}

const submissionSchema = new Schema<ISubmission>(
  {
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    solverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    zipUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const Submission = model<ISubmission>("Submission", submissionSchema);
