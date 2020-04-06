const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  name: Joi.string(),
  photo: Joi.string(),
  city: Joi.string(),
  birthDate: Joi.string(),
  gender: Joi.string().valid('M', 'F')
});

module.exports = schema;
