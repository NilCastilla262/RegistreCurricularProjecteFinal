// controllers/competenciesSDAController.js
import { createCompetenciesAndCriteriaSDAForSubjects } from "../models/competenciesSDAModel.js";

async function createCompetenciesSDAController(req, res) {
  try {
    const { uuidSDA, subjectUUIDs } = req.body;
    if (!uuidSDA || !subjectUUIDs || !Array.isArray(subjectUUIDs)) {
      return res.status(400).json({ error: 'Dades incorrectes: es requereix uuidSDA i subjectUUIDs com a array.' });
    }
    const result = await createCompetenciesAndCriteriaSDAForSubjects(uuidSDA, subjectUUIDs);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error en createCompetenciesSDAController:', error);
    return res.status(500).json({ error: 'Error intern', message: error.message });
  }
}

export { createCompetenciesSDAController };
