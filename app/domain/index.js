const cities = require('../services/cities');
const Candidate = require('../repository/candidate');
const candidates = require('./candidates');

const createCandidate = async (newCandidate) => candidates.createCandidate(cities.getCities, Candidate.create)(newCandidate);

module.exports = {
  createCandidate,
};
