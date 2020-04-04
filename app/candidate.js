const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  job: { type: String, required: true },
  country: { type: String, required: true },
});

const Candidate = mongoose.model('Candidate', CandidateSchema);
module.exports = Candidate;
