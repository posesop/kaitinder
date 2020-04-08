const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    name: { type: String, required: true },
    photo: { type: String, required: false },
    gender: { type: String, required: true },
    birthDate: { type: Date, required: true },
    city: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: false },
      long: { type: Number, required: false },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
