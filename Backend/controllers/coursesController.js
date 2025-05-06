// controllers/coursesController.js
import { getTemplateNameByCourse } from "../models/coursesModel.js";

async function getTemplateByCourseName(req, res, next) {
  try {
    const { courseName } = req.params;
    const templateName = await getTemplateNameByCourse(courseName);

    if (!templateName) {
      const err = new Error('No s\'ha trobat el curs o no té template assignat');
      err.status = 404;
      throw err;
    }

    return res.status(200).json({ templateName });
  } catch (error) {
    next(error);
  }
}

export { getTemplateByCourseName };
