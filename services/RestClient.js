const mock_hotels = require('./mockHotels');

const fetchHotels = async () => {
  return await new Promise((resolve, reject) => {
    resolve(mock_hotels);
  });
}

module.exports = {
  fetchHotels,
};
