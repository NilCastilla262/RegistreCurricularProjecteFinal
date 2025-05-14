// routes/sdaSubjectsRelationRoutes.js
import express from "express";
import { createSdaSubjectRelationsController } from "../controllers/sdaSubjectsRelationController.js";

const router = express.Router();

router.post("/", createSdaSubjectRelationsController);

export default router;
