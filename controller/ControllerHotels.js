const { throwError } = require('../utils/helperError');

module.exports = (app) => {
  const MIN_PRICE_DEFAULT = 100;
  const MAX_PRICE_DEFAULT = 1000;

  const RestClient = app.services.RestClient;

  const ControllerHotels = {
    async listHotels () {
      return await RestClient.fetchHotels()
        .catch(error => {
          throwError({
            message: 'Is necessary send all paremeters!',
            statusCode: 500
          });
        });
    },

    sortAscendentByPrice ( hotels ) {
      if (!hotels) {
        throwError({
          message: 'Is necessary send all paremeters!',
          statusCode: 500
        });
      }

      return hotels.sort((a, b) => a.price - b.price);
    },

    // TODO: Implement filter for hotels by start date and end date
    // filterHotelsByDate () { ... },

    filterHotelsBetweenPrices({ hotels, minPrice, maxPrice } = {}) {
      if (!hotels || !minPrice || !maxPrice) {
        throwError({
          message: 'Is necessary send all paremeters!',
          statusCode: 500
        });
      }
      return hotels.filter(item => item.price >= parseFloat(minPrice) && item.price <= parseFloat(maxPrice));
    },

    filterHotelsByRate ({ hotels, rate } = {}) {
      if (!hotels || !rate) {
        throwError({
          message: 'Is necessary send all paremeters!',
          statusCode: 500
        });
      }
      if (!parseInt(rate)) return hotels;
      return hotels.filter(item => item.rate == parseInt(rate));
    },

  }

  return ControllerHotels;
};
