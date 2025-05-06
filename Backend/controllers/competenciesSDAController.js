// controllers/competenciesSDAController.js
import { createCompetenciesAndCriteriaSDAForSubjects } from "../models/competenciesSDAModel.js";

async function createCompetenciesSDAController(req, res, next) {
  try {
    const { uuidSDA, subjectUUIDs } = req.body;
    if (!uuidSDA || !subjectUUIDs || !Array.isArray(subjectUUIDs)) {
      const err = new Error('Dades incorrectes: es requereix uuidSDA i subjectUUIDs com a array.');
      err.status = 400;
      throw err;
    }
    const result = await createCompetenciesAndCriteriaSDAForSubjects(uuidSDA, subjectUUIDs);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export { createCompetenciesSDAController };
