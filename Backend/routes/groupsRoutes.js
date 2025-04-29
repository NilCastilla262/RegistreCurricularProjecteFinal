// routes/groupsRoutes.js
import express from "express";
import { getGroupsByUser, getResumeController, getByCenterAndYearController } from "../controllers/groupsController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { extractCenterName } from "../middlewares/centerMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getGroupsByUser);
router.get("/resume", verifyToken, getResumeController);
router.get("/center", verifyToken, extractCenterName, getByCenterAndYearController);
export default router;
