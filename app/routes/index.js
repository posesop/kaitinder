const { Router } = require('express');
const { OK } = require('http-status');

const middlewares = require('../middlewares');
const validators = require('../validators');
const Candidate = require('../repository/candidate');

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello KaiTinder!');
});

router.get(
  '/candidates',
  middlewares.validation({ schema: validators.getCandidateParams, path: 'query' }),
  async (req, res, next) => {
    try {
      const { offset, limit, ...q } = req.query || {};
      const data = await Candidate.get(q, { offset, limit });
      res.status(OK).send({ data, pagination: { offset, limit } });
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  '/candidates/:id',
  middlewares.validation({ schema: validators.idPath, path: 'params' }),
  async (req, res, next) => {
    try {
      const data = await Candidate.getById(req.params.id);
      res.status(OK).send({ data });
    } catch (e) {
      next(e);
    }
  },
);

module.exports = router;
