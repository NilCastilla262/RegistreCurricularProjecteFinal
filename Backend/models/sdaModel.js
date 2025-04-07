// models/sdaModel.js
const { poolPromise } = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const sql = require('mssql'); 

async function createSDA(uuidUser, uuidGroup, title, description) {
  const pool = await poolPromise;
  const newUUID = uuidv4();

  await pool.request()
    .input("UUID", newUUID)
    .input("UUIDUser", uuidUser)
    .input("UUIDGroup", uuidGroup)
    .input("Title", title)
    .input("Description", description)
    .query(`
      INSERT INTO SDA (UUID, UUIDUser, UUIDGroup, Title, Description)
      VALUES (@UUID, @UUIDUser, @UUIDGroup, @Title, @Description)
    `);

  return newUUID;
}

async function getAllSdas() {
  const pool = await poolPromise;
  const result = await pool.request()
    .query(`
      SELECT 
        sda.UUID AS sdaUUID,
        sda.Title,
        sda.Description,
        sda.CreatedAt,
        sda.UUIDGroup,
        g.Name AS groupName
      FROM SDA sda
      LEFT JOIN Groups g 
        ON sda.UUIDGroup = g.UUID
    `);
  return result.recordset;
}

async function markCriteria(uuidSDA, uuidCriteria, worked) {
  const pool = await poolPromise;
  try {
    console.log('--- Mark Criteria ---');
    console.log('uuidSDA:', uuidSDA);
    console.log('uuidCriteria:', uuidCriteria);
    console.log('worked:', worked);

    const result = await pool.request()
      .input('uuidSDA', sql.UniqueIdentifier, uuidSDA)
      .input('uuidCriteria', sql.UniqueIdentifier, uuidCriteria)
      .input('worked', sql.Bit, worked)
      .query(`
        UPDATE CriteriaSDA
        SET Worked = @worked
        WHERE UUIDSDA = @uuidSDA AND UUID = @uuidCriteria
      `);

    return { message: 'Criteria updated successfully', rowsAffected: result.rowsAffected[0] };
  } catch (error) {
    throw error;
  }
}

module.exports = { createSDA, getAllSdas, markCriteria };
