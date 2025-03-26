// routes/coursesRoutes.js
const express = require('express');
const router = express.Router();
const { getTemplateByCourseName } = require('../controllers/coursesController');

router.get('/:courseName/template', getTemplateByCourseName);

module.exports = router;
