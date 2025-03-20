// models/userModel.js
const { poolPromise } = require("../config/db");

const getUserByEmail = async (email) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input("email", email)
    .query("SELECT * FROM Users WHERE Email = @email");
  return result.recordset[0];
};

const createUser = async (name, email, role) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input("name", name)
    .input("email", email)
    .input("role", role)
    .query(`
      INSERT INTO Users (Name, Email, Role)
      OUTPUT INSERTED.*
      VALUES (@name, @email, @role)
    `);
  return result.recordset[0];
};

const getUserById = async (UUID) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input("UUID", UUID)
    .query("SELECT * FROM Users WHERE UUID = @UUID");
  return result.recordset[0];
};

module.exports = {
  getUserByEmail,
  createUser,
  getUserById
};
