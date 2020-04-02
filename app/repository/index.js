const log = require('../config/log');
const mongo = require('./mongo');

const init = async () => {
  try {
    await mongo.init();
    return 'Connections ready';
  } catch (err) {
    log.error(err);
    throw err;
  }
};

module.exports = {
  init,
};
