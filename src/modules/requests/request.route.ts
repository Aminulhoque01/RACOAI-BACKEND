import { Router } from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { requestProject, viewProjectRequests } from "./request.controller.js";

const router = Router();

// solver requests
router.post("/:projectId", protect, authorize("SOLVER"), requestProject);

// buyer views requests
router.get("/:projectId", protect, authorize("BUYER"), viewProjectRequests);

export const requestRoutes = router;
