// controllers/sdaSubjectsRelationController.js
const { createSdaSubjectRelation } = require("../models/sdaSubjectsRelationModel");

async function createSdaSubjectRelationsController(req, res) {
  try {
    const { uuidSDA, subjectUUIDs } = req.body;
    if (!uuidSDA || !subjectUUIDs || !Array.isArray(subjectUUIDs)) {
      return res.status(400).json({ error: "Dades incorrectes: es requereix uuidSDA i subjectUUIDs com a array." });
    }

    const createdSubjects = [];
    for (const subjectUUID of subjectUUIDs) {
      await createSdaSubjectRelation(uuidSDA, subjectUUID);
      createdSubjects.push(subjectUUID);
    }

    return res.status(201).json({ 
      message: "Relacions creades correctament", 
      subjectUUIDs: createdSubjects 
    });
  } catch (error) {
    console.error("Error en createSdaSubjectRelationsController:", error);
    return res.status(500).json({ error: "Error intern", message: error.message });
  }
}

module.exports = { createSdaSubjectRelationsController };
