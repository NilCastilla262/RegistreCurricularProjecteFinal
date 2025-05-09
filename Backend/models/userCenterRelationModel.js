// models/userCenterRelationModel.js
import { getConnection } from "../config/db.js";

async function getCentersByUser(userUUID) {
  const pool = await getConnection();
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
    const pool = await getConnection();
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

async function createUserCenterRelation(UUIDUser, centerName, role) {
  const pool = await getConnection();
  await pool.request()
    .input("UUIDUser", UUIDUser)
    .input("CenterName", centerName)
    .input("Role", role)
    .query(`
      INSERT INTO UserCenterRelation (UUIDUser, CenterName, Role)
      VALUES (@UUIDUser, @CenterName, @Role)
    `);
}

export { getCentersByUser, getSpecificCenterByUser, createUserCenterRelation };
