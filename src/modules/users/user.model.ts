import { Schema, model } from "mongoose";

export type UserRole = "ADMIN" | "BUYER" | "SOLVER";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["ADMIN", "BUYER", "SOLVER"],
      default: "SOLVER",
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
