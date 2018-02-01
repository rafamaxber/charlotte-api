const Logger = require('../services/Logger');
const messages = require('../utils/pt_br-messages');

module.exports = (app) => {
  const RestClient = app.services.RestClient;

  const ControllerHotels = {
    async listHotels() {
      return await RestClient.fetchHotels();
    },

    sortAscendentByPrice (hotels) {
      return hotels.sort((a, b) => a.price - b.price);
    },

    filterHotelsBetweenPrices ({ hotels, minPrice, maxPrice }) {
      return hotels.filter(item => item.price >= parseFloat(minPrice) && item.price <= parseFloat(maxPrice));
    },

    filterHotelsByRate ({ hotels, rate }) {
      if (!parseInt(rate)) return hotels;
      return hotels.filter(item => item.rate == parseInt(rate));
    },
  }

  return ControllerHotels;
};
