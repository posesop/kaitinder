const { OK } = require('http-status');
const external = require('../services/external');
const Candidate = require('../repository/candidate');

const createCandidate = async (newCandidate) => {
  const cities = await external.get(process.env.SERV_EXT_CITIES)
  const city = cities.data.find(item => item.city == newCandidate.city);
  const candidate = {
    ...newCandidate,
    coordinates: {
      lat: city ? city.lat : null,
      long: city ? city.long: null,
    }
  }
  return Candidate.create(candidate);
};

module.exports = {
  createCandidate,
};
