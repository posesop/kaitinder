const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  prop: { type: String, required: true },
});

const Candidate = mongoose.model('Candidate', CandidateSchema);
module.exports = Candidate;
