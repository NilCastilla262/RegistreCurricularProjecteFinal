// models/coursesModel.js
import { getConnection } from "../config/db.js";

async function getTemplateNameByCourse(courseName) {
  const pool = await getConnection();
  const result = await pool.request()
    .input('courseName', courseName)
    .query(`
      SELECT TemplateName
      FROM Courses
      WHERE Name = @courseName
    `);
  if (result.recordset.length === 0) {
    return null;
  }
  return result.recordset[0].TemplateName;
}

export { getTemplateNameByCourse };
