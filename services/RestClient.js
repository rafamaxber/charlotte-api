const mock_hotels = require('./mockHotels');

const sortAscendentByPrice = (hotels) => {
  return hotels.sort((a, b) => a.price - b.price);
}

const filterHotelsBetweenPrices = ({ hotels, minPrice, maxPrice }) => {
  console.log(minPrice, maxPrice);
  return hotels.filter(item => item.price >= parseFloat(minPrice) && item.price <= parseFloat(maxPrice));
}

const filterHotelsByRate = ({ hotels, rate }) => {
  if (!parseInt(rate)) return hotels;
  return hotels.filter(item => item.rate == parseInt(rate));
}

const fetchHotels = async () => {
  return await new Promise((resolve) => {
    resolve(mock_hotels);
  });
}

const fetchHotelByFilters = async ({ minPrice, maxPrice, rate, startDate, endDate }) => {
  const hotelList = await fetchHotels();
  let hotels = hotelList.hotels;
  hotels = sortAscendentByPrice(hotels);
  hotels = filterHotelsBetweenPrices({ hotels, minPrice, maxPrice });
  hotels = filterHotelsByRate({ hotels, rate });
  return hotels;
}

module.exports = {
  fetchHotels,
  fetchHotelByFilters,
};
