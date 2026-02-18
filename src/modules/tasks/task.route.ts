import { Router } from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { addTask, getProjectTasks } from "./task.controller.js";

const router = Router();

// solver creates tasks
router.post("/:projectId", protect, authorize("SOLVER"), addTask);

// buyer + solver can view tasks (simple for now)
router.get("/:projectId", protect, getProjectTasks);

export const taskRoutes = router;
