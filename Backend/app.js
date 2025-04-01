//app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const { poolPromise } = require("./config/db");
const csvRoutes = require("./routes/csvRoutes");
const authRoutes = require("./routes/authRoutes");
const groupsRoutes = require("./routes/groupsRoutes");
const subjectsRoutes = require("./routes/subjectsRoutes");
const sdaRoutes = require("./routes/sdaRoutes");
const coursesRoutes = require('./routes/coursesRoutes');
const sdaSubjectsRelationRoutes = require("./routes/sdaSubjectsRelationRoutes");
const competenciesSDARoutes = require('./routes/competenciesSDARoutes');
const fullSdaRoutes = require('./routes/fullSdaRoutes');

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

app.get("/", async (_, res) => {
  try {
    const pool = await poolPromise;
    res.status(200).json({ message: "Successfully connected with database" });
  } catch (error) {
    res.status(500).json({ message: "Error connecting with database", error: error.message });
  }
});

app.use("/apirc/v1/auth", authRoutes);
app.use('/apirc/v1', csvRoutes);
app.use("/apirc/v1/groups", groupsRoutes);
app.use("/apirc/v1/subjects", subjectsRoutes);
app.use("/apirc/v1/sda", sdaRoutes);
app.use('/apirc/v1/courses', coursesRoutes);
app.use("/apirc/v1/sda/subject-relation", sdaSubjectsRelationRoutes);
app.use('/apirc/v1/sda/fillSDA', competenciesSDARoutes);
app.use("/apirc/v1/sda/full", fullSdaRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no trobada" });
});

app.use((err, _a, res, _b) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error intern del servidor" });
});

module.exports = app;
