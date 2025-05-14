//routes/subjectsRoutes.js
import express from "express";
import { getSubjects } from "../controllers/subjectsController.js";

const router = express.Router();

router.get("/", getSubjects);

export default router;
