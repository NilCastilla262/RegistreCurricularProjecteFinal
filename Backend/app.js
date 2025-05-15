// src/app.js
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import apiRoutes from "./routes/index.js";
import { verifyToken } from "./middlewares/authMiddleware.js";
import requestLogger from "./middlewares/requestLogger.js";
import errorHandler from "./middlewares/errorHandler.js";
import { generateSwaggerDocs, mountSwagger } from "./config/swagger.js";
import { limiter } from "./config/rateLimiter.js";
import { corsOptions } from "./config/corsConfig.js";
import dbHealthCheck from "./middlewares/dbHealthCheckMiddleware.js";

const app = express();

generateSwaggerDocs();

mountSwagger(app);

app.use(limiter);

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/apirc/v1/auth", authRoutes);

app.use(verifyToken);
app.use(requestLogger);

app.use(dbHealthCheck);

app.use("/apirc/v1", apiRoutes);

app.use((req, res, next) => {
  const err = new Error("Ruta no trobada");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

export default app;