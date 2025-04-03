// models/fullSdaModel.js
const sql = require('mssql');
const { poolPromise } = require('../config/db');

async function getFullSda(uuidSDA) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('uuidSDA', sql.UniqueIdentifier, uuidSDA)
    .query(`
      SELECT (
        SELECT 
          sda.UUID AS sdaUUID,
          sda.Title,
          sda.Description,
          sda.CreatedAt,
          sda.UUIDGroup,
          g.Name AS groupName,
          (
            SELECT 
              st.UUID AS subjectUUID,
              st.Name AS subjectName,
              st.TemplateName AS subjectTemplate,
              st.Type AS subjectType,
              (
                SELECT 
                  csda.UUID AS competencyUUID,
                  ct.UUID AS competencyUUIDTPL,
                  ct.Description AS competencyDescription,
                  ct.OrderBy AS competencyOrder,
                  ct.Type AS competencyType,
                  csda.Worked AS competencyWorked,
                  (
                    SELECT 
                      crsda.UUID AS criteriaUUID,
                      cr.UUID AS criteriaUUIDTPL,
                      cr.Description AS criteriaDescription,
                      cr.OrderByMain AS criteriaMainOrder,
                      cr.OrderBy AS criteriaOrder,
                      crsda.Worked AS criteriaWorked
                    FROM CriteriaTPL cr
                    LEFT JOIN CriteriaSDA crsda 
                      ON cr.UUID = crsda.UUIDCriteria 
                         AND crsda.UUIDSDA = sda.UUID
                    WHERE cr.UUIDCompetencie = ct.UUID
                    FOR JSON PATH
                  ) AS criteria
                FROM CompetenciesTPL ct
                LEFT JOIN CompetenciesSDA csda 
                  ON ct.UUID = csda.UUIDCompetencies 
                     AND csda.UUIDSDA = sda.UUID
                WHERE ct.UUIDSubject = st.UUID
                FOR JSON PATH
              ) AS competencies
            FROM SubjectsTPL st
            INNER JOIN SDASubjectsRelation ssr 
              ON st.UUID = ssr.UUIDSubject 
                 AND ssr.UUIDSDA = sda.UUID
            FOR JSON PATH
          ) AS subjects
        FROM SDA sda
        LEFT JOIN Groups g 
          ON sda.UUIDGroup = g.UUID
        WHERE sda.UUID = @uuidSDA
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
      ) AS fullSda;
    `);
  return result.recordset[0].fullSda;
}

module.exports = { getFullSda };
