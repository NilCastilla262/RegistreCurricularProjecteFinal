// models/groupsModel.js
const { poolPromise } = require("../config/db");

async function getGroupsByUserUUID(userUUID) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input("UUIDUser", userUUID)
    .query(`
      SELECT g.UUID, g.Name, g.CenterName, g.CourseName, g.Year
      FROM Groups g
      INNER JOIN UserGroupRelation ugr ON g.UUID = ugr.UUIDGroup
      WHERE ugr.UUIDUser = @UUIDUser
    `);

  return result.recordset;
}

module.exports = {
  getGroupsByUserUUID
};
