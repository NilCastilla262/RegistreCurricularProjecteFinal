// routes/groupsRoutes.js
const express = require("express");
const { getGroupsByUser } = require("../controllers/groupsController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getGroupsByUser);

module.exports = router;
