// controllers/sdaController.js
import { createSDA, getAllSdas, markCriteria } from "../models/sdaModel.js";

async function createSDAController(req, res, next) {
  try {
    const { uuid } = req.user;
    const { uuidGroup, title, description } = req.body;

    if (!uuidGroup || !title) {
      const err = new Error("Falten camps necessaris (uuidGroup, title...)");
      err.status = 400;
      throw err;
    }

    const newUUID = await createSDA(uuid, uuidGroup, title, description);

    return res.status(201).json({ message: "SDA creada correctament", uuid: newUUID });
  } catch (error) {
    next(error);
  }
}

async function getAllSdasController(req, res, next) {
  try {
    const { page, limit, sortBy, sortOrder } = req.query;

    const sdas = await getAllSdas({ page, limit, sortBy, sortOrder });
    return res.status(200).json({
      page:     parseInt(page, 10) || 1,
      limit:    parseInt(limit, 10) || 10,
      sortBy:   sortBy || 'title',
      sortOrder: sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
      data:     sdas
    });
  } catch (error) {
    next(error);
  }
}


async function markCriteriaController(req, res, next) {
  try {
    const { uuidSDA, uuidCriteria, worked } = req.body;
    if (!uuidSDA || !uuidCriteria || (worked === undefined)) {
      const err = new Error('Missing required fields: uuidSDA, uuidCriteria, worked');
      err.status = 400;
      throw err;
    }
    const result = await markCriteria(uuidSDA, uuidCriteria, worked);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export {
  createSDAController,
  getAllSdasController,
  markCriteriaController
};
