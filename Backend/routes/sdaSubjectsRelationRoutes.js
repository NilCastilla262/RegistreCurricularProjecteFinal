// routes/sdaSubjectsRelationRoutes.js
const express = require("express");
const router = express.Router();
const { createSdaSubjectRelationController } = require("../controllers/sdaSubjectsRelationController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/", verifyToken, createSdaSubjectRelationController);

module.exports = router;
