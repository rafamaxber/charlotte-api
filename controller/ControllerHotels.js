const moment = require('moment');
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

    sumTotalPriceByDate({ hotels, startDate, endDate }) {
      if (!startDate || !endDate) return hotels;
      const start = moment(new Date(parseInt(startDate)), "DD.MM.YYYY");
      const end = moment(new Date(parseInt(endDate)), "DD.MM.YYYY");
      const dateDiff = parseInt(end.diff(start, 'days'));

      const newHotels = hotels.map(hotel => {
        const newHotel = Object.assign({}, hotel);
        newHotel.pricePerDay = newHotel.price;
        newHotel.pricePerDay = (newHotel.pricePerDay).toFixed(2);
        newHotel.price = newHotel.pricePerDay * (dateDiff + 1);
        newHotel.price = (newHotel.price).toFixed(1);
        newHotel.stay = dateDiff;
        return newHotel;
      });
      return newHotels;
    },

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
