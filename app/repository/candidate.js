/* eslint-disable radix */
const { Candidate } = require('./models');

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

  const results = await Candidate.aggregate(aggregation).exec();

  return results;
};

const getById = async (_id) => {
  const result = await Candidate.findOne({ _id });
  return result;
};

module.exports = {
  get,
  getById,
  create,
};
