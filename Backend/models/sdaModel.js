// models/sdaModel.js
const { poolPromise } = require("../config/db");
const { v4: uuidv4 } = require("uuid");

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

module.exports = { createSDA, getAllSdas };
