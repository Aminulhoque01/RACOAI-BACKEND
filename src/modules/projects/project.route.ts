import { Router } from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import {
  assignSolver,
  createNewProject,
  myProjects,
  openProjects,
} from "./project.controller.js";

const router = Router();

// buyer
router.post("/", protect, authorize("BUYER"), createNewProject);
router.get("/my", protect, authorize("BUYER"), myProjects);

// solver browse
router.get("/open", protect, authorize("SOLVER"), openProjects);

// buyer assign solver
router.post("/:id/assign", protect, authorize("BUYER"), assignSolver);

export const projectRoutes = router;
