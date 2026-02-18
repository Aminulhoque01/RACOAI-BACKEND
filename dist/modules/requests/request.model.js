import { Schema, model } from "mongoose";
const requestSchema = new Schema({
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    solverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
        type: String,
        enum: ["PENDING", "APPROVED", "REJECTED"],
        default: "PENDING",
    },
}, { timestamps: true });
export const RequestModel = model("ProjectRequest", requestSchema);
