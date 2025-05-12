// controllers/groupsController.js
import { getGroupsByUserUUID, getResumeForGroups, getByCenterAndYear, createGroup, updateGroupName } from "../models/groupsModel.js";
import { getCurrentAcademicYear } from "../utils/date.utils.js";

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

async function createGroupController(req, res, next) {
  try {
    const { Name, CourseName } = req.body;

    if (!Name || !CourseName) {
      const err = new Error("Cal indicar Name i CourseName");
      err.status = 400;
      throw err;
    }
    if (Name.length > 30 || CourseName.length > 20) {
      const err = new Error("Name (max 30) o CourseName (max 20) massa llargs");
      err.status = 400;
      throw err;
    }

    const centerName = req.user.centerName;
    const Year = getCurrentAcademicYear();

    const newGroup = await createGroup(centerName, Name, CourseName, Year);
    return res.status(201).json(newGroup);
  } catch (error) {
    next(error);
  }
}

async function updateGroupController(req, res, next) {
  try {
    const { uuid } = req.params;
    const { Name } = req.body;
    const centerName = req.user.centerName;

    if (!Name) {
      const err = new Error("Cal indicar el camp Name");
      err.status = 400;
      throw err;
    }
    if (typeof Name !== "string" || Name.trim().length === 0) {
      const err = new Error("Name ha de ser una cadena no buida");
      err.status = 400;
      throw err;
    }
    if (Name.length > 30) {
      const err = new Error("Name no pot superar 30 caràcters");
      err.status = 400;
      throw err;
    }

    const updated = await updateGroupName(uuid, centerName, Name.trim());
    if (!updated) {
      const err = new Error("Grup no trobat o no pertany al teu centre");
      err.status = 404;
      throw err;
    }

    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
}

export { 
  getGroupsByUser,
  getResumeController,
  getByCenterAndYearController,
  createGroupController,
  updateGroupController
};
