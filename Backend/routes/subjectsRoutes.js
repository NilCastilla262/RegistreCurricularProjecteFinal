// routes/subjectsRoutes.js
const express = require("express");
const { getSubjects } = require("../controllers/subjectsController");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/", verifyToken, getSubjects);

module.exports = router;
