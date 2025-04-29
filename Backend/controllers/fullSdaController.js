// controllers/fullSdaController.js
import { getFullSda } from "../models/fullSdaModel.js";

async function getFullSdaController(req, res) {
  try {
    const { uuid } = req.params;
    if (!uuid) {
      return res.status(400).json({ error: 'Falta la uuid de la SDA' });
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
    return res.status(500).json({ error: 'Error intern', message: error.message });
  }
}

export { getFullSdaController };
