import { Schema, model } from "mongoose";
const projectSchema = new Schema({
    buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ["OPEN", "ASSIGNED", "IN_PROGRESS", "COMPLETED"],
        default: "OPEN",
    },
    assignedSolverId: { type: Schema.Types.ObjectId, ref: "User", default: null },
}, { timestamps: true });
export const Project = model("Project", projectSchema);
