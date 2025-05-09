// models/userModel.js
import { getConnection } from "../config/db.js";

async function createUser(name, email) {
  const pool = await getConnection();
  const userRole = 1;
  const insertResult = await pool.request()
    .input('Name', name)
    .input('Email', email)
    .input('UserRole', userRole)
    .query(`
      INSERT INTO Users (Name, Email, UserRole)
      OUTPUT INSERTED.*
      VALUES (@Name, @Email, @UserRole)
    `);
  return insertResult.recordset[0]; 
}

async function createTempUser(email) {
  const pool = await getConnection();
  const userRole = 1;
  const insertResult = await pool.request()
    .input('Email', email)
    .input('UserRole', userRole)
    .query(`
      INSERT INTO Users (Email, UserRole)
      OUTPUT INSERTED.*
      VALUES (@Email, @UserRole)
    `);
  return insertResult.recordset[0]; 
}

async function getUserByEmail(email) {
  const pool = await getConnection();
  const result = await pool.request()
    .input('email', email)
    .query(`
      SELECT *
      FROM Users
      WHERE Email = @email
    `);
  return result.recordset[0];
}

const getUserByUUID = async (UUID) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input("UUID", UUID)
    .query("SELECT * FROM Users WHERE UUID = @UUID");
  return result.recordset[0];
};

async function getUsersByCenter(centerName) {
  const pool = await getConnection();
  const result = await pool.request()
    .input("centerName", centerName)
    .query(`
      SELECT 
        U.UUID,
        U.Name,
        U.Email,
        R.Role
      FROM Users AS U
      INNER JOIN UserCenterRelation AS R
        ON U.UUID = R.UUIDUser
      WHERE R.CenterName = @centerName
    `);
  return result.recordset;
}

async function updateUserName(UUID, name) {
  const pool = await getConnection();
  await pool.request()
    .input("UUID", UUID)
    .input("Name", name)
    .query(`
      UPDATE Users
      SET Name = @Name
      WHERE UUID = @UUID
    `);
}

export {
  getUserByEmail,
  createUser,
  getUserByUUID,
  createTempUser,
  getUsersByCenter,
  updateUserName
};
