const axios = require('axios');

const log = require('./log');

const get = async (url, options = {}) => {
  log.info(`external service get url: ${url}`);
  return axios.get(url, options);
};

module.exports = {
  get,
}
