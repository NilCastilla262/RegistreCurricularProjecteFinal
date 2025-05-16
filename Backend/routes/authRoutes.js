// routes/authRoutes.js
import express from "express";
import { googleLoginController, chooseCenterController, listMyCentersController, chooseCenterControllerProtected } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/google-login", googleLoginController);
router.post("/choose-center", chooseCenterController);
router.get("/my-centers", verifyToken, listMyCentersController);
router.post("/choose-center-protected", chooseCenterControllerProtected);

export default router;
