// routes/groupsRoutes.js
import express from "express";
import { getGroupsByUser, getResumeController, getByCenterAndYearController, createGroupController, updateGroupController } from "../controllers/groupsController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { extractCenterName } from "../middlewares/centerMiddleware.js";
import { requireCenterAdmin } from "../middlewares/centerAdminMiddleware.js";
const router = express.Router();

router.get("/", verifyToken, getGroupsByUser);
router.get("/resume", verifyToken, getResumeController);
router.get("/center", verifyToken, extractCenterName, getByCenterAndYearController);
router.post("/", verifyToken, requireCenterAdmin, createGroupController);
router.put("/:uuid", verifyToken, requireCenterAdmin, extractCenterName, updateGroupController);

export default router;
