
const { AppError, HttpErrorBuilder } = require('../errors');
const log = require('../lib/log');

const errorHandler = (err, req, res, next) => {
  const error = err instanceof AppError ? err : HttpErrorBuilder.SERVICE_UNAVAILABLE();

  log.error(err.stack);

  res.status(error.status).send({
    status: error.status,
    code: error.code,
    description: error.message,
    data: error.data,
  });
  next();
};

module.exports = errorHandler;
