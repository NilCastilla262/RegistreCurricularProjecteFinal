// controllers/subjectsController.js
const { getSubjectsByTemplate } = require("../models/subjectsModel");

async function getSubjects(req, res) {
  try {
    const { templateName } = req.query;
    if (!templateName) {
      return res.status(400).json({ error: "Falta el camp templateName" });
    }

    const subjects = await getSubjectsByTemplate(templateName);
    return res.status(200).json(subjects);
  } catch (error) {
    console.error("Error getSubjects:", error);
    return res.status(500).json({ error: "Error getSubjects", message: error.message });
  }
}

module.exports = { getSubjects };
