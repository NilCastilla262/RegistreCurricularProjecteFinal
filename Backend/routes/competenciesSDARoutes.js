// controllers/competenciesSDARoutes.js
import express from "express";
import { createCompetenciesSDAController } from "../controllers/competenciesSDAController.js";

const router = express.Router();

router.post("", createCompetenciesSDAController);

export default router;