const bunyan = require('bunyan');

const logger = (config) => bunyan.createLogger(config);

const config = {
  name: 'Kaitinder',
  level: process.env.LOG_LEVEL,
  serializers: bunyan.stdSerializers,
};

module.exports = logger(config);
