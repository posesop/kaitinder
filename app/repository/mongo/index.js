const mongoose = require('mongoose');
const { url, opts } = require('./config');

const init = async () =>
  mongoose.connect(url, opts);

module.exports = {
  init,
};
