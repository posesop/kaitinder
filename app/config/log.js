const bunyan = require('bunyan');

const log = bunyan.createLogger({
  name: 'Kaitinder',
  level: 'info',
  serializers: bunyan.stdSerializers,
});

module.exports = log;
