const express = require('express');

const log = require('./lib/log');
const swagger = require('./lib/swagger');
const mongo = require('./services/mongo');

const killProcess = (err) => {
  log.error(`Process ${process.pid} received a SIGTERM signal`, err);
  process.exit(0);
};

const port = process.env.PORT;

const start = async () => {
  try {
    const app = express();

    app.get('/', (req, res) => {
      res.send('Hello KaiTinder!');
    });


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
