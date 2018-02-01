const messages = require('../utils/pt_br-messages');

module.exports = (app) => {
  const routePath = '/hotels';
  const ControllerHotels = app.controller.ControllerHotels;
  const RestClient = app.services.RestClient;

  $private = {
    filterHotels(req, hotelsList) {
      const { minPrice, maxPrice, rate } = req.query;
      let hotels = hotelsList.hotels;
      hotels = ControllerHotels.sortAscendentByPrice(hotels);
      hotels = ControllerHotels.filterHotelsBetweenPrices({ hotels, minPrice, maxPrice });
      hotels = ControllerHotels.filterHotelsByRate({ hotels, rate });
      return hotels;
    }
  }

  app.get(routePath, async (req, res) => {
    const { minPrice, maxPrice, rate } = req.query;
    const hotelsList = await ControllerHotels.listHotels();
    const hotels = $private.filterHotels(req, hotelsList);
    return res.status(200).json(hotels);
  });


}
