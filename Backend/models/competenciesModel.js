// models/competenciesModel.js
const sql = require('mssql');
const config = require('../config/db');

exports.insertData = async (jsonData, templateName) => {
  try {
    // Connectem amb la base de dades
    let pool = await sql.connect(config);

    // Iterem sobre cada "subject" (materia) del JSON
    for (const subject of jsonData) {
      const subjectName = subject.materia;

      // Seleccionem la materia si ja existeix a la taula SubjectsTPL,
      // comprovant que coincideixi tant el nom com el templateName.
      const selectSubjectQuery = `
        SELECT UUID 
        FROM SubjectsTPL 
        WHERE Name = @Name AND TemplateName = @TemplateName
      `;
      const subjectResult = await pool.request()
        .input('Name', sql.VarChar(50), subjectName)
        .input('TemplateName', sql.VarChar(20), templateName)
        .query(selectSubjectQuery);

      let subjectUUID;
      if (subjectResult.recordset.length > 0) {
        // Si ja existeix, recollim el UUID
        subjectUUID = subjectResult.recordset[0].UUID;
      } else {
        // Si no existeix, inserim una nova matèria
        const insertSubjectQuery = `
          INSERT INTO SubjectsTPL (Name, TemplateName, Type)
          OUTPUT INSERTED.UUID
          VALUES (@Name, @TemplateName, @Type)
        `;
        const insertSubjectResult = await pool.request()
          .input('Name', sql.VarChar(50), subjectName)
          .input('TemplateName', sql.VarChar(20), templateName)
          .input('Type', sql.TinyInt, numericSubjectType)
          .query(insertSubjectQuery);
        subjectUUID = insertSubjectResult.recordset[0].UUID;
      }
      console.log(`Subject "${subjectName}" té UUID: ${subjectUUID}`);

      // Processar cada competency (competència) de la matèria
      console.log("Processant competencies");
      for (const competency of subject.Competencies) {
        console.log("Competencia: ",competency);
        // Processar l'string de la competency per separar el número d'ordre
        // Ex: "1. Prendre consciència ..." → extracte "1" i la descripció sense el prefix.
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

        // Comprovem si ja existeix una competency amb aquesta descripció per aquesta matèria
        const selectCompetencyQuery = `
          SELECT UUID 
          FROM CompetenciesTPL 
          WHERE Description = @Description AND UUIDSubject = @UUIDSubject
        `;
        const competencyResult = await pool.request()
          .input('Description', sql.VarChar(sql.MAX), competencyDescription)
          .input('UUIDSubject', sql.UniqueIdentifier, subjectUUID)
          .query(selectCompetencyQuery);

        let competencyUUID;
        if (competencyResult.recordset.length > 0) {
          competencyUUID = competencyResult.recordset[0].UUID;
        } else {
          // Inserim la nova competency
          // Notar que el camp "SubjectName" pot ser el nom de la matèria, i "OrderBy" és el número d'ordre extret.
          const insertCompetencyQuery = `
            INSERT INTO CompetenciesTPL (SubjectName, UUIDSubject, OrderBy, Description)
            OUTPUT INSERTED.UUID
            VALUES (@SubjectName, @UUIDSubject, @OrderBy, @Description)
          `;
          const insertCompetencyResult = await pool.request()
            .input('SubjectName', sql.VarChar(20), subjectName)
            .input('UUIDSubject', sql.UniqueIdentifier, subjectUUID)
            .input('OrderBy', sql.TinyInt, competencyOrder)
            .input('Description', sql.VarChar(sql.MAX), competencyDescription)
            .query(insertCompetencyQuery);
          competencyUUID = insertCompetencyResult.recordset[0].UUID;
        }
        console.log(`Competency "${competencyDescription}" té UUID: ${competencyUUID}`);

        // Processar cada criteri dins de la competency
        for (const criterion of competency.Criteris) {
          // El criteri té un format com "1.2. Descripció del criteri"
          // Volem extreure el segon número (per exemple, "2") i la descripció sense el prefix.
          let criterionOrder;
          let criterionDescription;
          let criterionMatch = criterion.match(/^\d+\.(\d+)\.\s*(.+)$/);
          if (criterionMatch) {
            criterionOrder = parseInt(criterionMatch[1], 10);
            criterionDescription = criterionMatch[2].trim();
          } else {
            criterionOrder = 0;
            criterionDescription = criterion.trim();
          }

          // Comprovem si aquest criteri ja existeix per aquesta competency
          const selectCriterionQuery = `
            SELECT UUID 
            FROM CriteriaTPL 
            WHERE Description = @Description AND UUIDCompetencie = @UUIDCompetencie
          `;
          const criterionResult = await pool.request()
            .input('Description', sql.VarChar(sql.MAX), criterionDescription)
            .input('UUIDCompetencie', sql.UniqueIdentifier, competencyUUID)
            .query(selectCriterionQuery);

          if (criterionResult.recordset.length === 0) {
            // Inserim el criteri
            const insertCriterionQuery = `
              INSERT INTO CriteriaTPL (UUIDCompetencie, Description, OrderByMain, OrderBy)
              VALUES (@UUIDCompetencie, @Description, @OrderByMain, @OrderBy)
            `;
            await pool.request()
              .input('UUIDCompetencie', sql.UniqueIdentifier, competencyUUID)
              .input('Description', sql.VarChar(sql.MAX), criterionDescription)
              .input('OrderByMain', sql.TinyInt, competencyOrder)
              .input('OrderBy', sql.TinyInt, criterionOrder)
              .query(insertCriterionQuery);
          } else {
          }
        }
      }
    }
  } catch (error) {
    throw error;
  }
};
