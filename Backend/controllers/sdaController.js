// controllers/sdaController.js
import { createSDA, getAllSdas, markCriteria } from "../models/sdaModel.js";

async function createSDAController(req, res) {
  try {
    const { uuid } = req.user;
    const { uuidGroup, title, description } = req.body;

    if (!uuidGroup || !title) {
      return res.status(400).json({ error: "Falten camps necessaris (uuidGroup, title...)" });
    }

    const newUUID = await createSDA(uuid, uuidGroup, title, description);

    return res.status(201).json({ message: "SDA creada correctament", uuid: newUUID });
  } catch (error) {
    return res.status(500).json({ error: "Error intern creant SDA", message: error.message });
  }
}

async function getAllSdasController(req, res) {
  try {
    const sdas = await getAllSdas();
    return res.status(200).json(sdas);
  } catch (error) {
    return res.status(500).json({ error: "Error intern", message: error.message });
  }
}

async function markCriteriaController(req, res) {
  try {
    const { uuidSDA, uuidCriteria, worked } = req.body;
    if (!uuidSDA || !uuidCriteria || (worked === undefined)) {
      return res.status(400).json({ error: 'Missing required fields: uuidSDA, uuidCriteria, worked' });
    }
    const result = await markCriteria(uuidSDA, uuidCriteria, worked);
    return res.status(200).json(result);
  } catch (error) {    return res.status(500).json({ error: 'Internal error', message: error.message });
  }
}

export {
  createSDAController,
  getAllSdasController,
  markCriteriaController
};
