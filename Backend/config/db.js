// config/db.js
import 'dotenv/config';
import sql from 'mssql';

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
    const err = new Error("No s'ha pogut connectar a la base de dades");
    err.status = 503;
    err.details = error.message;
    throw err;
  });

export { sql, poolPromise };
