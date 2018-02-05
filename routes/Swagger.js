const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

module.exports = (app) => {
  const routePath = '/api-docs';
  const ControllerHotels = app.controller.ControllerHotels;
  app.use(routePath, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
