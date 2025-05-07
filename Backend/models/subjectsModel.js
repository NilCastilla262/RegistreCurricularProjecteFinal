// models/subjectsModel.js
import { getConnection } from "../config/db.js";

async function getSubjectsByTemplate(templateName) {
  const pool = await getConnection();
  const result = await pool.request()
    .input("TemplateName", templateName)
    .query(`
      SELECT UUID, Name, TemplateName, Type
      FROM SubjectsTPL
      WHERE TemplateName = @TemplateName
      ORDER BY Name ASC
    `);

  return result.recordset;
}

export {
  getSubjectsByTemplate
};
