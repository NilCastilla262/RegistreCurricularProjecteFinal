// config/db.js
require("dotenv").config();
const sql = require("mssql");

const dbConfig = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === "true",
  },
};

const poolPromise = sql
  .connect(dbConfig)
  .then((pool) => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    throw error;
  });

module.exports = {
  sql,
  poolPromise,
};
