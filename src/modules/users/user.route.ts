import { Router } from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { changeRole, getUsers } from "./user.controller.js";

const router = Router();

// Admin only
router.get("/", protect, authorize("ADMIN"), getUsers);
router.patch("/:id/role", protect, authorize("ADMIN"), changeRole);

export const userRoutes = router;
