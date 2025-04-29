//routes/subjectsRoutes.js
import express from "express";
import { getSubjects } from "../controllers/subjectsController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getSubjects);

export default router;
