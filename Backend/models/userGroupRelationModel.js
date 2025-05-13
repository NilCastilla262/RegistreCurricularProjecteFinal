// models/userGroupRelationModel.js
import { getConnection } from "../config/db.js";

async function getGroupsByUser(userUUID) {
  const pool = await getConnection();
  const result = await pool.request()
    .input("UUIDUser", userUUID)
    .query(`
      SELECT 
        g.UUID,
        g.Name,
        g.CenterName,
        g.CourseName,
        g.Year
      FROM UserGroupRelation ugr
      INNER JOIN Groups g
        ON ugr.UUIDGroup = g.UUID
      WHERE ugr.UUIDUser = @UUIDUser
      ORDER BY g.Name ASC
    `);
  return result.recordset;
}

async function getUsersByGroup(groupUUID) {
  const pool = await getConnection();
  const result = await pool.request()
    .input("UUIDGroup", groupUUID)
    .query(`
      SELECT 
        u.UUID,
        u.Name,
        u.Email,
        u.UserRole
      FROM UserGroupRelation ugr
      INNER JOIN Users u
        ON ugr.UUIDUser = u.UUID
      WHERE ugr.UUIDGroup = @UUIDGroup
      ORDER BY u.Name ASC
    `);
  return result.recordset;
}

async function createUserGroupRelation(userUUID, groupUUID) {
  const pool = await getConnection();
  await pool.request()
    .input("UUIDUser",  userUUID)
    .input("UUIDGroup", groupUUID)
    .query(`
      INSERT INTO UserGroupRelation (UUIDUser, UUIDGroup)
      VALUES (@UUIDUser, @UUIDGroup)
    `);
}

async function deleteUserGroupRelation(userUUID, groupUUID) {
  const pool = await getConnection();
  await pool.request()
    .input("UUIDUser",  userUUID)
    .input("UUIDGroup", groupUUID)
    .query(`
      DELETE FROM UserGroupRelation
      WHERE UUIDUser  = @UUIDUser
        AND UUIDGroup = @UUIDGroup
    `);
}

async function relationExists(userUUID, groupUUID) {
  const pool = await getConnection();
  const result = await pool.request()
    .input("UUIDUser",  userUUID)
    .input("UUIDGroup", groupUUID)
    .query(`
      SELECT 1
      FROM UserGroupRelation
      WHERE UUIDUser  = @UUIDUser
        AND UUIDGroup = @UUIDGroup
    `);
  return result.recordset.length > 0;
}

export {
    deleteUserGroupRelation,
    createUserGroupRelation,
    getUsersByGroup,
    getGroupsByUser,
    relationExists
}