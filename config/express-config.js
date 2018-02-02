const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const Logger = require('../services/Logger');
const dotenv = require('dotenv').config();

module.exports = () => {
  const app = express();

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
