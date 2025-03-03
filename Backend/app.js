const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const { poolPromise } = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const lightsRoutes = require("./routes/lightsRoutes");
const groupsRoutes = require("./routes/groupsRoutes");
const relacioGroupsLightsRoutes = require("./routes/relacioGroupsLightsRoutes");
const colorsRoutes = require("./routes/colorsRoutes");
const typesRoutes = require("./routes/typesRoutes");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: "Has superat el límit de peticions per minut",
});

app.use(limiter);

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  try {
    const pool = await poolPromise;
    if (!pool.connected) {
      throw new Error("Database not connected");
    }
    next();
  } catch (error) {
    console.error("Error connecting to DB on request:", error.message);
    res.status(500).json({ error: "Error connecting to DB", message: error.message });
  }
});

app.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    res.status(200).json({ message: "Successfully connected with database" });
  } catch (error) {
    res.status(500).json({ message: "Error connecting with database", error: error.message });
  }
});

app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no trobada" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error intern del servidor" });
});

module.exports = app;
