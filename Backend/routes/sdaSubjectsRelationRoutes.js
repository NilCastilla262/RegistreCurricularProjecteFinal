// routes/sdaSubjectsRelationRoutes.js
const express = require("express");
const router = express.Router();
const { createSdaSubjectRelationsController } = require("../controllers/sdaSubjectsRelationController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/", verifyToken, createSdaSubjectRelationsController);

module.exports = router;
