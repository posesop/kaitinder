const Joi = require('@hapi/joi');

const objectIdValidator = require('./object-id');

const schema = Joi.object().keys({
  id: objectIdValidator,
});

module.exports = schema;
