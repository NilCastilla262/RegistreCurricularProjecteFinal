// models/competenciesModel.js
const sql = require('mssql');
const config = require('../config/db');

exports.insertData = async (jsonData, templateName) => {
  try {
    let pool = await sql.connect(config);
    
    for (const subject of jsonData) {
      const subjectName = subject.materia;
      const numericType = parseInt(subject.type, 10);
      
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
          .input('Type', sql.TinyInt, numericType)
          .query(insertQuery);
        subjectUUID = insertResult.recordset[0].UUID;
      }
      
      // Aquí podríem continuar treballant amb Competencies si ho necessités.
      // Per ara només ens centrem en SubjectsTPL segons les teves instruccions.
      
      console.log(`Materia ${subjectName} té UUID: ${subjectUUID}`);
    }
  } catch (error) {
    throw error;
  }
};
