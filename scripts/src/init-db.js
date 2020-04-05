const fs = require('fs');
const path = require('path');

const Candidate = require('../../app/repository/models/candidate');

module.exports = async () => {
  const data = fs.readFileSync(path.resolve(__dirname, 'data.json'));
  const parsedData = JSON.parse(data);
  await Candidate.insertMany(parsedData);
};
