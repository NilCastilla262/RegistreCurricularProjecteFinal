// routes/groupsRoutes.js
const express = require("express");
const { getGroupsByUser, getResumeController } = require("../controllers/groupsController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getGroupsByUser);
router.post("/resume", verifyToken, getResumeController);

module.exports = router;
