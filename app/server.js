const express = require('express');
const mongoose = require('mongoose');

const config = require('./config');
const log = require('./lib/log');
const swagger = require('./lib/swagger');

const { MONGO_HOST, MONGO_DB_NAME, PORT } = process.env;

const mongoUri = `${MONGO_HOST}/${MONGO_DB_NAME}`;

const connectMongo = async () => mongoose.connect(mongoUri, config.mongo);

const killProcess = (err) => {
  log.error(`Process ${process.pid} received a SIGTERM signal`, err);
  process.exit(0);
};

const start = async () => {
  try {
    const app = express();

    app.get('/', (req, res) => {
      res.send('Hello KaiTinder!');
    });


    if (process.env.NODE_ENV === 'development') {
      await swagger.addSwaggerRoute(app, '/api-docs');
    }

    await connectMongo();
    app.listen(PORT, (error) => (error ? log.error(error) : log.info(`Server listening at port: ${PORT}`)));
  } catch (e) {
    log.error(e);
    process.exit(-1);
  }
};

start();

process.on('SIGTERM', killProcess);
process.on('SIGINT', killProcess);
process.on('uncaughtException', killProcess);
