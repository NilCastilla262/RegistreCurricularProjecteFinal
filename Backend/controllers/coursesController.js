// controllers/coursesController.js
import { getTemplateNameByCourse } from "../models/coursesModel.js";

async function getTemplateByCourseName(req, res) {
  try {
    const { courseName } = req.params;
    const templateName = await getTemplateNameByCourse(courseName);

    if (!templateName) {
      return res.status(404).json({ error: 'No s\'ha trobat el curs o no té template assignat' });
    }

    return res.status(200).json({ templateName });
  } catch (error) {
    console.error('Error getTemplateByCourseName:', error);
    return res.status(500).json({ error: 'Error intern', message: error.message });
  }
}

export { getTemplateByCourseName };
