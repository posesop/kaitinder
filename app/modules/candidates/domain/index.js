const cities = require('../../../services/cities');
const Candidate = require('../repository/candidate');
const candidates = require('./candidates');
const distance = require('../../../lib/distance');
const { getCities } = require('../../../services/cities');

const getById = async (id) => candidates.getById(Candidate.getById)(id);

const createCandidate = async (newCandidate) => candidates.createCandidate(cities.getCities, Candidate.create)(newCandidate);

const getMatches = async (id, opts) => candidates.getMatches(Candidate.getById, Candidate.getByCitiesAndAgeRangeExcludingId, distance, getCities)(id, opts);

const getCandidates = async (query, opts) => candidates.getCandidates(Candidate.get)(query, opts);

module.exports = {
  getById,
  createCandidate,
  getMatches,
  getCandidates,
};
