const http = require('../lib/http');

const { CITIES_HOST, CITIES_PATH } = process.env;

const getCities = async () => {
  const cities = await http.get(`${CITIES_HOST}${CITIES_PATH}`);
  return cities != null ? cities.data : [];
};

module.exports = {
  getCities,
};
