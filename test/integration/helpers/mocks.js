/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const CandidateModel = require('../../../app/repository/models/candidate');

const mocks = [
  { name: 'foo', age: 23, gender: 'M', job: 'Chief Design Engineer', country: 'France' },
  { name: 'bar', age: 38, gender: 'F', job: 'Speech Pathologist', country: 'France' },
];

const createMany = async () => {
  const results = [];
  for (let i = 0; i < mocks.length; i++) {
    const created = await CandidateModel.create(mocks[i]);
    results.push(created);
  }
  return results;
};

const deleteAll = async () => {
  await CandidateModel.deleteMany({});
};

module.exports = {
  createMany,
  deleteAll,
  mocks,
};
