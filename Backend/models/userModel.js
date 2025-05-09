// models/userModel.js
import { getConnection } from "../config/db.js";

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


const getUserByUUID = async (UUID) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input("UUID", UUID)
    .query("SELECT * FROM Users WHERE UUID = @UUID");
  return result.recordset[0];
};

export {
  getUserByEmail,
  createUser,
  getUserByUUID,
  createTempUser
};
