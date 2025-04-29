// models/sdaSubjectsRelationModel.js
import { poolPromise } from "../config/db.js";

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

export { createSdaSubjectRelation };