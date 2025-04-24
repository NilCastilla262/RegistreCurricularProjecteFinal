// routes/groupsRoutes.js
const express = require("express");
const { getGroupsByUser, getResumeController, getByCenterAndYearController } = require("../controllers/groupsController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { extractCenterName } = require("../middlewares/centerMiddleware");

const router = express.Router();

router.get("/", verifyToken, getGroupsByUser);
router.get("/resume", verifyToken, getResumeController);
router.get("/center", verifyToken, extractCenterName, getByCenterAndYearController);
module.exports = router;
