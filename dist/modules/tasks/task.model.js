import { Schema, model } from "mongoose";
const taskSchema = new Schema({
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: {
        type: String,
        enum: ["PENDING", "IN_PROGRESS", "SUBMITTED", "ACCEPTED", "REJECTED"],
        default: "PENDING",
    },
}, { timestamps: true });
export const Task = model("Task", taskSchema);
