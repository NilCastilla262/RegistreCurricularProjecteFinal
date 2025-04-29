// models/competenciesModel.js

//Nomenclatures:
//Type: Fa referencia a el tipus de competencia de les MATERIES, pot ser Especifiques (1) o Transversals (0)
//Competencie: Fa referencia al tipus de les COMPETENCIES, pot ser Competencia (1) o Saber (0) 

import sql from "mssql";
import { poolPromise } from "../config/db.js";

async function insertData(jsonData, templateName) {
  try {
    const pool = await poolPromise;

    for (const subject of jsonData) {
      const subjectName = subject.materia;
      const numericSubjectType = parseInt(subject.type, 10);

      // 1) Obtenir o crear la SubjectTPL
      const selectQuery = `
        SELECT UUID 
        FROM SubjectsTPL 
        WHERE Name = @Name AND TemplateName = @TemplateName
      `;
      const selectResult = await pool.request()
        .input('Name', sql.VarChar(70), subjectName)
        .input('TemplateName', sql.VarChar(20), templateName)
        .query(selectQuery);

      let subjectUUID;
      if (selectResult.recordset.length > 0) {
        subjectUUID = selectResult.recordset[0].UUID;
      } else {
        const insertQuery = `
          INSERT INTO SubjectsTPL (Name, TemplateName, Type)
          OUTPUT INSERTED.UUID
          VALUES (@Name, @TemplateName, @Type)
        `;
        const insertResult = await pool.request()
          .input('Name', sql.VarChar(70), subjectName)
          .input('TemplateName', sql.VarChar(20), templateName)
          .input('Type', sql.TinyInt, numericSubjectType)
          .query(insertQuery);
        subjectUUID = insertResult.recordset[0].UUID;
      }

      // 2) Recórrer cada competència de la matèria
      for (const competency of subject.Competencies) {
        // extreure ordre i descripció
        let orderMatch = competency.descripcio.match(/^(\d+)\.\s*(.+)$/);
        const competencyOrder = orderMatch ? parseInt(orderMatch[1], 10) : 0;
        const competencyDescription = orderMatch ? orderMatch[2].trim() : competency.descripcio.trim();

        // comprovar o inserir CompetenciesTPL
        const selectCompQuery = `
          SELECT UUID 
          FROM CompetenciesTPL 
          WHERE Description = @Description AND UUIDSubject = @UUIDSubject
        `;
        const compResult = await pool.request()
          .input('Description', sql.VarChar(sql.MAX), competencyDescription)
          .input('UUIDSubject', sql.UniqueIdentifier, subjectUUID)
          .query(selectCompQuery);

        let competencyUUID;
        if (compResult.recordset.length > 0) {
          competencyUUID = compResult.recordset[0].UUID;
        } else {
          const insertCompQuery = `
            INSERT INTO CompetenciesTPL (UUIDSubject, OrderBy, Description, Type)
            OUTPUT INSERTED.UUID
            VALUES (@UUIDSubject, @OrderBy, @Description, @Type)
          `;
          const insertCompResult = await pool.request()
            .input('UUIDSubject', sql.UniqueIdentifier, subjectUUID)
            .input('OrderBy', sql.TinyInt, competencyOrder)
            .input('Description', sql.VarChar(sql.MAX), competencyDescription)
            .input('Type', sql.TinyInt, parseInt(competency.type, 10))
            .query(insertCompQuery);
          competencyUUID = insertCompResult.recordset[0].UUID;
        }

        // 3) Inserir criteris per a cada competència
        for (const criterion of competency.Criteris) {
          const cleaned = criterion.replace(/\n/g, " ").trim();
          const critMatch = cleaned.match(/^\s*\d+\.(\d+)\.?\s*(.+)$/);
          if (!critMatch) {
            throw new Error(`Format incorrecte per al criteri: "${criterion}"`);
          }
          const criterionOrder = parseInt(critMatch[1], 10);
          const criterionDescription = critMatch[2].trim();

          const selectCritQuery = `
            SELECT UUID 
            FROM CriteriaTPL 
            WHERE Description = @Description AND UUIDCompetencie = @UUIDCompetencie
          `;
          const critResult = await pool.request()
            .input('Description', sql.VarChar(sql.MAX), criterionDescription)
            .input('UUIDCompetencie', sql.UniqueIdentifier, competencyUUID)
            .query(selectCritQuery);

          if (critResult.recordset.length === 0) {
            const insertCritQuery = `
              INSERT INTO CriteriaTPL (UUIDCompetencie, Description, OrderByMain, OrderBy)
              VALUES (@UUIDCompetencie, @Description, @OrderByMain, @OrderBy)
            `;
            await pool.request()
              .input('UUIDCompetencie', sql.UniqueIdentifier, competencyUUID)
              .input('Description', sql.VarChar(sql.MAX), criterionDescription)
              .input('OrderByMain', sql.TinyInt, competencyOrder)
              .input('OrderBy', sql.TinyInt, criterionOrder)
              .query(insertCritQuery);
          }
        }
      }
    }

  } catch (error) {
    throw error;
  }
}

export default {
  insertData,
};