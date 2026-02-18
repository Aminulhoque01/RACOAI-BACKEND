import { Schema, model } from "mongoose";
const submissionSchema = new Schema({
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    solverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    zipUrl: { type: String, required: true },
}, { timestamps: true });
export const Submission = model("Submission", submissionSchema);
