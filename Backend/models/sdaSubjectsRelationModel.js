// models/sdaSubjectsRelationModel.js
const { poolPromise } = require("../config/db");

async function createSdaSubjectRelation(uuidSDA, uuidSubject) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('UUIDSDA', uuidSDA)
    .input('UUIDSubject', uuidSubject)
    .query(`
      INSERT INTO SDASubjectsRelation (UUIDSDA, UUIDSubject)
      VALUES (@UUIDSDA, @UUIDSubject)
    `);
  return result;
}

module.exports = { createSdaSubjectRelation };