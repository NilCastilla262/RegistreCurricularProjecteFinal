// models/userCenterRelationModel.js
const { poolPromise } = require('../config/db');

async function getCentersByUser(userUUID) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('UserUUID', userUUID)
    .query(`
      SELECT CenterName, Role
      FROM UserCenterRelation
      WHERE UUIDUser = @UserUUID
    `);
  return result.recordset;
}

async function getSpecificCenterByUser(userUUID, centerName) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('UserUUID', userUUID)
      .input('CenterName', centerName)
      .query(`
        SELECT CenterName, Role
        FROM UserCenterRelation
        WHERE UUIDUser = @UserUUID
          AND CenterName = @CenterName
      `);
    return result.recordset;
}
module.exports = { getCentersByUser, getSpecificCenterByUser };
