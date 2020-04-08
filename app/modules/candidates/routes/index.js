const middlewares = require('../../../routes/middlewares');
const validators = require('./validators');
const controller = require('./controller');
const domain = require('../domain');

const init = (router) => {
  router.get(
    '/',
    middlewares.validation({ schema: validators.getCandidateParams, path: 'query' }),
    controller.getCandidates(domain.getCandidates),
  );

  router.post(
    '/',
    middlewares.validation({ schema: validators.postCandidateParams, path: 'body' }),
    controller.postCandidate(domain.createCandidate),
  );

  router.get(
    '/:id',
    middlewares.validation({ schema: validators.idPath, path: 'params' }),
    controller.getCandidate(domain.getById),
  );

  router.get(
    '/:id/matches',
    middlewares.validation({ schema: validators.idPath, path: 'params' }),
    controller.getCandidateMatches(domain.getMatches),
  );

  return router;
};

module.exports = { init };
