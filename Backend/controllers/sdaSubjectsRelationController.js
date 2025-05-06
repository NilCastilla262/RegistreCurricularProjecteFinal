// controllers/sdaSubjectsRelationController.js
import { createSdaSubjectRelation } from "../models/sdaSubjectsRelationModel.js";

async function createSdaSubjectRelationsController(req, res, next) {
  try {
    const { uuidSDA, subjectUUIDs } = req.body;
    if (!uuidSDA || !subjectUUIDs || !Array.isArray(subjectUUIDs)) {
      const err = new Error("Dades incorrectes: es requereix uuidSDA i subjectUUIDs com a array.");
      err.status = 400;
      throw err;
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
    next(error);
  }
}

export { createSdaSubjectRelationsController };
