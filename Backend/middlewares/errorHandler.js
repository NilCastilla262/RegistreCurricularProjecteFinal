import fs from "fs";
import path from "path";

const logDirectory = path.resolve("logs");
const logFilePath = path.join(logDirectory, "error.log");

export default (err, req, res, next) => {
  const timestamp = new Date().toISOString();
  const uuid = req.user?.uuid || "anonymous";
  const name = req.user?.name || "anonymous";
  const logMessage = `[${timestamp}] [${uuid}] [${name}] ${req.method} ${req.originalUrl} - ${err.status || 500} - ${err.message}\n`;
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
  }

  fs.appendFile(logFilePath, logMessage, (fsErr) => {
    if (fsErr) console.error("No s'ha pogut escriure al fitxer de log:", fsErr.message);
  });

  console.error(err.stack);
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || "Error intern del servidor",
    details: err.details || null,
    path: req.originalUrl,
    timestamp,
  });
};
