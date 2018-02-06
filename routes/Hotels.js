const { getErrorObject } = require('../utils/helperError');

module.exports = (app) => {
  const routePath = '/hotels';
  const ControllerHotels = app.controller.ControllerHotels;

  app.get(routePath, async (req, res) => {
    const { minPrice, maxPrice, rate, startDate, endDate } = req.query;
    const listHotels = await ControllerHotels.listHotels()
      .then( hotels => ControllerHotels.filterHotelsBetweenPrices({
          hotels: hotels.hotels,
          minPrice,
          maxPrice,
        })
      )
      .then( hotels => ControllerHotels.filterHotelsByRate({ hotels, rate }))
      .then( hotels => ControllerHotels.sortAscendentByPrice(hotels))
      .then(hotels => ControllerHotels.sumTotalPriceByDate({ hotels, startDate, endDate }))
      .then( hotels => {
        return res.status(200).json(hotels);
      })
      .catch((err) => {
        res.status(err.statusCode).json(getErrorObject(err));
      });
  });
}
