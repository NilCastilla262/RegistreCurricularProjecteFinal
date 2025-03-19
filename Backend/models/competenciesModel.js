// models/competenciesModel.js

//Nomenclatures:
//Type: Fa referencia a el tipus de competencia de les MATERIES, pot ser Especifiques (1) o Transversals (0)
//Competencie: Fa referencia al tipus de les COMPETENCIES, pot ser Competencia (1) o Saber (0) 

const sql = require('mssql');
const config = require('../config/db');

exports.insertData = async (jsonData, templateName) => {
  try {
    let pool = await sql.connect(config);
    
    for (const subject of jsonData) {
      const subjectName = subject.materia;
      
      // Comprovem si ja existeix la materia a SubjectsTPL per aquest template
      const selectQuery = `
        SELECT UUID 
        FROM SubjectsTPL 
        WHERE Name = @Name AND TemplateName = @TemplateName
      `;
      const selectResult = await pool.request()
        .input('Name', sql.VarChar(50), subjectName)
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
          .input('Name', sql.VarChar(50), subjectName)
          .input('TemplateName', sql.VarChar(20), templateName)
          .input('Type', sql.TinyInt, numericSubjectType)
          .query(insertQuery);
        subjectUUID = insertResult.recordset[0].UUID;
      }
            
      for (const competency of subject.Competencies) {
        // Extraiem l'ordre i la descripció de la competency
        let competencyOrder;
        let competencyDescription;
        let competencyMatch = competency.descripcio.match(/^(\d+)\.\s*(.+)$/);
        if (competencyMatch) {
          competencyOrder = parseInt(competencyMatch[1], 10);
          competencyDescription = competencyMatch[2].trim();
        } else {
          competencyOrder = 0;
          competencyDescription = competency.descripcio.trim();
        }
        
        // Comprovem si ja existeix una competency amb aquesta descripció per aquesta materia
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
                for (const criterion of competency.Criteris) {
          // Extraiem l'ordre (ex: "1.2." → "2") i la descripció del criteri
          let criterionOrder;
          let criterionDescription;
          let criterionMatch = criterion.match(/^\s*\d+\.(\d+)\.?\s*(.+)$/);
          if (criterionMatch) {
            criterionOrder = parseInt(criterionMatch[1], 10);
            criterionDescription = criterionMatch[2].trim();
          } else {
            criterionOrder = 0;
            criterionDescription = criterion.trim();
          }
          
          // Comprovem si aquest criteri ja existeix per aquesta competency
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
          } else {
          }
        }
      }
    }
  } catch (error) {
    throw error;
  }
};
