const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: false },
});

const Candidate = mongoose.model('Candidate', CandidateSchema);
module.exports = Candidate;
