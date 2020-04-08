const http = require('../lib/http');

const CITIES_HOST = process.env.CITIES_HOST;
const CITIES_PATH = process.env.CITIES_PATH;

const getCities = async () => {
  const cities = await http.get(`${CITIES_HOST}${CITIES_PATH}`);
  return cities != null ? cities.data : [];
}


module.exports = {
  getCities,
}
