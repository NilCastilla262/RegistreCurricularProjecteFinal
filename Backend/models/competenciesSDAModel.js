// controllers/competenciesSDAModel.js
const sql = require('mssql');
const { poolPromise } = require('../config/db');

async function createCompetenciesAndCriteriaSDAForSubjects(uuidSDA, subjectUUIDs) {
  const pool = await poolPromise;
  try {
    for (const subjectUUID of subjectUUIDs) {
      const compResult = await pool.request()
        .input('UUIDSubject', sql.UniqueIdentifier, subjectUUID)
        .query(`
          SELECT UUID 
          FROM CompetenciesTPL 
          WHERE UUIDSubject = @UUIDSubject
        `);
      
      for (const comp of compResult.recordset) {
        await pool.request()
          .input('UUIDSDA', sql.UniqueIdentifier, uuidSDA)
          .input('UUIDCompetencies', sql.UniqueIdentifier, comp.UUID)
          .query(`
            INSERT INTO CompetenciesSDA (UUIDSDA, Worked, UUIDCompetencies)
            VALUES (@UUIDSDA, 0, @UUIDCompetencies)
          `);
        
        const critResult = await pool.request()
          .input('UUIDCompetencie', sql.UniqueIdentifier, comp.UUID)
          .query(`
            SELECT UUID 
            FROM CriteriaTPL 
            WHERE UUIDCompetencie = @UUIDCompetencie
          `);
        
        for (const crit of critResult.recordset) {
          await pool.request()
            .input('UUIDSDA', sql.UniqueIdentifier, uuidSDA)
            .input('UUIDCriteria', sql.UniqueIdentifier, crit.UUID)
            .query(`
              INSERT INTO CriteriaSDA (UUIDSDA, UUIDCriteria, Worked)
              VALUES (@UUIDSDA, @UUIDCriteria, 0)
            `);
        }
      }
    }
    return { message: 'CompetenciesSDA and CriteriaSDA creades correctament' };
  } catch (error) {
    throw error;
  }
}

module.exports = { createCompetenciesAndCriteriaSDAForSubjects };