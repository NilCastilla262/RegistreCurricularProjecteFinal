// controllers/competenciesSDAModel.js
const sql = require('mssql');
const { poolPromise } = require('../config/db');

async function createCompetenciesSDAForSubjects(uuidSDA, subjectUUIDs) {
  const pool = await poolPromise;
  try {
    for (const subjectUUID of subjectUUIDs) {
      const result = await pool.request()
        .input('UUIDSubject', sql.UniqueIdentifier, subjectUUID)
        .query(`
          SELECT UUID 
          FROM CompetenciesTPL 
          WHERE UUIDSubject = @UUIDSubject
        `);
      
      for (const row of result.recordset) {
        await pool.request()
          .input('UUIDSDA', sql.UniqueIdentifier, uuidSDA)
          .input('UUIDCompetencies', sql.UniqueIdentifier, row.UUID)
          .query(`
            INSERT INTO CompetenciesSDA (UUIDSDA, Worked, UUIDCompetencies)
            VALUES (@UUIDSDA, 0, @UUIDCompetencies)
          `);
      }
    }
    return { message: 'CompetenciesSDA creades correctament' };
  } catch (error) {
    throw error;
  }
}

module.exports = { createCompetenciesSDAForSubjects };
