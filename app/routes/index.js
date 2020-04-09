const { Router } = require('express');

const middlewares = require('./middlewares');
const validators = require('../validators');
const candidates = require('./controllers/candidates');
const domain = require('../domain');

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello KaiTinder!');
});

router.get(
  '/candidates',
  middlewares.validation({ schema: validators.getCandidateParams, path: 'query' }),
  candidates.getCandidates(domain.getCandidates),
);

router.get(
  '/candidates/:id',
  middlewares.validation({ schema: validators.idPath, path: 'params' }),
  candidates.getCandidate(domain.getById),
);

router.get(
  '/candidates/:id/matches',
  middlewares.validation({ schema: validators.idPath, path: 'params' }),
  candidates.getCandidateMatches(domain.getMatches),
);

router.post(
  '/candidates',
  middlewares.validation({ schema: validators.postCandidateParams, path: 'body' }),
  candidates.postCandidate(domain.createCandidate),
);

module.exports = router;
