const log = require('./config/log');
const express = require('express');
const repository = require('./repository');
const routes = require('./routes');

const router = express.Router();

const init = () => {
  const app = express();
  return app;
};


if (!module.parent) {
  const server = init();
  const port = process.env.PORT || 3000;
  repository.init().then((response) => {
    log.info(response);
    server.listen(port, error => (error ? log.error(error) : log.info(`Server listening at port: ${port}`)));
  });
}

module.exports = { init };
