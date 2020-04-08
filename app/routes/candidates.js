const { OK } = require('http-status');
const Candidate = require('../repository/candidate');

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

const postCandidate = (createCandidate) => async (req, res, next) => {
  try {
    const data = await createCandidate(req.body);
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
