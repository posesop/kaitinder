const Joi = require('@hapi/joi');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const schema = Joi.string().regex(objectIdRegex);

module.exports = schema;
