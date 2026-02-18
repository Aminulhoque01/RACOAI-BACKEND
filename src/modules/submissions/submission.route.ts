import { Router } from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { submitZip } from "./submission.controller.js";
import { uploadZip } from "./multer.js";

const router = Router();

router.post(
  "/:taskId",
  protect,
  authorize("SOLVER"),
  uploadZip.single("file"),
  submitZip
);

export const submissionRoutes = router;
