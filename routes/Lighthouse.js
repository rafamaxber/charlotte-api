const path = require('path');
const publicPath = require('../public/public_path');
const { getErrorObject } = require('../utils/helperError');

module.exports = (app) => {
  const routePath = '/lighthouse';

  app.get(routePath, (req, res) => {
    res.sendFile(`${publicPath}/charlotteapp-lighthouse-report.html`);
  });
}
