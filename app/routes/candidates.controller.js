const { OK } = require('http-status');

const getCandidates = (getCandidatesDomain) => async (req, res, next) => {
  try {
    const { offset, limit, ...q } = req.query || {};
    const data = await getCandidatesDomain(q, { offset, limit });
    res.status(OK).send({ data, pagination: { offset, limit } });
  } catch (e) {
    next(e);
  }
};

const getCandidate = (getById) => async (req, res, next) => {
  try {
    const data = await getById(req.params.id);
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

const getCandidateMatches = (getMatches) => async (req, res, next) => {
  try {
    const { offset, limit } = req.query || {};
    const data = await getMatches(req.params.id, { offset, limit });
    res.status(OK).send({ data, pagination: { offset, limit } });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getCandidates,
  getCandidate,
  postCandidate,
  getCandidateMatches,
};
