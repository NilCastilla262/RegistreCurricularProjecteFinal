const express = require("express");
const router = express.Router();
const { getFullSdaController } = require("../controllers/fullSdaController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/:uuid", verifyToken, getFullSdaController);

module.exports = router;
