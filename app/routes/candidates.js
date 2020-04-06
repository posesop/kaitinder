const { OK } = require('http-status');
const Candidate = require('../repository/candidate');
const candidateDomain = require('../domain/candidates');

const getCandidates = () =>  async (req, res, next) => {
  try {
    const { offset, limit, ...q } = req.query || {};
    const data = await Candidate.get(q, { offset, limit });
    res.status(OK).send({ data, pagination: { offset, limit } });
  } catch (e) {
    next(e);
  }
};

const getCandidate = () => async (req, res, next) => {
  try {
    const data = await Candidate.getById(req.params.id);
    res.status(OK).send({ data });
  } catch (e) {
    next(e);
  }
};

const postCandidate = () => async (req, res, next) => {
  try {
    const data = await candidateDomain.postCandidate(req.body);
    res.status(OK).send({ data });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getCandidates,
  getCandidate,
  postCandidate,
};
