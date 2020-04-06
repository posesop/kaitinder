/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const CandidateModel = require('../../../app/repository/models/candidate');

const mocks = [
  { name: 'foo', birthDate: '27/07/1990', gender: 'M', city: 'Madrid', photo: 'http://photo1.jpg' },
  { name: 'bar', birthDate: '02/05/1991', gender: 'F', city: 'Barcelona', photo: 'http://photo2.jpg' },
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
