import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { authRoutes } from "./modules/auth/auth.route.js";
import { userRoutes } from "./modules/users/user.route.js";
import { projectRoutes } from "./modules/projects/project.route.js";
import { requestRoutes } from "./modules/requests/request.route.js";
import { taskRoutes } from "./modules/tasks/task.route.js";
import path from "path";
import { submissionRoutes } from "./modules/submissions/submission.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://racoai-frontend.vercel.app"
    ],
    credentials: true,
  })
);
app.use(express.json());
 

 
 

// MongoDB Connect Function
const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("❌ MONGO_URI is not defined in .env file");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "🚀 RacoAI Backend Running Successfully!" });
});


 

//routes

app.use("/auth",authRoutes)
app.use("/user",userRoutes)
app.use("/project",projectRoutes)
app.use("/request",requestRoutes)
app.use("/task",taskRoutes)
app.use("/submission",submissionRoutes)


app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));


// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({
    message: err.message || "Internal Server Error"
  });
});

 

// Server Start
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
