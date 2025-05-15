// config/swagger.js
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import swaggerAutogenFactory from 'swagger-autogen';
import swaggerUi from 'swagger-ui-express';

const swaggerAutogen = swaggerAutogenFactory({ openapi: '3.0.0' });

const OUTPUT_FILE = path.resolve('./swagger2.yaml');
const ENDPOINTS = [ './app.js' ];

const DOC = {
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

export function generateSwaggerDocs() {
  swaggerAutogen(OUTPUT_FILE, ENDPOINTS, DOC);
}

export function mountSwagger(app) {
  const swaggerDocument = yaml.load(
    fs.readFileSync(OUTPUT_FILE, 'utf8')
  );
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      swaggerOptions: {
        authAction: {
          bearerAuth: {
            name: 'bearerAuth',
            schema: {
              type: 'http',
              in: 'header',
              scheme: 'bearer',
              bearerFormat: 'JWT'
            },
            value: ''
          }
        }
      }
    })
  );
}
