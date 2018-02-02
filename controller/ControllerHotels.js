const { throwError } = require('../utils/helperError');

module.exports = (app) => {
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
        throw new Error('Is necessary send all paremeters!');
      }
      return hotels.sort((a, b) => a.price - b.price);
    },

    // TODO: Implement filter for hotels by start date and end date
    filterHotelsByDate () {

    },

    filterHotelsBetweenPrices ({ hotels, minPrice, maxPrice }) {
      if (!hotels, !minPrice, !maxPrice) {
        throwError({
          message: 'Is necessary send all paremeters!',
          statusCode: 500
        });
      }
      return hotels.filter(item => item.price >= parseFloat(minPrice) && item.price <= parseFloat(maxPrice));
    },

    filterHotelsByRate ({ hotels, rate }) {
      if (!hotels, !rate) {
        throwError({
          message: 'Is necessary send all paremeters!',
          statusCode: 500
        });
      }
      if (!parseInt(rate)) return hotels;
      return hotels.filter(item => item.rate == parseInt(rate));
    },

    async filterHotels ( req, res ) {
      const { minPrice, maxPrice, rate } = req.query;
      if (!rate, !minPrice, !maxPrice) {
        throwError({
          message: 'Is necessary send all paremeters!',
          statusCode: 500
        });
      }

      let { hotels } = await this.listHotels();
      hotels = this.filterHotelsBetweenPrices({ hotels, minPrice, maxPrice });
      hotels = this.filterHotelsByRate({ hotels, rate });
      hotels = this.sortAscendentByPrice( hotels );
      return hotels;
    }
  }

  return ControllerHotels;
};
