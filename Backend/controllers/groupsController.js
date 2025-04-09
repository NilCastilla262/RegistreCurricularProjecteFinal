// controllers/groupsController.js
const { getGroupsByUserUUID, getResumeForGroups } = require("../models/groupsModel");

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

async function getResumeController(req, res) {
  try {
    let { groups } = req.query;
    
    if (!groups) {
      return res.status(400).json({ error: "Es requereix un array de UUIDs de grups" });
    }
    
    if (typeof groups === 'string') {
      groups = groups.split(',').map(s => s.trim());
    }
    
    if (!Array.isArray(groups) || groups.length === 0) {
      return res.status(400).json({ error: "Es requereix un array de UUIDs de grups" });
    }
    
    const resume = await getResumeForGroups(groups);
    return res.status(200).json(resume);
  } catch (error) {
    console.error("Error in getResumeController:", error);
    return res.status(500).json({ error: "Internal server error", message: error.message });
  }
}

module.exports = { 
  getGroupsByUser,
  getResumeController,
 };
