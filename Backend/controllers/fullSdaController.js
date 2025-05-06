// controllers/fullSdaController.js
import { getFullSda } from "../models/fullSdaModel.js";

async function getFullSdaController(req, res, next) {
  try {
    const { uuid } = req.params;
    if (!uuid) {
      const err = new Error('Falta la uuid de la SDA');
      err.status = 400;
      throw err;
    }
    const fullSdaJson = await getFullSda(uuid);
    let parsedSda;
    if (typeof fullSdaJson === 'string') {
      parsedSda = JSON.parse(fullSdaJson);
    } else {
      parsedSda = fullSdaJson;
    }
    return res.status(200).json(parsedSda);
  } catch (error) {
    console.error('Error en getFullSdaController:', error);
    next(error);
  }
}

export { getFullSdaController };
