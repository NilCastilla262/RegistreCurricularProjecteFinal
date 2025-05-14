// routes/coursesRoutes.js
import express from "express";
import { getTemplateByCourseName } from "../controllers/coursesController.js";

const router = express.Router();

router.get('/:courseName/template', getTemplateByCourseName);

export default router;
