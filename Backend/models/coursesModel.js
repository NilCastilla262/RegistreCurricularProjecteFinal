// models/coursesModel.js
const { poolPromise } = require('../config/db');

async function getTemplateNameByCourse(courseName) {
  const pool = await poolPromise;
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

module.exports = { getTemplateNameByCourse };
