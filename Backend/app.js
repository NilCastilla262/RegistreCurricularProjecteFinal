// src/app.js
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { getConnection } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import apiRoutes from "./routes/index.js";
import { verifyToken } from "./middlewares/authMiddleware.js";
import requestLogger from "./middlewares/requestLogger.js";
import errorHandler from "./middlewares/errorHandler.js";
import { generateSwaggerDocs, mountSwagger } from "./config/swagger.js";

const app = express();

generateSwaggerDocs();

mountSwagger(app);

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/apirc/v1/auth", authRoutes);

app.use(verifyToken);
app.use(requestLogger);

app.use(async (req, res, next) => {
  try {
    const pool = await getConnection();
    if (!pool.connected) {
      const err = new Error("Database not connected");
      err.status = 503;
      throw err;
    }
    next();
  } catch (err) {
    next(err);
  }
});

app.use("/apirc/v1", apiRoutes);

app.use((req, res) => res.status(404).json({ error: "Ruta no trobada" }));

app.use(errorHandler);

export default app;
