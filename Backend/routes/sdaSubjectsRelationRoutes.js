// routes/sdaSubjectsRelationRoutes.js
import express from "express";
import { createSdaSubjectRelationsController } from "../controllers/sdaSubjectsRelationController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createSdaSubjectRelationsController);

export default router;
