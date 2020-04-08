/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const CandidateRepository = require('../../../app/repository/mongo/candidate');
const candidateDomain = require('../../../app/domain/candidates');
const { cities } = require('../mocks/cities');

const mocks = [
  {
    name: 'foo',
    birthDate: '1990-07-27',
    gender: 'M',
    city: 'Madrid',
    photo: 'http://photo1.jpg',
  },
  {
    name: 'bar',
    birthDate: '1991-05-02',
    gender: 'F',
    city: 'Madrid',
    photo: 'http://photo2.jpg',
  },
  {
    name: 'bar1',
    birthDate: '1991-05-02',
    gender: 'F',
    city: 'Palma',
    photo: 'http://photo2.jpg',
  },
  {
    name: 'bar2',
    birthDate: '1991-05-02',
    gender: 'F',
    city: 'Palma',
    photo: 'http://photo2.jpg',
  },
];

const createCandidate = candidateDomain.createCandidate(() => cities, CandidateRepository.create);

const createMany = async () => {
  const results = [];
  for (let i = 0; i < mocks.length; i++) {
    const created = await createCandidate(mocks[i]);
    results.push(created);
  }
  return results;
};

const deleteAll = async () => {
  await CandidateRepository.deleteMany({});
};

module.exports = {
  createMany,
  deleteAll,
  mocks,
};
