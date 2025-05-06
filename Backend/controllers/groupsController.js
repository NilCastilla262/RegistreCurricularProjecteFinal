// controllers/groupsController.js
import { getGroupsByUserUUID, getResumeForGroups, getByCenterAndYear } from "../models/groupsModel.js";

async function getGroupsByUser(req, res, next) {
  try {
    const { uuid } = req.user; 
    const groups = await getGroupsByUserUUID(uuid);
    return res.status(200).json(groups);
  } catch (error) {
    console.error("Error getGroupsByUser:", error);
    next(error);
  }
}

async function getResumeController(req, res, next) {
  try {
    let { groups } = req.query;
    
    if (!groups) {
      const err = new Error("Es requereix un array de UUIDs de grups");
      err.status = 400;
      throw err;
    }
    
    if (typeof groups === 'string') {
      groups = groups.split(',').map(s => s.trim());
    }
    
    if (!Array.isArray(groups) || groups.length === 0) {
      const err = new Error("Es requereix un array de UUIDs de grups");
      err.status = 400;
      throw err;
    }
    
    const resume = await getResumeForGroups(groups);
    return res.status(200).json(resume);
  } catch (error) {
    next(error);
  }
}

async function getByCenterAndYearController(req, res, next) {
  const year = req.query.year;
  if (!year) {
    const err = new Error("Cal indicar ?year=YYYY-YYYY");
    err.status = 400;
    return next(err);
  }

  try {
    const centerName = req.centerName;
    const rows = await getByCenterAndYear(centerName, year);
    return res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

export { 
  getGroupsByUser,
  getResumeController,
  getByCenterAndYearController,
};
