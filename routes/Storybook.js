const express = require('express');
const path = require('path');
const publicPath = require('../public/public_path');

module.exports = (app) => {
  const routePath = '/storybook';
  const iframe = '/iframe.html';

  app.get(routePath, (req, res) => {
    res.sendFile(`${publicPath}/dist-storybook/index.html`);
  });
  app.get(iframe, (req, res) => {
    res.sendFile(`${publicPath}/dist-storybook/iframe.html`);
  });
}
