//models/competenciesModel.js
const sql = require('mssql');
const config = require('../config/db');

exports.insertData = async (jsonData) => {
  try {
    let pool = await sql.connect(config);
    
    for (const materia of jsonData) {
      const resultMateria = await pool.request()
        .input('Name', sql.VarChar(50), materia.materia)
        .input('Type', sql.TinyInt, materia.tipus === 'transversal' ? 1 : 0)
        .query('INSERT INTO SubjectsTPL (Name, Type) OUTPUT INSERTED.UUID VALUES (@Name, @Type)');

      const materiaUUID = resultMateria.recordset[0].UUID;

      for (const comp of materia.competències) {
        const resultComp = await pool.request()
          .input('SubjectName', sql.VarChar(20), comp.titol)
          .input('UUIDSubject', sql.UniqueIdentifier, materiaUUID)
          .query('INSERT INTO CompetenciesTPL (SubjectName, UUIDSubject) OUTPUT INSERTED.UUID VALUES (@SubjectName, @UUIDSubject)');

        const compUUID = resultComp.recordset[0].UUID;

        for (const criteri of comp.criteris) {
          await pool.request()
            .input('UUIDCompetencie', sql.UniqueIdentifier, compUUID)
            .input('Description', sql.VarChar(sql.MAX), criteri)
            .query('INSERT INTO CriteriaTPL (UUIDCompetencie, Description) VALUES (@UUIDCompetencie, @Description)');
        }
      }
    }
  } catch (error) {
    throw error;
  }
};
