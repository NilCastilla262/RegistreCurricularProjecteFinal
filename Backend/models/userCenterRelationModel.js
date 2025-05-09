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

async function updateUserCenterRelation(UUIDUser, centerName, role) {
  const pool = await getConnection();
  await pool.request()
    .input("UUIDUser",   UUIDUser)
    .input("CenterName", centerName)
    .input("Role",       role)
    .query(`
      UPDATE UserCenterRelation
      SET Role = @Role
      WHERE UUIDUser   = @UUIDUser
        AND CenterName = @CenterName
    `);
}

async function deleteUserCenterRelation(UUIDUser, centerName) {
  const pool = await getConnection();
  await pool.request()
    .input("UUIDUser",   UUIDUser)
    .input("CenterName", centerName)
    .query(`
      DELETE
      FROM UserCenterRelation
      WHERE UUIDUser   = @UUIDUser
        AND CenterName = @CenterName
    `);
}

export {
  getCentersByUser,
  getSpecificCenterByUser,
  createUserCenterRelation,
  updateUserCenterRelation,
  deleteUserCenterRelation
 };
