const bodyparser = require('body-parser');
const candidatesModule = require('../modules/candidates');

const init = (router) => {
  router.use(bodyparser.json());

  router.get('/', (req, res) => {
    res.send('Hello KaiTinder!');
  });

  router.use('/candidates', candidatesModule.init());

  return router;
};

module.exports = {
  init,
};
