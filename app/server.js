const express = require('express');
const bodyparser = require('body-parser');

const swagger = require('./libs/swagger');
const log = require('./libs/log');
const middlewares = require('./routes/middlewares');
const routes = require('./routes');

const port = process.env.PORT;

let app;

const init = () => {
  app = express();
  app.use(bodyparser.json());

  app.use('/', routes);

  app.use(middlewares.errorHandler);

  if (process.env.NODE_ENV === 'development') {
    swagger.addSwaggerRoute(app, '/api-docs');
  }

  return app;
};

const listen = () => {
  app.listen(port, (error) => (error ? log.error(error) : log.info(`Server listening at port: ${port}`)));
};

module.exports = {
  listen,
  init,
};
