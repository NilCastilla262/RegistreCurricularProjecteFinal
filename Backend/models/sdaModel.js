// models/sdaModel.js
import { getConnection } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import sql from "mssql";

const SORT_COLUMNS = {
  title:       'sda.Title',
  createdAt:   'sda.CreatedAt',
  groupName:   'g.Name',
};

async function createSDA(uuidUser, uuidGroup, title, description) {
  const pool = await getConnection();
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

async function getAllSdas({ page = 1, limit = 10, sortBy = 'title', sortOrder = 'ASC', centerName }) {
  const pool = await getConnection();

  const sortCol = SORT_COLUMNS[sortBy] || SORT_COLUMNS.title;
  const order   = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  const offset  = (Math.max(parseInt(page, 10), 1) - 1) * parseInt(limit, 10);

  const result = await pool.request()
    .input('centerName', centerName)
    .input('limit', parseInt(limit, 10))
    .input('offset', offset)
    .query(`
      SELECT 
        sda.UUID       AS sdaUUID,
        sda.Title,
        sda.Description,
        sda.CreatedAt,
        sda.UUIDGroup,
        g.Name         AS groupName
      FROM SDA sda
      INNER JOIN Groups g 
        ON sda.UUIDGroup = g.UUID
      WHERE g.CenterName = @centerName
      ORDER BY ${sortCol} ${order}
      OFFSET @offset ROWS
      FETCH NEXT @limit ROWS ONLY
    `);

  return result.recordset;
}


async function markCriteria(uuidSDA, uuidCriteria, worked) {
  const pool = await getConnection();
  try {
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

export { createSDA, getAllSdas, markCriteria };
