const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv').config();
const routes = require('../routes/Hotels');
const router = express.Router()

module.exports = () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(expressValidator());
  router.use(routes());

  return app;
}
