// controllers/sdaController.js
const { createSDA } = require("../models/sdaModel");

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
    console.error("Error createSDAController:", error);
    return res.status(500).json({ error: "Error intern creant SDA", message: error.message });
  }
}

module.exports = {
  createSDAController
};
