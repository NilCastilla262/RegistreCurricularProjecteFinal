// controllers/groupsController.js
const { getGroupsByUserUUID } = require("../models/groupsModel");

async function getGroupsByUser(req, res) {
  try {
    const { uuid } = req.user; 
    const groups = await getGroupsByUserUUID(uuid);
    return res.status(200).json(groups);
  } catch (error) {
    console.error("Error getGroupsByUser:", error);
    return res.status(500).json({ error: "Error getGroupsByUser", message: error.message });
  }
}

module.exports = { getGroupsByUser };
