// routes/authRoutes.js
import express from "express";
import { googleLoginController, chooseCenterController, listMyCentersController } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/google-login", googleLoginController);
router.post("/choose-center", chooseCenterController);
router.get("/my-centers", verifyToken, listMyCentersController);

export default router;
