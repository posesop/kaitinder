const nock = require('nock');

const { env } = process;

const URL = `${env.THIRD_HOST}`;
const path = '/some-path';

const getSomethingNotFound = () => {
  return nock(URL)
    .get(path)
    .reply(404);
};

const getSomething = () => {
  return nock(URL)
    .get(path)
    .reply(200, { name: 'foo' });
};

module.exports = {
  getSomethingNotFound,
  getSomething,
};
