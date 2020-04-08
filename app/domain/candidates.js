const { AppError, HttpErrorBuilder } = require('../errors');
const { getCities } = require('../services/cities');
const Candidate = require('../repository/candidate');
const distance = require('../lib/distance');

const getById = async (id) => {
  const candidate = await Candidate.getById(id);

  if (!candidate) {
    throw new AppError(HttpErrorBuilder.NOT_FOUND(1));
  }

  return candidate;
};

const createCandidate = (getCitiesService, persist) => async (newCandidate) => {
  const cities = await getCitiesService();
  const city = cities.find((item) => item.city === newCandidate.city);
  const candidate = {
    ...newCandidate,
    coordinates: {
      lat: city ? city.lat : null,
      long: city ? city.long : null,
    },
  };
  return persist(candidate);
};

const getCitiesInRatio = async (coordinates, maxDistance) => {
  const { lat, long } = coordinates;
  const cities = await getCities();
  return cities
    .filter((city) => {
      const distanceBetweenCities = distance(city.lat, city.long, lat, long);
      return distanceBetweenCities <= maxDistance;
    })
    .map((i) => i.city);
};

const getMatches = async (id, opts) => {
  const { offset, limit } = opts;
  const candidate = await Candidate.getById(id);
  if (!candidate) {
    throw new AppError(HttpErrorBuilder.NOT_FOUND(1));
  }
  const MAX_KM = 100;
  const matchCities = await getCitiesInRatio(candidate.coordinates, MAX_KM);
  const birthDate = new Date(candidate.birthDate);
  const ageRange = 5;
  const ageFilteredCandidates = await Candidate.getByCitiesAndAgeRangeExcludingId(
    candidate._id,
    matchCities,
    birthDate.getFullYear(),
    ageRange,
    {
      offset,
      limit,
    },
  );

  return ageFilteredCandidates;
};

module.exports = {
  getById,
  createCandidate,
  getMatches,
};
