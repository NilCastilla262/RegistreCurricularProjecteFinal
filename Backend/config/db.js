// config/db.js
import sql from 'mssql';
import './loadEnv.js';

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

let cachedPool = null;

const getConnection = async () => {
  if (cachedPool) return cachedPool;

  try {
    const pool = await sql.connect(dbConfig);
    console.log("✅ Connectat a la base de dades");
    cachedPool = pool;
    return pool;
  } catch (error) {
    const err = new Error("❌ No s'ha pogut connectar a la base de dades");
    err.status = 503;
    err.details = error.message;
    throw err;
  }
};

export { sql, getConnection };
