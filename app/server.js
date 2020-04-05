const express = require('express');

const log = require('./lib/log');
const swagger = require('./lib/swagger');
const mongo = require('./services/mongo');
const middlewares = require('./middlewares');
const routes = require('./routes');

const killProcess = (err) => {
  log.error(`Process ${process.pid} fail`, err);
  process.exit(0);
};

const port = process.env.PORT;

const start = async () => {
  try {
    const app = express();

    app.use('/', routes);

    app.use(middlewares.errorHandler);

    if (process.env.NODE_ENV === 'development') {
      await swagger.addSwaggerRoute(app, '/api-docs');
    }

    await mongo.connect();
    app.listen(port, (error) => (error ? log.error(error) : log.info(`Server listening at port: ${port}`)));
  } catch (e) {
    log.error(e);
    process.exit(-1);
  }
};

start();

process.on('SIGTERM', killProcess);
process.on('SIGINT', killProcess);
process.on('uncaughtException', killProcess);
