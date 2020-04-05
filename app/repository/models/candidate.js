const mongoose = require('mongoose');

const schema = require('./schemas/candidate');

const Candidate = mongoose.model('Candidate', schema);

module.exports = Candidate;
