const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  job: { type: String, required: true },
  country: { type: String, required: true },
}, {
  timestamps: true,
  versionKey: false,
});
