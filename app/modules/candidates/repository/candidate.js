/* eslint-disable radix */
const {
  Types: { ObjectId },
} = require('mongoose');

const { Candidate } = require('./models');
const datetime = require('../../../lib/datetime');

const defaultProjection = {
  name: 1,
  photo: 1,
  gender: 1,
  city: 1,
  coordinates: 1,
  birthDate: { $dateToString: { format: '%Y-%m-%d', date: '$birthDate' } },
};

const create = async (newCandidate) => {
  const resp = await Candidate.create(new Candidate(newCandidate));
  return resp;
};

const get = async (query, options) => {
  const { offset = 0, limit = 0 } = options || {};
  const aggregation = [{ $match: query }, { $sort: { createdAt: 1 } }, { $skip: parseInt(offset) }];
  const $limit = parseInt(limit);

  if ($limit !== 0) {
    aggregation.push({ $limit });
  }

  aggregation.push({
    $project: defaultProjection,
  });

  const results = await Candidate.aggregate(aggregation).exec();

  return results;
};

const getById = async (id) => {
  const [result] = await get({ _id: new ObjectId(id) });
  return result;
};

const getByCitiesAndAgeRangeExcludingId = async (id, matchCities, birthYear, years) => {
  const match = {
    _id: { $ne: new ObjectId(id) },
    city: { $in: matchCities },
    birthDate: {
      $lte: datetime.addYears(birthYear, years),
      $gte: datetime.addYears(birthYear, -years),
    },
  };
  const results = await get(match);

  return results;
};

const deleteMany = (q) => Candidate.deleteMany(q);

module.exports = {
  get,
  getById,
  create,
  getByCitiesAndAgeRangeExcludingId,
  deleteMany,
};
