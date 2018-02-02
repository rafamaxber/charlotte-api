const { getErrorObject } = require('../utils/helperError');

module.exports = (app) => {
  const routePath = '/hotels';
  const ControllerHotels = app.controller.ControllerHotels;

  app.get(routePath, async (req, res) => {
    const hotels = await ControllerHotels.filterHotels(req, res)
      .catch((err) => {
        res.status(err.statusCode).json(getErrorObject(err));
      });
    res.status(200).json(hotels);
  });
}
