const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  gender: { type: String, required: true },
  birthDate: { type: String, required: true },
  city: { type: String, required: true },
  coordinates: {
    lat: mongoose.Schema.Types.Decimal128,
    long: mongoose.Schema.Types.Decimal128,
   },
}, {
  timestamps: true,
  versionKey: false,
});
