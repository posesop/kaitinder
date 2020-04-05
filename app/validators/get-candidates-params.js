const Joi = require('@hapi/joi');

const objectIdValidator = require('./object-id');

const idsArraySchema = Joi.array().items(objectIdValidator);

const schema = Joi.object().keys({
  _id: idsArraySchema,
  name: Joi.string(),
  photo: Joi.string(),
  zipCode: Joi.string(),
  sort: Joi.string(),
  offset: Joi.string().regex(/^\d+$/),
  limit: Joi.string().regex(/^\d+$/),
});

module.exports = schema;
