const mock_hotels = {
  hotels: [
    {
      "name": "Super 8 Speedway/University",
      "description": "Just off Interstate 85, this hotel features free Wi-Fi and a daily continental breakfast with hot waffles. The Charlotte Motor Speedway is a 15 minute drive from the hotel.",
      "image": "https://www.raphaelfabeni.com.br/rv/test-resources/hotels/super-8.jpg",
      "rate": 3,
      "price": 180,
      "price_history": [
        { "month": "Jan", "value": 146 },
        { "month": "Feb", "value": 182 },
        { "month": "Mar", "value": 130 },
        { "month": "Apr", "value": 119 },
        { "month": "May", "value": 171 },
        { "month": "Jun", "value": 154 },
        { "month": "Jul", "value": 163 }
      ]
    },
    {
      "name": "Omni Charlotte Hotel",
      "description": "The Omni Charlotte Hotel envelopes you in ultimate comfort with a signature touch of genuine North Carolina hospitality.",
      "image": "https://www.raphaelfabeni.com.br/rv/test-resources/hotels/omni-charlotte.jpg",
      "rate": 4,
      "price": 280.50,
      "price_history": [
        { "month": "Jan", "value": 302 },
        { "month": "Feb", "value": 219 },
        { "month": "Mar", "value": 300 },
        { "month": "Apr", "value": 229 },
        { "month": "May", "value": 272 },
        { "month": "Jun", "value": 249 },
        { "month": "Jul", "value": 239 }
      ]
    },
    {
      "name": "Charlotte Marriott City Center",
      "description": "Located in Uptown Charlotte, this Marriott City Center hotel offers spacious rooms with a flat-screen TV and free WiFi in public areas. Facilities include a 24-hour fitness centre. Parking is offered for a fee.",
      "image": "https://www.raphaelfabeni.com.br/rv/test-resources/hotels/charlotte-marriot.jpg",
      "rate": 4,
      "price": 190,
      "price_history": [
        { "month": "Jan", "value": 141.9 },
        { "month": "Feb", "value": 162.2 },
        { "month": "Mar", "value": 135.8 },
        { "month": "Apr", "value": 195 },
        { "month": "May", "value": 169.8 },
        { "month": "Jun", "value": 105.2 },
        { "month": "Jul", "value": 182.5 }
      ]
    },
  ],
};
const app = {
  services: {
    RestClient: {
      async fetchHotels() {
        return await new Promise((resolve) => {
          resolve(mock_hotels);
        });
      },
    }
  },
};
const {
  listHotels,
  sortAscendentByPrice,
  filterHotelsBetweenPrices,
  filterHotelsByRate,
  filterHotels,
} = require('../controller/ControllerHotels')(app);

const ControllerHotels = require('../controller/ControllerHotels')(app);

describe('ControllerHotels', () => {
  describe('listHotels', () => {
    test('Should return a correct mock', async () => {
      let { hotels } = await listHotels();
      expect(mock_hotels.hotels).toEqual(hotels);
    });
  });

  describe('sortAscendentByPrice', () => {
    test('Should sort price ascendent', () => {
      const obj = [
        {
          price: 2,
        },
        {
          price: 0,
        },
        {
          price: 5,
        }
      ];
      expect(sortAscendentByPrice(obj)).toEqual([{ price: 0 }, { price: 2 }, { price: 5 }]);
    });
  });

  describe('filterHotelsBetweenPrices', () => {
    test('Should reduce list by parameters', () => {
      const obj = [
        {
          price: 10,
        },
        {
          price: 15,
        },
        {
          price: 20,
        }
      ];
      const query = {
        hotels: obj,
        minPrice: 15,
        maxPrice: 20,
      };
      expect(filterHotelsBetweenPrices(query)).toEqual([{ price: 15 }, { price: 20 }]);
    });
  });

  describe('filterHotelsByRate', () => {
    test('Should reduce list by parameters', () => {
      const obj = [
        {
          price: 10,
          rate: 1,
        },
        {
          price: 15,
          rate: 5,
        },
        {
          price: 20,
          rate: 3,
        }
      ];
      const query = {
        hotels: obj,
        rate: 3
      };
      expect(filterHotelsByRate(query)).toEqual([{ price: 20, rate: 3 }]);
    });
  });

  describe('filterHotels', () => {
    test('Should return a correct mock after aplly all filters', async () => {
      const obj = {
        "hotels": [
          {
            price: 10,
            rate: 1,
          },
          {
            price: 15,
            rate: 5,
          },
          {
            price: 20,
            rate: 3,
          }
        ]
      };
      const req = {
        query: {
          minPrice: 200,
          maxPrice: 300,
          rate: 4,
        }
      }
      const filterHotelsAbs = filterHotels.bind(ControllerHotels);
      let { hotels } = await filterHotelsAbs(req, obj);
      expect(hotels).toEqual({});
    });
  });

});
