// routes/coursesRoutes.js
import express from "express";
import { getTemplateByCourseName } from "../controllers/coursesController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/:courseName/template', verifyToken, getTemplateByCourseName);

export default router;
