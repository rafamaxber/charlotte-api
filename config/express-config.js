const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const Logger = require('../services/Logger');

module.exports = () => {
  const app = express();
  const routeSwaggerPath = '/api-docs';

  app.disable('x-powered-by');

  app.use(cors());

  if (process.env.NODE_ENV !== 'test') {
    const swaggerDocument = YAML.load('./swagger.yml');
    app.use(routeSwaggerPath, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  app.use(morgan('common', {
    stream: {
      write: (message) => Logger.info(message)
    }
  }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(expressValidator());

  consign({
    verbose: false,
  })
    .include('services')
    .then('controller')
    .then('routes')
    .into(app);

  return app;
}
