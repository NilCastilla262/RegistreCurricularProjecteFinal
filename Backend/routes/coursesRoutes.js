// routes/coursesRoutes.js
const express = require('express');
const router = express.Router();
const { getTemplateByCourseName } = require('../controllers/coursesController');
const { verifyToken } = require("../middlewares/authMiddleware");

router.get('/:courseName/template', verifyToken, getTemplateByCourseName);

module.exports = router;
