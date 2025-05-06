// controllers/subjectsController.js
import { getSubjectsByTemplate } from "../models/subjectsModel.js";

async function getSubjects(req, res, next) {
  try {
    const { templateName } = req.query;
    if (!templateName) {
      const err = new Error("Falta el camp templateName");
      err.status = 400;
      throw err;
    }

    const subjects = await getSubjectsByTemplate(templateName);
    return res.status(200).json(subjects);
  } catch (error) {
    next(error);
  }
}

export { getSubjects };
