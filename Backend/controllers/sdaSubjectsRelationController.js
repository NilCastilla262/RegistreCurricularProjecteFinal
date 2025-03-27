// controllers/sdaSubjectsRelationController.js
const { createSdaSubjectRelation } = require("../models/sdaSubjectsRelationModel");

async function createSdaSubjectRelationController(req, res) {
  try {
    const { uuidSDA, uuidSubject } = req.body;
    if (!uuidSDA || !uuidSubject) {
      return res.status(400).json({ error: "Falten uuidSDA o uuidSubject" });
    }
    await createSdaSubjectRelation(uuidSDA, uuidSubject);
    return res.status(201).json({ message: "Relació creada correctament" });
  } catch (error) {
    console.error("Error creant la relació SDASubjectsRelation:", error);
    return res.status(500).json({
      error: "Error intern",
      message: error.message
    });
  }
}

module.exports = { createSdaSubjectRelationController };