const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

module.exports = (app) => {
  if (process.env.NODE_ENV === 'test') return true;
  const swaggerDocument = YAML.load('./swagger.yaml');
  const routePath = '/api-docs';
  app.use(routePath, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

Swagger.js
