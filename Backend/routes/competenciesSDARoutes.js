// controllers/competenciesSDARoutes.js
import express from "express";
import { createCompetenciesSDAController } from "../controllers/competenciesSDAController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("", verifyToken, createCompetenciesSDAController);

export default router;