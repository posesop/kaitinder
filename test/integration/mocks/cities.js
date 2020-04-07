const nock = require('nock');

const { env } = process;

const URL = process.env.CITIES_HOST;
const path = process.env.CITIES_PATH;
const cities = [{ city: 'Madrid', lat: 1, long: 2 }]

const getSomethingNotFound = () => {
  return nock(URL)
    .get(path)
    .reply(404);
};

const getSomething = () => {
  return nock(URL)
    .get(path)
    .reply(200, cities);
};

module.exports = {
  getSomethingNotFound,
  getSomething,
};
