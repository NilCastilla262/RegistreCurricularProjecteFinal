// models/subjectsModel.js
const { poolPromise } = require("../config/db");

async function getSubjectsByTemplate(templateName) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input("TemplateName", templateName)
    .query(`
      SELECT UUID, Name, TemplateName, Type
      FROM SubjectsTPL
      WHERE TemplateName = @TemplateName
    `);

  return result.recordset;
}

module.exports = {
  getSubjectsByTemplate
};
