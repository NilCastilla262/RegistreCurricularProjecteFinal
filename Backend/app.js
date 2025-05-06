//app.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { getConnection } from "./config/db.js";
import csvRoutes from "./routes/csvRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import groupsRoutes from "./routes/groupsRoutes.js";
import subjectsRoutes from "./routes/subjectsRoutes.js";
import sdaRoutes from "./routes/sdaRoutes.js";
import coursesRoutes from "./routes/coursesRoutes.js";
import sdaSubjectsRelationRoutes from "./routes/sdaSubjectsRelationRoutes.js";
import competenciesSDARoutes from "./routes/competenciesSDARoutes.js";
import fullSdaRoutes from "./routes/fullSdaRoutes.js";
import fs from "fs";
import yaml from "js-yaml";
import swaggerAutogen from 'swagger-autogen';
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const outputFile = './swagger2.yaml';

const swaggerDocument = yaml.load(
  fs.readFileSync(new URL("./swagger2.yaml", import.meta.url), "utf8")
);
const endpointsFiles = ['./app.js'];
const doc = {
  openapi: '3.0.0',
  info: {
    title: 'Registre Curricular API',
    version: '1.0.0',
    description: 'Documentació generada automàticament',
  },
  servers: [{ url: 'http://localhost:5000' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    }
  },
  security: [{ bearerAuth: [] }]
};

swaggerAutogen()(outputFile, endpointsFiles, doc)
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      authAction: {
        bearerAuth: {
          name: "bearerAuth",
          schema: {
            type: "http",
            in: "header",
            scheme: "bearer",
            bearerFormat: "JWT"
          },
         value:
           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNzdBQzQ2MzMtRjUyMy00NTZFLUI2OTctQkFBQTE2MUYxNzNDIiwiZW1haWwiOiJuY2FzdGlsbGEyNjJAYm9zY2RlbGFjb21hLmNhdCIsIm5hbWUiOiJOaWwgQ2FzdGlsbGEgR2FsaW1hbnkiLCJjZW50ZXJOYW1lIjoiQm9zYyBEZSBMYSBDb21hIiwiY2VudGVyUm9sZSI6MSwiaWF0IjoxNzQzMDA3Njk1LCJleHAiOjE4OTg1Mjc2OTV9.LNoLcBtgPb_w_UmxWZISUFWvOOB-GtopdWAHfT75DEo"
        }
      }
    }
  })
);

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
    const pool = await getConnection();
    if (!pool.connected) {
      const error = new Error("Database not connected");
      error.status = 503;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
});

app.get("/", async (_, res) => {
  try {
    const pool = await getConnection();
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

app.use(errorHandler);

export default app;
